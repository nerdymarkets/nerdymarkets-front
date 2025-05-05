/* eslint-disable react/prop-types */
import Subscription from '@/components/subscription/subscription';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner, Container, Alert } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import NotAuthenticatedMessage from '@/components/shared/NotAuthenticatedMessage';
import PortfolioLineChart from '@/components/charts/portfolio-line-chart';
import PortfolioBarChart from '@/components/charts/portfolio-bar-chart';
import PortfolioStatsTable from '@/components/portfolio-tabels/portfolio-stats-table';
import PortfolioCompositionPieChart from '@/components/charts/portfolio-composition-pie-chart';
import UserComments from '@/components/user-comments/user-comments';
import { fetchAllComments } from '@/pages/api/auth';
import CurrentPortfolioTable from '@/components/portfolio-tabels/current-portfolio-table';
import config from '@/environments/environment';
import HistoricalOrdersTable from '@/components/portfolio-tabels/historical-orders-table';

const Portfolio = ({
  equityData,
  spyData,
  metricsData,
  portfolioValues,
  orders,
  error,
}) => {
  const { data: session, status } = useSession();
  const { subscriptionDetails } = useSubscriptionStore();

  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasActiveSubscription =
    subscriptionDetails?.isStripeActive ||
    subscriptionDetails?.isPaypalActive ||
    subscriptionDetails?.isManuallyActivated;

  useEffect(() => {
    if (!session?.accessToken) {
      return;
    }

    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const commentsResponse = await fetchAllComments(session.accessToken);
        setComments(commentsResponse);
      } catch (error) {
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [session?.accessToken]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="text-customPink" />
      </div>
    );
  }
  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert color="danger">
          <h4 className="alert-heading">Data Fetch Error</h4>
          <p>
            Unfortunately, we were unable to load the necessary data. Please try
            refreshing the page or contact support if the problem persists.
          </p>
        </Alert>
      </Container>
    );
  }
  if (status === 'unauthenticated') {
    return <NotAuthenticatedMessage />;
  }

  return (
    <div className="bg-black">
      {hasActiveSubscription ? (
        <Container className="text-center flex flex-col gap-20">
          <PortfolioLineChart equityData={equityData} spyData={spyData} />
          <PortfolioBarChart spyData={spyData} metricsData={metricsData} />
          <PortfolioStatsTable metricsData={metricsData} />
          <CurrentPortfolioTable portfolioValues={portfolioValues} />
          <PortfolioCompositionPieChart portfolioValues={portfolioValues} />

          <HistoricalOrdersTable orders={orders} />
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

export async function getServerSideProps() {
  const baseUrl = config.backendBaseUrl;

  try {
    const [equityRes, spyRes, metricsRes, portfolioValuesRes, ordersRes] =
      await Promise.all([
        fetch(`${baseUrl}/performance/equity`),
        fetch(`${baseUrl}/performance/spy`),
        fetch(`${baseUrl}/performance/metrics`),
        fetch(`${baseUrl}/performance/portfolio-values`),
        fetch(`${baseUrl}/performance/orders`),
      ]);

    if (
      !equityRes.ok ||
      !spyRes.ok ||
      !metricsRes.ok ||
      !portfolioValuesRes.ok ||
      !ordersRes.ok
    ) {
      throw new Error('Failed to fetch performance data');
    }

    const [equityData, spyData, metricsData, portfolioValues, orders] =
      await Promise.all([
        equityRes.json(),
        spyRes.json(),
        metricsRes.json(),
        portfolioValuesRes.json(),
        ordersRes.json(),
      ]);

    return {
      props: {
        equityData,
        spyData,
        metricsData,
        portfolioValues,
        orders,
        error: false,
      },
    };
  } catch (error) {
    return {
      props: {
        equityData: [],
        spyData: [],
        metricsData: [],
        portfolioValues: [],
        orders: [],
        error: true,
      },
    };
  }
}

export default Portfolio;
