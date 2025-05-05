import Layout from '@/components/layout/layout';
import PropTypes from 'prop-types';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function SessionWrapper({ children }) {
  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Elements stripe={stripePromise}>
        <Layout>
          <SpeedInsights />

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
