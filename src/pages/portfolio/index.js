import Subscription from '@/components/subscription/subscription';
import { useSession, getSession } from 'next-auth/react';
import { Spinner, Container } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import NotAuthenticatedMessage from '@/components/shared/NotAuthenticatedMessage';
import { getPerformanceData } from '@/pages/api/portfolio';
import PropTypes from 'prop-types';
import PortfolioLineChart from '@/components/charts/portfolio-line-chart';
import PortfolioBarChart from '@/components/charts/portfolio-bar-chart';
import PortfolioStatsTable from '@/components/charts/portfolio-stats-table';

const Portfolio = ({ performanceData }) => {
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
          <h1 className="text-5xl">Portfoliao Charts</h1>
          <PortfolioLineChart performanceData={performanceData} />
          <PortfolioBarChart performanceData={performanceData} />
          <PortfolioStatsTable performanceData={performanceData} />
        </Container>
      ) : (
        <Subscription />
      )}
    </div>
  );
};

Portfolio.propTypes = {
  performanceData: PropTypes.any,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session?.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const performanceData = await getPerformanceData(token);

    return {
      props: {
        performanceData: performanceData ?? null,
      },
    };
  } catch (error) {
    return {
      props: {
        performanceData: null,
      },
    };
  }
}

export default Portfolio;
