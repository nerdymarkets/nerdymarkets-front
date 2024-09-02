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

import useSubscriptionStore from '@/stores/subscription-store';
const CancelSubscription = ({
  buttonName,
  toggle,
  onSubscriptionMethodChange,
  className,
  color,
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const {
    setSubscriptionDetails,
    isPaypalActive,
    isStripeActive,
    subscriptionDetails,
    subscriptionStatus,
    clearSubscriptionDetails,
  } = useSubscriptionStore();
  const handleCancelSubscription = async () => {
    setLoading(true);

    if (isStripeActive) {
      try {
        const cancelResponse = await cancelStripeSubscription(
          session?.accessToken,
          subscriptionDetails?.stripeSubscriptions[0].stripeSubscriptionId
        );

        if (cancelResponse.status === 'canceled') {
          toast.success('Stripe subscription successfully canceled.');
          await deleteStripeSubscription(
            session?.accessToken,
            subscriptionDetails?.stripeSubscriptions[0].stripeSubscriptionId
          );
          setSubscriptionDetails(null);
          clearSubscriptionDetails();
          onSubscriptionMethodChange('stripe');
          toggle();
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
        // Cancel the PayPal subscription first
        if (subscriptionStatus === 'approval_pending') {
          await deletePaypalSubscription(
            session?.accessToken,
            subscriptionDetails?.paypalSubscriptions[0]?._id
          );
          toast.success('PayPal subscription deleted successfully.');
          setSubscriptionDetails(null);
          clearSubscriptionDetails();
          onSubscriptionMethodChange('paypal');
          toggle();
        } else {
          const cancelResponse = await cancelPaypalSubscription(
            session?.accessToken,
            subscriptionDetails?.paypalSubscriptions[0]?.paypalSubscriptionId
          );

          if (
            cancelResponse &&
            cancelResponse.message === 'Subscription canceled successfully'
          ) {
            toast.success('PayPal subscription successfully canceled.');

            await deletePaypalSubscription(
              session?.accessToken,
              subscriptionDetails?.paypalSubscriptions[0]?._id
            );
            toast.success('PayPal subscription deleted successfully.');
            setSubscriptionDetails(null);
            clearSubscriptionDetails();
            onSubscriptionMethodChange('paypal');
            toggle();
          } else {
            toast.error('Failed to cancel the PayPal subscription.');
            setLoading(false);
            return;
          }
        }
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
        color={color}
        size="sm"
        onClick={handleCancelSubscription}
        disabled={loading}
        className={`${className} rounded-3xl font-bold  border-none`}
      >
        {loading ? <Spinner size="sm" /> : buttonName}
      </Button>
    </>
  );
};
CancelSubscription.propTypes = {
  buttonName: PropTypes.string.isRequired,
  toggle: PropTypes.func,
  className: PropTypes.string,
  color: PropTypes.string,
  onSubscriptionMethodChange: PropTypes.func,
};
export default CancelSubscription;
