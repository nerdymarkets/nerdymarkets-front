import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NotificationClient } from '@/components/shared/notifications/stream';
import { sendPasswordResetLink } from '@/pages/api/auth';

const SignInForm = ({ isOpen, toggle, openRegisterModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      NotificationClient.error('Username or password is not correct');
    } else {
      NotificationClient.success('Login successful.');
      toggle();
      router.push('/');
    }
  };

  const onRegisterClick = () => {
    toggle();
    openRegisterModal();
  };
  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetLink(email);
      NotificationClient.success('Password reset link sent to your email.');
    } catch (error) {
      NotificationClient.error(error.message);
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader
        toggle={toggle}
        className="bg-primary text-white rounded-t-md"
      >
        Sign In
      </ModalHeader>
      <ModalBody className="bg-gray-50 rounded-b-3xl px-6 py-4">
        <Form onSubmit={handleSubmit} className="space-y-4">
          <Input name="csrfToken" type="hidden" value={csrfToken} />
          <FormGroup>
            <Label
              for="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </FormGroup>
          <FormGroup>
            <Label
              for="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </FormGroup>
          <Button
            type="submit"
            color="primary"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
          >
            Sign in
          </Button>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Button
              onClick={onRegisterClick}
              color="link"
              className="text-blue-600 hover:text-blue-800"
            >
              Register
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Forgot your password?{' '}
            <Button
              onClick={handlePasswordReset}
              color="link"
              className="text-blue-600 hover:text-blue-800"
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

SignInForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  openRegisterModal: PropTypes.func.isRequired,
};

export default SignInForm;
