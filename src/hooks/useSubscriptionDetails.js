import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPaypalSubscriptionById } from '@/pages/api/paypal';
import { getStripeSubscriptionById } from '@/pages/api/stripe-api';

export const useSubscriptionDetails = (session) => {
  const [stripeSubscriptionDetails, setStripeSubscriptionDetails] =
    useState(null);
  const [paypalSubscriptionDetails, setPaypalSubscriptionDetails] =
    useState(null);

  const hasStripeSubscriptions = session?.user?.stripeSubscriptions?.length > 0;
  const hasPaypalSubscriptions = session?.user?.paypalsubscriptions?.length > 0;
  useEffect(() => {
    const fetchSubscription = async () => {
      if (hasStripeSubscriptions) {
        const subscriptionId = session?.user?.stripeSubscriptions[0];

        try {
          const subscriptionData = await getStripeSubscriptionById(
            subscriptionId,
            session.accessToken
          );
          setStripeSubscriptionDetails(subscriptionData);
        } catch (error) {
          toast.error('Failed to fetch Stripe subscription details.');
        }
      }
      if (hasPaypalSubscriptions) {
        const subscriptionId = session?.user?.paypalsubscriptions[0];
        try {
          const subscriptionData = await getPaypalSubscriptionById(
            subscriptionId,
            session.accessToken
          );
          setPaypalSubscriptionDetails(subscriptionData);
        } catch (error) {
          toast.error('Failed to fetch PayPal subscription details.');
        }
      }
    };

    fetchSubscription();
  }, [hasPaypalSubscriptions, hasStripeSubscriptions, session]);

  return {
    stripeSubscriptionDetails,
    paypalSubscriptionDetails,
    setStripeSubscriptionDetails,
    setPaypalSubscriptionDetails,
  };
};
