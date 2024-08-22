import { Button, Spinner } from 'reactstrap';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  cancelStripeSubscription,
  deleteStripeSubscription,
} from '@/pages/api/stripe-api';
import {
  cancelPaypalSubscription,
  deletePaypalSubscription,
} from '@/pages/api/paypal';
import { toast } from 'react-toastify';
import { useSubscriptionDetails } from '@/hooks/useSubscriptionDetails';
import { useRouter } from 'next/router';

const CancelSubscription = () => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    stripeSubscriptionDetails,
    paypalSubscriptionDetails,
    setStripeSubscriptionDetails,
    setPaypalSubscriptionDetails,
  } = useSubscriptionDetails(session);

  const handleCancelSubscription = async () => {
    setLoading(true);

    const isStripeActive =
      stripeSubscriptionDetails &&
      stripeSubscriptionDetails.status &&
      stripeSubscriptionDetails.status.toLowerCase() === 'active';

    const isPaypalActive =
      paypalSubscriptionDetails &&
      paypalSubscriptionDetails.status &&
      paypalSubscriptionDetails.status.toLowerCase() === 'active';

    if (isStripeActive) {
      try {
        const cancelResponse = await cancelStripeSubscription(
          session.accessToken,
          stripeSubscriptionDetails.stripeSubscriptionId
        );

        if (cancelResponse.status === 'canceled') {
          toast.success('Stripe subscription successfully canceled.');
          await deleteStripeSubscription(
            session.accessToken,
            stripeSubscriptionDetails.stripeSubscriptionId
          );
          const updatedSubscriptions = session.user.stripeSubscriptions.filter(
            (id) => id !== stripeSubscriptionDetails._id
          );

          await update({
            stripeSubscriptions: updatedSubscriptions,
          });
          setStripeSubscriptionDetails(null);
          toast.success('Stripe subscription removed from your account.');
          router.push('/');
        } else {
          toast.error('Failed to cancel the Stripe subscription.');
        }
      } catch (error) {
        toast.error(
          'An error occurred while canceling the Stripe subscription.'
        );
      }
    } else if (isPaypalActive) {
      try {
        const cancelResponse = await cancelPaypalSubscription(
          session.accessToken,
          paypalSubscriptionDetails._id
        );

        if (
          cancelResponse &&
          cancelResponse.message === 'Subscription canceled successfully'
        ) {
          toast.success('PayPal subscription successfully canceled.');
          await deletePaypalSubscription(
            session.accessToken,
            paypalSubscriptionDetails._id
          );
          const updatedSubscriptions = session.user.paypalsubscriptions.filter(
            (id) => id !== paypalSubscriptionDetails._id
          );

          await update({
            paypalsubscriptions: updatedSubscriptions,
          });
          setPaypalSubscriptionDetails(null);
          toast.success('PayPal subscription removed from your account.');
          router.push('/');
        } else {
          toast.error('Failed to cancel the PayPal subscription.');
        }
      } catch (error) {
        toast.error(
          'An error occurred while canceling the PayPal subscription.'
        );
      }
    } else {
      toast.error('No active subscription found to cancel.');
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        color="danger"
        onClick={handleCancelSubscription}
        disabled={loading}
      >
        {loading ? <Spinner size="sm" /> : 'Cancel Subscription'}
      </Button>
    </>
  );
};

export default CancelSubscription;
