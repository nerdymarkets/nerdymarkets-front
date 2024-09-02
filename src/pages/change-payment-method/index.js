import { useState } from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import PaymentInfo from '@/components/profile/payment-info';
import Stripe from '@/components/strip/strip';
import { useRouter } from 'next/router';
import Paypal from '@/components/paypal/paypa';
import CancelSubscription from '@/components/subscription/cancel-subscription';

const ChangePaymentMethod = () => {
  const { planType } = useSubscriptionStore();
  const [subscriptionMethod, setSubscriptionMethod] = useState(null);
  const [isPlanType] = useState(planType);
  const router = useRouter();
  const [step, setStep] = useState(1);

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
            <CardTitle className="text-center text-3xl">
              Change Payment Method
            </CardTitle>
            <CardSubtitle className="text-muted">Current Payment</CardSubtitle>
            <div className="  mt-2 uppercase ">
              <div className="flex justify-center mt-2">
                <PaymentInfo />
              </div>
            </div>
            <CancelSubscription
              buttonName="Change"
              className="w-full py-4 bg-customPink hover:bg-customPinkSecondary shadow-2xl"
              onSubscriptionMethodChange={handleSubscriptionMethodChange}
            />
          </CardBody>
        </Card>
      )}

      {step === 2 && (
        <Container>
          <CardBody>
            {subscriptionMethod === 'strip' && (
              <Paypal
                subscriptionType={isPlanType}
                buttonName="Change Payment Method"
              />
            )}
            {subscriptionMethod === 'paypal' && (
              <div className="px-56">
                <CardTitle className="text-center text-white text-3xl mb-4">
                  Enter Card Details
                </CardTitle>
                <Stripe
                  subscriptionType={isPlanType}
                  toggle={NavigateToHomePage}
                  buttonName="Submit to Change Plan"
                />
              </div>
            )}
          </CardBody>
        </Container>
      )}
    </Container>
  );
};

ChangePaymentMethod.propTypes = {};

export default ChangePaymentMethod;
