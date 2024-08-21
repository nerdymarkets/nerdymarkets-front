import { Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const ResetPasswordForm = ({
  email,
  setEmail,
  isEmailValid,
  isLoading,
  handlePasswordReset,
}) => {
  return (
    <Form onSubmit={handlePasswordReset} className="space-y-4">
      <FormGroup>
        <Label
          for="resetEmail"
          className="block text-lg font-medium text-gray-500"
        >
          Enter your email to reset your password
        </Label>
        <Input
          id="resetEmail"
          name="resetEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg border-2 border-gray-300 rounded-md shadow-lg"
          required
        />
      </FormGroup>
      <Button
        type="submit"
        className="w-full rounded-3xl bg-customPink border-none shadow-lg"
        disabled={!isEmailValid || isLoading}
      >
        {isLoading ? <Spinner size="sm" /> : 'Send Reset Link'}
      </Button>
    </Form>
  );
};

ResetPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  isEmailValid: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handlePasswordReset: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
