import useSubscriptionStore from '@/stores/subscription-store';
import { changeStripeSubscriptionPlan } from '@/pages/api/stripe-api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const ChangeSubscriptionPlan = () => {
  const {
    planType,
    isStripeActive,
    setSubscriptionDetails,
    subscriptionDetails,
  } = useSubscriptionStore();
  const { data: session } = useSession();
  const handelChangeSubscriptionPlan = async () => {
    if (isStripeActive) {
      try {
        const newPlanId =
          planType === 'monthly'
            ? process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_YEARLY
            : process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_MONTHLY;

        const response = await changeStripeSubscriptionPlan(
          session?.accessToken,
          newPlanId
        );

        if (response && response.plan === newPlanId) {
          const updatedSubscription = {
            ...subscriptionDetails.stripeSubscriptions[0],
            plan: newPlanId,
            planType:
              newPlanId === process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_YEARLY
                ? 'yearly'
                : 'monthly',
            status: response.status,
            currentPeriodEnd: response.currentPeriodEnd,
            price: response.price,
            billing_info: response.billing_info,
          };

          setSubscriptionDetails({
            ...subscriptionDetails,
            stripeSubscriptions: [updatedSubscription],
          });
        } else {
          toast.error(
            response.message || 'Failed to change subscription plan.'
          );
        }
      } catch (error) {
        toast.error(
          'An error occurred while changing the Stripe subscription plan.'
        );
      }
    } else {
      toast.error('Stripe subscription is not active.');
    }
  };

  return (
    <div>
      <button onClick={handelChangeSubscriptionPlan}>
        Change Subscription Plan
      </button>
    </div>
  );
};

export default ChangeSubscriptionPlan;
