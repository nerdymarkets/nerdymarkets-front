/* eslint-disable react/prop-types */
import Subscription from '@/components/subscription/subscription';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner, Container, Alert } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import NotAuthenticatedMessage from '@/components/shared/NotAuthenticatedMessage';
import PortfolioLineChart from '@/components/charts/portfolio-line-chart';
import PortfolioBarChart from '@/components/charts/portfolio-bar-chart';
import usePerformanceStore from '@/stores/usePerformanceStore';
import PortfolioStatsTable from '@/components/portfolio-tabels/portfolio-stats-table';
import PortfolioPieChart from '@/components/charts/portfolio-pie-chart';
import UserComments from '@/components/user-comments/user-comments';
import { fetchAllComments } from '@/pages/api/auth';
import EtfReturnsLineChart from '@/components/charts/Etf-returns-line-chart';
import HistoricalChangesTable from '@/components/portfolio-tabels/historical-changes-table';
import { fetchLatestDataFromS3 } from '@/utils/fetchS3Data';

const Portfolio = ({
  equityData,
  portfolioData,
  dailyData,
  EtfData,
  error,
}) => {
  const { data: session, status } = useSession();
  const { subscriptionDetails } = useSubscriptionStore();
  const { performanceData, loading: performanceDataLoading } =
    usePerformanceStore();
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

  if (status === 'loading' || isLoading || performanceDataLoading) {
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
          <PortfolioLineChart equityData={equityData} />
          <PortfolioBarChart daily={dailyData} />
          <PortfolioStatsTable performanceData={performanceData} />
          <PortfolioPieChart portfolioData={portfolioData} />
          <EtfReturnsLineChart EtfData={EtfData} />
          <HistoricalChangesTable />
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
  const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME;

  const filesToFetch = [
    {
      prefix: 'IV_Portfolios/Data/Metrics/Performance/Daily/',
      fileSuffix: 'consolidated_balances.csv',
    },
    {
      prefix: 'IV_Portfolios/Data/Portfolios/',
      fileSuffix: 'PortfoliosValues.csv',
    },
    {
      prefix: 'IV_Portfolios/Data/Metrics/Performance/Daily/',
      fileSuffix: 'summary_returns.csv',
    },
    {
      prefix: 'IV_Portfolios/Data/Metrics/Performance/Daily/',
      fileSuffix: 'etf_returns.csv',
    },
  ];

  try {
    const results = await Promise.all(
      filesToFetch.map(({ prefix, fileSuffix }) =>
        fetchLatestDataFromS3(bucketName, prefix, fileSuffix)
      )
    );

    return {
      props: {
        equityData: results[0]?.json || [],
        portfolioData: results[1]?.json || [],
        dailyData: results[2]?.json || [],
        EtfData: results[3]?.json || [],
        error: false,
      },
    };
  } catch (error) {
    return {
      props: {
        equityData: [],
        portfolioData: [],
        dailyData: [],
        EtfData: [],
        error: true,
      },
    };
  }
}

export default Portfolio;
