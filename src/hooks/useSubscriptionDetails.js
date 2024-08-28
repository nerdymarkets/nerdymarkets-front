import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getPaypalSubscriptionById } from '@/pages/api/paypal';
import { getStripeSubscriptionById } from '@/pages/api/stripe-api';
import useSubscriptionStore from '@/stores/subscription-store';
export const useSubscriptionDetails = (session) => {
  const {
    subscriptionDetails,
    subscriptionStatus,
    planType,
    isPaypalActive,
    isStripeActive,
    setSubscriptionDetails,
  } = useSubscriptionStore();
  const hasStripeSubscriptions = useMemo(
    () => session?.user?.stripeSubscriptions?.length > 0,
    [session?.user?.stripeSubscriptions]
  );

  const hasPaypalSubscriptions = useMemo(
    () => session?.user?.paypalsubscriptions?.length > 0,
    [session?.user?.paypalsubscriptions]
  );
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session) {
        return;
      }
      try {
        if (hasStripeSubscriptions) {
          const subscriptionData = await getStripeSubscriptionById(
            session.user.stripeSubscriptions[0],
            session.accessToken
          );
          if (subscriptionData?.status.toLowerCase() === 'active') {
            setSubscriptionDetails({
              ...subscriptionData,
              isStripeActive: true,
            });
          }
        }

        if (hasPaypalSubscriptions) {
          const subscriptionData = await getPaypalSubscriptionById(
            session.user.paypalsubscriptions[0],
            session.accessToken
          );

          if (
            subscriptionData?.status.toLowerCase() === 'active' ||
            subscriptionData?.status.toLowerCase() === 'approval_pending'
          ) {
            setSubscriptionDetails({
              ...subscriptionData,
              isPaypalActive: true,
            });
          }
        }
      } catch (error) {
        toast.error('Failed to fetch subscription details.');
      }
    };

    fetchSubscription();
  }, [
    session,
    hasStripeSubscriptions,
    hasPaypalSubscriptions,
    setSubscriptionDetails,
  ]);

  return {
    subscriptionDetails,
    subscriptionStatus,
    planType,
    setSubscriptionDetails,
    isPaypalActive,
    isStripeActive,
  };
};
