import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { NotificationClient } from '@/components/shared/notifications/stream';
import {
  createStripeSubscription,
  createStripePaymentMethod,
  cancelStripeSubscription,
  getStripeSubscriptionById,
} from '@/pages/api/stripe-api';

const Stripe = () => {
  const { data: session } = useSession();
  const planIdMonthly = 'price_1PnfpuRqt9ErfRwnRVuXccZ9';
  const planIdYearly = 'price_1PnfqZRqt9ErfRwngOedBzfG';
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSubscription() {
      if (session?.user?.stripeSubscriptions?.length > 0) {
        setLoading(true);
        try {
          const subscription = await getStripeSubscriptionById(
            session.user.stripeSubscriptions[0],
            session.accessToken
          );
          if (subscription) {
            setSubscriptionId(subscription.stripeSubscriptionId);
          }
        } catch (err) {
          NotificationClient.error('Failed to fetch subscription');
        } finally {
          setLoading(false);
        }
      }
    }
    fetchSubscription();
  }, [session]);

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

      setSubscriptionId(subscriptionResponse.stripeSubscriptionId);
      NotificationClient.success('Subscription created successfully!');
    } catch (err) {
      NotificationClient.error(
        err.message || 'An error occurred during the subscription process.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscriptionId) {
      NotificationClient.error('No subscription found to cancel.');
      return;
    }

    setLoading(true);

    try {
      const response = await cancelStripeSubscription(
        session.accessToken,
        subscriptionId
      );

      if (response.status === 'canceled') {
        NotificationClient.success(response.message);
        setSubscriptionId(null);
      } else {
        NotificationClient.error('Failed to cancel subscription.');
      }
    } catch (err) {
      NotificationClient.error(
        err.message || 'An error occurred during subscription cancellation.'
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
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay with Stripe'}
        </button>
      </form>

      {subscriptionId && (
        <button onClick={handleCancelSubscription} disabled={loading}>
          {loading ? 'Canceling...' : 'Cancel Subscription'}
        </button>
      )}
    </div>
  );
};

export default Stripe;
