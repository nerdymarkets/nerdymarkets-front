import Subscription from '@/components/subscription/subscription';
import { useSession, getSession } from 'next-auth/react';
import { Spinner, Container } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import NotAuthenticatedMessage from '@/components/shared/NotAuthenticatedMessage';
import {
  getS3Object,
  getDailyData,
  getMonthlyData,
} from '@/pages/api/portfolio';
import PropTypes from 'prop-types';
import PortfolioLineChart from '@/components/charts/portfolio-line-chart';
import PortfolioBarChartDaily from '@/components/charts/portfolio-bar-chart-daily';
import PortfolioBarChartMonthly from '@/components/charts/portfolio-bar-chart-monthly';
import FileDownloader from '@/components/AWS/file-downloader';

const Portfolio = ({ portfoliosData, dailyData, monthlyData }) => {
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
          <h1 className="text-5xl">Portfolio Charts</h1>
          <PortfolioLineChart portfolios={portfoliosData} />
          <PortfolioBarChartDaily dailyData={dailyData} />
          <PortfolioBarChartMonthly monthlyData={monthlyData} />
          <FileDownloader />
        </Container>
      ) : (
        <Subscription />
      )}
    </div>
  );
};

Portfolio.propTypes = {
  portfoliosData: PropTypes.any,
  dailyData: PropTypes.any,
  monthlyData: PropTypes.any,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session?.accessToken;

  const bucketName =
    'betastage-betastack-nerdym-datastorebucket46f857ee-molwgoe5ncwf';
  const portfoliosPath =
    'IV_Portfolios/Data/Portfolios/2024-08-28/PortfoliosValues.csv';
  const daily = 'IV_Portfolios/Data/Metrics/Performance/Daily';
  const monthly = 'IV_Portfolios/Data/Metrics/Performance/Monthly';

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const [portfoliosData, dailyData, monthlyData] = await Promise.all([
      getS3Object(token, bucketName, portfoliosPath),
      getDailyData(token, bucketName, daily),
      getMonthlyData(token, bucketName, monthly),
    ]);

    return {
      props: {
        portfoliosData: portfoliosData ?? null,
        dailyData: dailyData ?? null,
        monthlyData: monthlyData ?? null,
      },
    };
  } catch (error) {
    return {
      props: {
        portfoliosData: null,
        dailyData: null,
        monthlyData: null,
      },
    };
  }
}

export default Portfolio;
