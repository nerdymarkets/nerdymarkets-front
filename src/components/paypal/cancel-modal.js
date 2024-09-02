import { Button, Modal, ModalBody } from 'reactstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deletePaypalSubscription } from '@/pages/api/paypal';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSubscriptionStore from '@/stores/subscription-store';
const CancelModal = () => {
  const [modalOpen] = useState(true);
  const { data: session, update } = useSession();
  const { subscriptionDetails, isPaypalActive, clearSubscriptionDetails } =
    useSubscriptionStore();
  const router = useRouter();

  const handleCancelSubscription = async () => {
    try {
      await deletePaypalSubscription(
        session?.accessToken,
        subscriptionDetails?.paypalSubscriptions[0]._id
      );
      const updatedSubscriptions = session.user.paypalsubscriptions.filter(
        (id) => id !== subscriptionDetails?.paypalSubscriptions[0]._id
      );

      await update({ paypalsubscriptions: updatedSubscriptions });
      clearSubscriptionDetails();
      toast.success('Successfully canceled');
      router.push('/');
    } catch (err) {
      toast.error('An error occurred while canceling the PayPal subscription.');
    }
  };
  const navigateApprovalUrl = () => {
    if (isPaypalActive) {
      router.push(subscriptionDetails?.paypalSubscriptions[0].approvalUrl);
    } else {
      toast.error('No approval URL found.');
    }
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={handleCancelSubscription}
      centered={true}
      className="rounded-lg"
    >
      <ModalBody className="text-center py-6 px-6 bg-lightGradient rounded-3xl">
        <h2 className="text-xl font-bold mb-4 text-customPink">
          Complete Your Subscription
        </h2>
        <p className="mb-6 text-gray-600">
          Please choose an option below to complete or cancel your subscription.
        </p>

        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-5xl w-40"
            />
            <Button
              onClick={navigateApprovalUrl}
              className="w-full bg-green-500 hover:bg-green-600 border-none rounded-3xl font-bold text-lg mb-4"
            >
              Finish Subscription
            </Button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="text-red-500 text-5xl w-40"
            />

            <Button
              onClick={handleCancelSubscription}
              className="w-full bg-red-500 hover:bg-red-600 border-none rounded-3xl font-bold text-lg mb-4"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CancelModal;
