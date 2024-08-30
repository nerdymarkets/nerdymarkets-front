import { useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
} from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import PaymentInfo from '@/components/profile/payment-info';
import Stripe from '@/components/strip/strip';
import { useRouter } from 'next/router';
import Paypal from '@/components/paypal/paypa';
import CancelSubscription from '@/components/subscription/cancel-subscription';

const ChangePlan = () => {
  const { subscriptionDetails, planType, subscriptionStatus } =
    useSubscriptionStore();
  const [currentPlan] = useState(planType === 'monthly' ? 'yearly' : 'monthly');
  const [subscriptionMethod, setSubscriptionMethod] = useState(null);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const stripeSubscription =
    (Array.isArray(subscriptionDetails?.stripeSubscriptions) &&
      subscriptionDetails.stripeSubscriptions[0]) ||
    {};
  const paypalSubscription =
    (Array.isArray(subscriptionDetails?.paypalSubscriptions) &&
      subscriptionDetails.paypalSubscriptions[0]) ||
    {};
  const { currentPeriodEnd, price } = stripeSubscription;
  const { next_billing_time, billing_info } = paypalSubscription;
  const paypalPrice = billing_info?.amount?.total || '';
  const paypalCurrency = billing_info?.amount?.currency?.toUpperCase() || '';
  const stripCurrency = stripeSubscription.currency?.toUpperCase() || '';
  const formattedPeriodEnd = new Date(
    currentPeriodEnd || next_billing_time
  ).toLocaleDateString();
  const formattedStripePrice = price ? (price / 100).toFixed(2) : '';

  const handleSubscriptionMethodChange = (method) => {
    setSubscriptionMethod(method);
    setStep(2);
  };
  const NavigateToHomePage = () => {
    router.push('/');
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100 bg-black"
      style={{ maxWidth: '100vw' }}
    >
      {step === 1 && (
        <Card
          className="shadow-sm mx-auto rounded-3xl "
          style={{ maxWidth: '500px' }}
        >
          <CardBody className="text-center py-20 px-20">
            <CardTitle className="text-center text-3xl">Change Plan</CardTitle>
            <CardSubtitle className="text-muted">
              Current Subscription Info
            </CardSubtitle>
            <div className="  mt-2 uppercase ">
              <Badge className="bg-customPink-important rounded-3xl">
                {subscriptionStatus}
              </Badge>
              <Badge className="bg-customPink-important rounded-3xl ">
                {planType}
              </Badge>
              {stripeSubscription && (
                <>
                  <Badge className="bg-customPink-important rounded-3xl">
                    Price:
                    {formattedStripePrice || paypalPrice
                      ? formattedStripePrice || paypalPrice
                      : ''}
                    {paypalCurrency || stripCurrency
                      ? paypalCurrency || stripCurrency
                      : ''}
                  </Badge>

                  <Badge className="bg-customPink-important rounded-3xl">
                    Next Billing: {formattedPeriodEnd ? formattedPeriodEnd : ''}
                  </Badge>
                </>
              )}
              <div className="flex justify-center mt-2">
                <PaymentInfo />
              </div>
            </div>
            <CancelSubscription
              buttonName="Change"
              onSubscriptionMethodChange={handleSubscriptionMethodChange}
              className="w-full py-4 bg-customPink hover:bg-customPinkSecondary shadow-2xl"
            />
          </CardBody>
        </Card>
      )}

      {step === 2 && (
        <Container>
          <CardBody>
            {subscriptionMethod === 'paypal' && (
              <Paypal
                subscriptionType={currentPlan}
                buttonName="Submit to Change Plan"
              />
            )}
            {subscriptionMethod === 'stripe' && (
              <>
                <CardTitle className="text-center text-white text-3xl mb-4">
                  Enter Card Details
                </CardTitle>
                <Stripe
                  subscriptionType={currentPlan}
                  toggle={NavigateToHomePage}
                  buttonName="Submit to Change Plan"
                />
              </>
            )}
          </CardBody>
        </Container>
      )}
    </Container>
  );
};

ChangePlan.propTypes = {};

export default ChangePlan;
