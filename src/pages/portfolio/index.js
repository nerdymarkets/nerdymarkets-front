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
import PortfolioPieChart from '@/components/charts/portfolio-pie-chart';
import UserComments from '@/components/user-comments/user-comments';
import { fetchAllComments } from '@/pages/api/auth';
const Portfolio = ({ performanceData, comments }) => {
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
          <PortfolioPieChart />
          <div className="my-4">
            <UserComments initialComments={comments} />
          </div>
        </Container>
      ) : (
        <Subscription />
      )}
    </div>
  );
};

Portfolio.propTypes = {
  performanceData: PropTypes.any,
  comments: PropTypes.array,
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
    const comments = await fetchAllComments(session.accessToken);
    return {
      props: {
        performanceData: performanceData ?? null,
        comments: comments ?? null,
      },
    };
  } catch (error) {
    return {
      props: {
        performanceData: null,
        comments: null,
      },
    };
  }
}

export default Portfolio;
