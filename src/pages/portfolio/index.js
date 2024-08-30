import Subscription from '@/components/subscription/subscription';
import { useSession } from 'next-auth/react';
import { Spinner, Container } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
const Portfolio = () => {
  const { status } = useSession();
  const { subscriptionDetails } = useSubscriptionStore();

  if (status === 'loading') {
    return (
      <div className="text-center">
        <Spinner color="primary" />
      </div>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <Container className="text-center">
        <h1 className="text-3xl text-red-500">User not authenticated</h1>
      </Container>
    );
  }
  const hasActiveSubscription =
    subscriptionDetails?.isStripeActive || subscriptionDetails?.isPaypalActive;
  return (
    <div className="bg-lightGray">
      {hasActiveSubscription ? (
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
