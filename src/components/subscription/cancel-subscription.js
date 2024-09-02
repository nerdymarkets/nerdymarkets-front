import { Button, Spinner } from 'reactstrap';
import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { cancelStripeSubscription } from '@/pages/api/stripe-api';
import {
  cancelPaypalSubscription,
  deletePaypalSubscription,
} from '@/pages/api/paypal';
import { toast } from 'react-toastify';

import useSubscriptionStore from '@/stores/subscription-store';
const CancelSubscription = ({
  buttonName,
  toggle,
  className,
  color,
  onSubscriptionMethodChange,
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
          clearSubscriptionDetails();
          onSubscriptionMethodChange && onSubscriptionMethodChange('strip');
          toggle && toggle();
        } else {
          toast.error('Failed to cancel the Stripe subscription.');
        }
      } finally {
        setLoading(false);
      }
    } else if (isPaypalActive) {
      try {
        if (subscriptionStatus === 'approval_pending') {
          await deletePaypalSubscription(
            session?.accessToken,
            subscriptionDetails?.paypalSubscriptions[0]?._id
          );
          toast.success('PayPal subscription deleted successfully.');
          setSubscriptionDetails(null);
          clearSubscriptionDetails();
          toggle && toggle();
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
            clearSubscriptionDetails();
            onSubscriptionMethodChange && onSubscriptionMethodChange('paypal');
            toggle && toggle();
          } else {
            toast.error('Failed to cancel the PayPal subscription.');
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
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
CancelSubscription.defaultProps = {
  toggle: null,
  onSubscriptionMethodChange: null,
};
export default CancelSubscription;
