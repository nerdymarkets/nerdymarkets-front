import { Button, Spinner } from 'reactstrap';
import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
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

import { useRouter } from 'next/router';
import useSubscriptionStore from '@/stores/subscription-store';
const CancelSubscription = ({ buttonName }) => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    setSubscriptionDetails,
    isPaypalActive,
    isStripeActive,
    subscriptionDetails,
    subscriptionStatus,
  } = useSubscriptionStore();
  const handleCancelSubscription = async () => {
    setLoading(true);

    if (isStripeActive) {
      try {
        const cancelResponse = await cancelStripeSubscription(
          session?.accessToken,
          subscriptionDetails?.stripeSubscriptionId
        );

        if (cancelResponse.status === 'canceled') {
          toast.success('Stripe subscription successfully canceled.');
          await deleteStripeSubscription(
            session?.accessToken,
            subscriptionDetails?.stripeSubscriptionId
          );
          const updatedSubscriptions = session.user.stripeSubscriptions.filter(
            (id) => id !== subscriptionDetails?._id
          );

          await update({
            stripeSubscriptions: updatedSubscriptions,
          });
          setSubscriptionDetails(null);
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
        let cancelResponse;

        if (subscriptionStatus === 'approval_pending') {
          await deletePaypalSubscription(
            session?.accessToken,
            subscriptionDetails?._id
          );
          toast.success('PayPal subscription Deleted');
        } else {
          cancelResponse = await cancelPaypalSubscription(
            session?.accessToken,
            subscriptionDetails?.paypalSubscriptionId
          );

          if (
            cancelResponse &&
            cancelResponse.message === 'Subscription canceled successfully'
          ) {
            toast.success('PayPal subscription successfully canceled.');
            await deletePaypalSubscription(
              session?.accessToken,
              subscriptionDetails?._id
            );
          } else {
            toast.error('Failed to cancel the PayPal subscription.');
            return;
          }
        }

        const updatedSubscriptions = session.user.paypalsubscriptions.filter(
          (id) => id !== subscriptionDetails._id
        );

        await update({
          paypalsubscriptions: updatedSubscriptions,
        });
        setSubscriptionDetails(null);
        router.push('/');
      } catch (error) {
        toast.error(
          'An error occurred while canceling or deleting the PayPal subscription.'
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
        size="sm"
        onClick={handleCancelSubscription}
        disabled={loading}
        className="rounded-3xl font-bold shadow-lg border-none"
      >
        {loading ? <Spinner size="sm" /> : buttonName}
      </Button>
    </>
  );
};
CancelSubscription.propTypes = {
  buttonName: PropTypes.string.isRequired,
};
export default CancelSubscription;
