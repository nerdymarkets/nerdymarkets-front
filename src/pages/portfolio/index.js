import Subscription from '@/components/subscription/subscription';
import { useSession } from 'next-auth/react';
import { Spinner, Container } from 'reactstrap';

import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getPaypalSubscriptionById } from '@/pages/api/paypal';
import { getStripeSubscriptionById } from '@/pages/api/stripe-api';
import useSubscriptionStore from '@/stores/subscription-store';
const Portfolio = () => {
  const { data: session, status } = useSession();
  const { setSubscriptionDetails, subscriptionDetails } =
    useSubscriptionStore();
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
  if (status === 'loading') {
    return (
      <div className="text-center">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="bg-lightGray">
      {subscriptionDetails?.status === 'active' ? (
        <Container className="text-center">
          <h1 className="text-5xl">
            Portfolio Charts when we will have API(SDK) from AWS
          </h1>
        </Container>
      ) : (
        <Subscription />
      )}
    </div>
  );
};

export default Portfolio;
