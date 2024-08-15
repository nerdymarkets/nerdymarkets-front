import Layout from '@/components/layout/layout';
import PropTypes from 'prop-types';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { Notifications } from '@/components/shared/notifications/notifications';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Load your publishable key from Stripe
const stripePromise = loadStripe(process.env.NEXT_STRIPE_PUBLISHABLE_KEY);

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Elements stripe={stripePromise}>
        <Layout>
          <Notifications />
          <Component {...pageProps} />
        </Layout>
      </Elements>
    </SessionProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
