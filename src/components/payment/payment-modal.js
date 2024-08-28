import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
} from 'reactstrap';
import Paypal from '@/components/paypal/paypa';
import Stripe from '@/components/strip/strip';
import Image from 'next/image';
import paypalLogo from '../../../public/logo/paypallogo.png';
import stripeLogo from '../../../public/logo/stripelogo.png';

const PaymentModal = ({ isOpen, toggle, subscriptionType }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (paymentMethod) {
      setStep(2);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true}>
      <ModalHeader
        toggle={toggle}
        className="text-center bg-coolGray rounded-t-3xl"
      >
        <p className="text-xl font-semibold">
          {subscriptionType === 'monthly'
            ? 'Monthly Subscription'
            : 'Yearly Subscription'}
        </p>
      </ModalHeader>
      <ModalBody className="p-6 bg-lightGray rounded-b-3xl">
        {step === 1 && (
          <div>
            <Form>
              <FormGroup tag="fieldset" className="space-y-4">
                <legend className="text-xl font-bold text-center py-4">
                  Select Payment Method
                </legend>
                <div className="flex justify-center gap-10 ">
                  <Label
                    check
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'paypal'
                        ? '  shadow-paypal'
                        : 'border-gray-300'
                    }`}
                  >
                    <Input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <Image
                      src={paypalLogo}
                      alt="PayPal"
                      width={80}
                      height={40}
                    />
                  </Label>

                  <Label
                    check
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'stripe'
                        ? ' shadow-stripe'
                        : 'border-gray-300'
                    }`}
                  >
                    <Input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <Image
                      src={stripeLogo}
                      alt="Stripe"
                      width={80}
                      height={40}
                    />
                  </Label>
                </div>
              </FormGroup>
              <Button
                onClick={handleNext}
                disabled={!paymentMethod}
                className="w-full mt-6 bg-customPink  hover:bg-customPinkSecondary  text-white py-2 px-4 rounded-3xl border-none "
              >
                Next
              </Button>
            </Form>
          </div>
        )}
        {step === 2 && (
          <div>
            {paymentMethod === 'paypal' && (
              <Paypal subscriptionType={subscriptionType} />
            )}
            {paymentMethod === 'stripe' && (
              <Stripe subscriptionType={subscriptionType} toggle={toggle} />
            )}
            <Button
              color="secondary"
              onClick={() => setStep(1)}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg  transition-all"
            >
              Back
            </Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  subscriptionType: PropTypes.string,
};

export default PaymentModal;
