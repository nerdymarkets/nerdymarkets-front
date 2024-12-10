import { useState } from 'react';
import {
  Button,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import { changeStripeSubscriptionPlan } from '@/pages/api/stripe-api';
import { changePaypalSubscriptionPlan } from '@/pages/api/paypal';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const ChangeSubscriptionPlan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const {
    planType,
    isStripeActive,
    isPaypalActive,
    setSubscriptionDetails,
    subscriptionDetails,
  } = useSubscriptionStore();
  const { data: session } = useSession();

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Toggle modal

  const confirmChangeSubscriptionPlan = async () => {
    setIsLoading(true);

    if (isStripeActive) {
      try {
        const newPlanId =
          planType === 'monthly'
            ? process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_YEARLY
            : process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_MONTHLY;

        const response = await changeStripeSubscriptionPlan(
          session?.accessToken,
          newPlanId
        );

        if (response && response.plan === newPlanId) {
          const updatedSubscription = {
            ...subscriptionDetails.stripeSubscriptions[0],
            plan: newPlanId,
            planType:
              newPlanId === process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_YEARLY
                ? 'yearly'
                : 'monthly',
            status: response.status,
            currentPeriodEnd: response.currentPeriodEnd,
            price: response.price,
            billing_info: response.billing_info,
          };

          setSubscriptionDetails({
            ...subscriptionDetails,
            stripeSubscriptions: [updatedSubscription],
          });

          toast.success('Stripe subscription plan changed successfully.');
        } else {
          toast.error(
            response.message || 'Failed to change subscription plan.'
          );
        }
      } catch (error) {
        toast.error(
          'An error occurred while changing the Stripe subscription plan.'
        );
      } finally {
        setIsLoading(false);
        toggleModal(); // Close modal
      }
    } else if (isPaypalActive) {
      try {
        const newPlanId =
          planType === 'monthly'
            ? process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_YEARLY
            : process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_MONTHLY;
        const subscriber = {
          given_name: session.firstname,
          surname: session.lastname,
          email_address: session.email,
        };

        const response = await changePaypalSubscriptionPlan(
          session?.accessToken,
          newPlanId,
          subscriber
        );

        if (response && response.approvalUrl) {
          toast.success('Redirecting to PayPal...');
          window.location.href = response.approvalUrl;
        } else {
          toast.error('Failed to retrieve approval URL.');
        }
      } catch (error) {
        toast.error(
          'An error occurred while changing the PayPal subscription plan.'
        );
      } finally {
        setIsLoading(false);
        toggleModal(); // Close modal
      }
    } else {
      toast.error('No active subscription method selected.');
      setIsLoading(false);
      toggleModal(); // Close modal
    }
  };

  return (
    <div>
      {/* Button to open confirmation modal */}
      <Button
        size="sm"
        color="primary"
        onClick={toggleModal}
        disabled={isLoading}
        className="rounded-3xl font-bold"
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="text-customPink" /> Changing Plan...
          </>
        ) : (
          'Change Subscription Plan'
        )}
      </Button>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        toggle={toggleModal}
        className="bg-white rounded-3xl"
      >
        <ModalHeader toggle={toggleModal}>Confirm Plan Change</ModalHeader>
        <ModalBody>
          Are you sure you want to change your subscription plan to{' '}
          <b>{planType === 'monthly' ? 'Yearly' : 'Monthly'}</b>?
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={confirmChangeSubscriptionPlan}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="text-light" /> Confirming...
              </>
            ) : (
              'Confirm'
            )}
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ChangeSubscriptionPlan;
