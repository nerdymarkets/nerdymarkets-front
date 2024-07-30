import { useState } from 'react';
import {
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
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
    small: '200px',
    medium: '400px',
    large: '600px',
  };
  return (
    <Form onSubmit={handleSubmit} className="flex flex-col  text-white">
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
            bsSize="lg"
            id="Email"
            type="email"
            placeholder="Your email address"
            value={email}
            valid={emailValid}
            invalid={email.length > 0 && !emailValid}
            onChange={handleChange}
            className="mb-2 border-2  text-black "
            style={{ width: widthClass[inputWidth] }}
          />
          <FormFeedback valid>Valid email address.</FormFeedback>
          <FormFeedback>Invalid email address.</FormFeedback>
          <Button
            type="submit"
            color="info"
            disabled={!emailValid}
            size="lg"
            className={twMerge(roundedButton ? 'custom-rounded-button' : '')}
          >
            Join the waitlist!
          </Button>
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
