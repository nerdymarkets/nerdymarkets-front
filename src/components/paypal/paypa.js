import { createSubscription } from '@/pages/api/paypal';
import { useSession } from 'next-auth/react';
import { NotificationClient } from '@/components/shared/notifications/stream';
import { useState } from 'react';
import { Button } from 'reactstrap';
const Paypal = () => {
  const { data: session } = useSession();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const monthlyPlanId = process.env.PAYPAL_PLAN_ID_MONTHLY;
  const yearlyPlanId = process.env.PAYPAL_PLAN_ID_YEARLY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const planId = selectedPlan === 'yearly' ? yearlyPlanId : monthlyPlanId;

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
      NotificationClient.error('Approval URL not found in the response:');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="subscription-plan">Choose a subscription plan:</label>
        <select
          id="subscription-plan"
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          <option value="monthly">Monthly Subscription</option>
          <option value="yearly">Yearly Subscription</option>
        </select>
        <Button type="submit">Subscribe with Paypal</Button>
      </form>
    </div>
  );
};

export default Paypal;
