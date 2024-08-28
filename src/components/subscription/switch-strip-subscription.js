import { Button } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import {
  cancelStripeSubscription,
  deleteStripeSubscription,
} from '@/pages/api/stripe-api';
const SwitchStripSubscription = () => {
  const {
    planType,
    isPaypalActive,
    isStripeActive,
    subscriptionDetails,
    setSubscriptionDetails,
  } = useSubscriptionStore();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const handelSwitchPlan = async () => {
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
        }
      } catch (error) {
        toast.error(
          'An error occurred while canceling the Stripe subscription.'
        );
      }
    }
  };
  return (
    <Button
      size="sm"
      color="warning"
      className="text-white rounded-3xl font-bold shadow-lg border-none"
    >
      {planType === 'monthly'
        ? 'Switch to Yearly - Save 10%'
        : 'Switch to Monthly - More Flexibility'}
    </Button>
  );
};

export default SwitchStripSubscription;
