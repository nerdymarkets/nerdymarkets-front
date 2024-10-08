import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import {
  createStripeSubscription,
  createStripePaymentMethod,
} from '@/pages/api/stripe-api';
import { getUserSubscriptions } from '@/pages/api/auth';
import { useSession } from 'next-auth/react';
import { Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import useSubscriptionStore from '@/stores/subscription-store';
const Stripe = ({ subscriptionType, toggle, buttonName }) => {
  const { data: session } = useSession();
  const planIdMonthly = process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_MONTHLY;
  const planIdYearly = process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_YEARLY;
  const { setSubscriptionDetails } = useSubscriptionStore();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe has not been properly initialized.');
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

      const planId =
        subscriptionType === 'monthly' ? planIdMonthly : planIdYearly;
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
        subscriptionType
      );
      if (subscriptionResponse.error) {
        throw new Error(subscriptionResponse.error);
      }
      if (subscriptionResponse.status === 'active') {
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
        toggle();
      } else {
        toast.error('Subscription was not activated successfully.');
      }
      toast.success('Subscription created successfully!');
    } catch (err) {
      toast.error('An error occurred during the subscription process.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="pb-2">
        <p className="text-center font-bold py-4 text-lg">
          Credit or Debit Card
        </p>
        <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
          <CardElement
            className="text-lg"
            options={{
              style: {
                base: {
                  color: '#424770',
                  letterSpacing: '0.025em',
                  fontFamily: 'Source Code Pro, monospace',
                  '::placeholder': {
                    color: '#124E66',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="mt-4 bg-customPinkSecondary hover:bg-customPink border-none font-bold rounded-3xl w-full"
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2 text-customPink" />
              Processing...
            </>
          ) : (
            buttonName
          )}
        </Button>
      </form>
    </div>
  );
};
Stripe.propTypes = {
  subscriptionType: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
};
export default Stripe;
