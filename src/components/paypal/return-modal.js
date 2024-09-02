import { Button, Modal, ModalBody, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { captureSubscription } from '@/pages/api/paypal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  faCircleCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { getUserSubscriptions } from '@/pages/api/auth';
import useSubscriptionStore from '@/stores/subscription-store';
const ReturnModal = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [subscriptionStatus, setSubscriptionStatus] = useState(
    'Processing your subscription...'
  );
  const [error, setError] = useState(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [isSessionUpdated, setIsSessionUpdated] = useState(false);
  const { setSubscriptionDetails } = useSubscriptionStore();
  useEffect(() => {
    const { subscription_id } = router.query;
    if (
      status === 'authenticated' &&
      session?.accessToken &&
      subscription_id &&
      !subscriptionInfo
    ) {
      captureSubscription(session.accessToken, subscription_id)
        .then(async (response) => {
          setSubscriptionStatus(
            'Subscription successfully activated and paid.'
          );
          setSubscriptionInfo(response);
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
          };

          setSubscriptionDetails(combinedSubscriptionDetails);
          toast.success('Subscription successfully activated and paid.');
        })
        .catch((error) => {
          setSubscriptionStatus('Failed to activate subscription.');
          toast.error('Failed to activate subscription.');
          setError(error);
        });
    } else if (status === 'unauthenticated') {
      setSubscriptionStatus('User is not authenticated.');
    }
  }, [router.query, session, setSubscriptionDetails, status, subscriptionInfo]);

  useEffect(() => {
    if (subscriptionInfo && session && !isSessionUpdated) {
      update({
        paypalsubscriptions: [
          ...session.user.paypalsubscriptions,
          subscriptionInfo._id,
        ],
      }).then(() => {
        setIsSessionUpdated(true);
      });
    }
  }, [session, update, isSessionUpdated, subscriptionInfo]);

  if (status === 'loading') {
    return <Spinner className="text-customPink" />;
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    router.push('/portfolio');
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      centered={true}
      className="rounded-lg"
    >
      <ModalBody className="text-center py-6 px-6 bg-lightGradient rounded-3xl">
        <div className="flex justify-center mb-4">
          {error ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-500 w-40"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green-500  w-40"
            />
          )}
        </div>
        <p className="text-2xl font-semibold mb-4 ">{subscriptionStatus}</p>
        <Button
          onClick={toggleModal}
          className="w-full bg-customPinkSecondary hover:bg-customPink border-none  rounded-3xl font-bold text-lg"
        >
          Go to Portfolio
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default ReturnModal;
