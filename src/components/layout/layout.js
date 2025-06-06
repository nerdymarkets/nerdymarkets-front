import Header from '../../components/header/header';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Inter } from 'next/font/google';
import Footer from '../footer/footer';
import { useSession } from 'next-auth/react';
import { getUserSubscriptions } from '../../pages/api/auth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useSubscriptionStore from '../../stores/subscription-store';
const inter = Inter({ subsets: ['latin'] });
const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const { setSubscriptionDetails, setLoading } = useSubscriptionStore();
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session) {
        return;
      }
      setLoading(true);
      try {
        const subscriptionData = await getUserSubscriptions(
          session.accessToken
        );
        const combinedSubscriptionDetails = {
          stripeSubscriptions: subscriptionData.stripeSubscriptions || [],
          paypalSubscriptions: subscriptionData.paypalSubscriptions || [],
          isStripeActive:
            subscriptionData.stripeSubscriptions?.some(
              (sub) => sub.status.toLowerCase() === 'active'
            ) || false,
          isPaypalActive:
            subscriptionData.paypalSubscriptions?.some(
              (sub) =>
                sub.status.toLowerCase() === 'active' ||
                sub.status.toLowerCase() === 'approval_pending'
            ) || false,
          isManuallyActivated: subscriptionData.isManuallyActivated || false,
        };

        setSubscriptionDetails(combinedSubscriptionDetails);
      } catch (error) {
        toast.error('Failed to fetch subscription details.');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchSubscription();
    }
  }, [setSubscriptionDetails, status, session, setLoading]);

  return (
    <div className={`flex flex-col  ${inter.className}`}>
      <Container fluid>
        <Header />
      </Container>
      <div className="flex-grow min-h-screen font-modernSerif">{children}</div>
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
