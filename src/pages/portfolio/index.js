import Subscription from '@/components/subscription/subscription';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner, Container } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import NotAuthenticatedMessage from '@/components/shared/NotAuthenticatedMessage';
import { getPerformanceData } from '@/pages/api/portfolio';

import PortfolioLineChart from '@/components/charts/portfolio-line-chart';
import PortfolioBarChart from '@/components/charts/portfolio-bar-chart';
import PortfolioStatsTable from '@/components/charts/portfolio-stats-table';
import PortfolioPieChart from '@/components/charts/portfolio-pie-chart';
import UserComments from '@/components/user-comments/user-comments';
import { fetchAllComments } from '@/pages/api/auth';

const Portfolio = () => {
  const { data: session, status } = useSession();
  const { subscriptionDetails, loading } = useSubscriptionStore();
  const [performanceData, setPerformanceData] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session?.accessToken) {
      return;
    }

    const fetchPerformanceData = async () => {
      setIsLoading(true);
      try {
        const performanceResponse = await getPerformanceData(
          session.accessToken
        );
        setPerformanceData(performanceResponse);
        const commentsResponse = await fetchAllComments(session.accessToken);
        setComments(commentsResponse);
      } catch (error) {
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformanceData();
  }, [session?.accessToken]);
  if (status === 'loading' || loading || isLoading) {
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
    subscriptionDetails?.isStripeActive ||
    subscriptionDetails?.isPaypalActive ||
    subscriptionDetails?.isManuallyActivated;

  return (
    <div className="bg-black">
      {hasActiveSubscription ? (
        <Container className="text-center flex flex-col gap-20">
          <PortfolioLineChart />
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

export default Portfolio;
