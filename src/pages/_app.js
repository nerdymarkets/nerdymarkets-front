import Layout from '@/components/layout/layout';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SessionProvider, useSession } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EquityDataFetcher from '@/components/s3/EquityDataFetcher';
import LatestPortfolioFetcher from '@/components/s3/LatestPortfolioFetcher';
import EtfReturnsFetcher from '@/components/s3/EtfReturnsFetcher';
import { getPerformanceData } from '@/pages/api/portfolio';
import usePerformanceStore from '@/stores/usePerfromanceStore';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function SessionWrapper({ children }) {
  const { data: session } = useSession();
  const { setPerformanceData, setLoading } = usePerformanceStore();

  useEffect(() => {
    if (!session?.accessToken) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const performanceResponse = await getPerformanceData(
          session.accessToken
        );
        setPerformanceData(performanceResponse);
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.accessToken, setPerformanceData, setLoading]);

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Elements stripe={stripePromise}>
        <Layout>
          <EquityDataFetcher />
          <LatestPortfolioFetcher />
          <EtfReturnsFetcher />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
          <SessionWrapper>
            <Component {...pageProps} />
          </SessionWrapper>
        </Layout>
      </Elements>
    </SessionProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
