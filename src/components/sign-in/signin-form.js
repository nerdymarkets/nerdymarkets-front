import { Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useState } from 'react';
const SigninForm = ({
  csrfToken,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      toast.error('Username or password is not correct');
    } else {
      toast.success('Login successful.');
      onSubmit();
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <Input name="csrfToken" type="hidden" value={csrfToken} />
      <FormGroup>
        <Label for="email" className="block text-lg font-medium text-gray-500">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg border-2 border-gray-300 rounded-md shadow-lg font-medium"
        />
      </FormGroup>
      <FormGroup>
        <Label
          for="password"
          className="block text-lg font-medium text-gray-500"
        >
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg border-2 border-gray-300 rounded-md shadow-lg"
        />
      </FormGroup>
      <Button
        type="submit"
        className="w-full rounded-3xl bg-customPink border-none shadow-lg"
        disabled={loading}
      >
        {loading ? (
          <Spinner size="sm" className="text-customPink" />
        ) : (
          'Sign in'
        )}{' '}
      </Button>
    </Form>
  );
};

SigninForm.propTypes = {
  csrfToken: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default SigninForm;
