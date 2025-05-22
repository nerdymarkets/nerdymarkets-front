import { useState } from 'react';
import { Form, Row, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const SubscriptionForm = ({ labelTextColor, roundedButton, inputWidth }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setEmailValid(validateEmail(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const widthClass = {
    small: 'w-full md:w-48',
    medium: 'w-full md:w-72',
    large: 'w-full md:w-96',
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col font-rubik text-white  "
    >
      <Row>
        <FormGroup>
          <Label
            for="Email"
            className={twMerge('cursor-pointer ', labelTextColor)}
            size="lg"
          >
            Email address
          </Label>
          <Input
            name="email"
            bsSize="md"
            id="Email"
            type="email"
            placeholder="Your email address"
            value={email}
            valid={emailValid}
            invalid={email.length > 0 && !emailValid}
            onChange={handleChange}
            className="  w-[450px]  text-black "
            style={{ width: widthClass[inputWidth] }}
          />
          <FormFeedback valid>Valid email address.</FormFeedback>
          <FormFeedback>Invalid email address.</FormFeedback>
          <button
            type="submit"
            disabled={!emailValid}
            className={`mt-4 text-white text-base bg-customPink py-3 px-5  ${roundedButton ? 'rounded-full ' : ' '}`}
          >
            Join the waitlist!
          </button>
        </FormGroup>
      </Row>
    </Form>
  );
};
SubscriptionForm.propTypes = {
  labelTextColor: PropTypes.string,
  roundedButton: PropTypes.bool,
  inputWidth: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default SubscriptionForm;
