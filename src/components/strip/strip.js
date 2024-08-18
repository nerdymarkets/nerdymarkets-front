import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { NotificationClient } from '@/components/shared/notifications/stream';
import {
  createStripeSubscription,
  createStripePaymentMethod,
} from '@/pages/api/stripe-api';
import { Button } from 'reactstrap';
const Stripe = () => {
  const { data: session } = useSession();
  const planIdMonthly = 'price_1PnfpuRqt9ErfRwnRVuXccZ9';
  const planIdYearly = 'price_1PnfqZRqt9ErfRwngOedBzfG';
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const [loading, setLoading] = useState(false);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      NotificationClient.error('Stripe has not been properly initialized.');
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      const planId = selectedPlan === 'monthly' ? planIdMonthly : planIdYearly;
      if (!paymentMethod?.id) {
        throw new Error('Failed to create payment method.');
      }
      const paymentMethodResponse = await createStripePaymentMethod(
        session.accessToken,
        paymentMethod.id,
        session?.user?.stripeCustomerId
      );

      if (paymentMethodResponse.error) {
        throw new Error(paymentMethodResponse.error);
      }

      const subscriptionResponse = await createStripeSubscription(
        session.accessToken,
        paymentMethod.id,
        planId,
        selectedPlan
      );

      if (subscriptionResponse.error) {
        throw new Error(subscriptionResponse.error);
      }

      NotificationClient.success('Subscription created successfully!');
    } catch (err) {
      NotificationClient.error(
        err.message || 'An error occurred during the subscription process.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="plan">Choose your plan:</label>
        <select
          id="plan"
          value={selectedPlan}
          onChange={handlePlanChange}
          disabled={loading}
        >
          <option value="monthly">Monthly - $10/month</option>
          <option value="yearly">Yearly - $100/year</option>
        </select>
        <CardElement />
        <Button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay with Stripe'}
        </Button>
      </form>
    </div>
  );
};

export default Stripe;
