import { createSubscription } from '@/pages/api/paypal';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { PaypalButton } from './paypal-button';
const Paypal = ({ subscriptionType }) => {
  const { data: session } = useSession();
  const monthlyPlanId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_MONTHLY;
  const yearlyPlanId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_YEARLY;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const planId = subscriptionType === 'yearly' ? yearlyPlanId : monthlyPlanId;
    const subscriber = {
      given_name: session.firstname,
      surname: session.lastname,
      email_address: session.email,
    };

    const response = await createSubscription(
      session.accessToken,
      planId,
      subscriber
    );

    if (response && response.approvalUrl) {
      window.location.href = response.approvalUrl;
    } else {
      toast.error('Approval URL not found in the response:');
    }
  };

  return (
    <div className="py-20">
      <PaypalButton onClick={handleSubmit}>Subscribe with Paypal</PaypalButton>
    </div>
  );
};
Paypal.propTypes = {
  subscriptionType: PropTypes.string,
};
export default Paypal;
