import Subscription from '@/components/subscription/subscription';
import { useSession } from 'next-auth/react';
import { Spinner, Container } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import NotAuthenticatedMessage from '@/components/shared/NotAuthenticatedMessage';

const Portfolio = () => {
  const { status } = useSession();
  const { subscriptionDetails, loading } = useSubscriptionStore();

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="text-customPink" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <NotAuthenticatedMessage />;
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
