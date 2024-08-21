import Subscription from '@/components/subscription/subscription';
import { useSession } from 'next-auth/react';
import { Spinner, Container } from 'reactstrap';

const Portfolio = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="text-center">
        <Spinner color="primary" />
      </div>
    );
  }

  const hasPaypalSubscriptions = session?.user?.paypalsubscriptions?.length > 0;
  const hasStripeSubscriptions = session?.user?.stripeSubscriptions?.length > 0;

  return (
    <div className="bg-lightGray">
      {hasPaypalSubscriptions || hasStripeSubscriptions ? (
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
