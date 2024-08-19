import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCsrfToken } from 'next-auth/react';
import { register } from '../../pages/api/auth';
import VerificationForm from './email-verification';
import { NotificationClient } from '@/components/shared/notifications/stream';
import PasswordValidation from '@/components/shared/password-validation';

const RegisterForm = ({ isOpen, toggle, openLoginModal }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const onOpenLoginModal = () => {
    toggle();
    openLoginModal();
  };

  const toggleVerificationModal = () => {
    setVerificationModalOpen(!isVerificationModalOpen);
  };

  const passwordValidation = [
    {
      message: 'Password must be at least 8 characters long',
      isValid: password.length >= 8,
    },
    {
      message: 'Password must contain at least one uppercase letter',
      isValid: /[A-Z]/.test(password),
    },
    {
      message:
        'Password must contain at least one symbol (e.g., !, @, #, etc.)',
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const allValidationsPassed = passwordValidation.every((v) => v.isValid);
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    if (!allValidationsPassed || !passwordsMatch) {
      setError('Please ensure all requirements are met and passwords match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await register(firstname, lastname, email, password);
      setIsLoading(false);
      if (response.status === 201) {
        toggle();
        toggleVerificationModal();
        NotificationClient.success(
          'Registration successful. Please check your email for verification.'
        );
      } else if (response.status === 409) {
        NotificationClient.error('User already exists. Please try logging in.');
      } else {
        NotificationClient.error('Registration failed. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      NotificationClient.error(
        'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalHeader
          toggle={toggle}
          className="bg-primary text-white rounded-t-md"
        >
          Register
        </ModalHeader>
        <ModalBody className="bg-gray-50 rounded-b-md px-6 py-4">
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Input name="csrfToken" type="hidden" value={csrfToken} />
            <FormGroup>
              <Label
                for="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </Label>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </Label>
              <Input
                id="lastname"
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {emailError && (
                <div className="text-danger mt-2">{emailError}</div>
              )}
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
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {!allValidationsPassed && (
                <PasswordValidation validations={passwordValidation} />
              )}
            </FormGroup>
            <FormGroup>
              <Label
                for="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {!passwordsMatch && confirmPassword && (
                <div className="text-danger mt-2 text-sm">
                  Passwords do not match.
                </div>
              )}
            </FormGroup>
            {error && <div className="text-danger mt-2 text-sm">{error}</div>}
            <Button
              type="submit"
              color="primary"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : 'Register'}
            </Button>
            <Button
              color="link"
              onClick={onOpenLoginModal}
              className="text-blue-600 hover:text-blue-800 w-full mt-3 text-center"
            >
              Already have an account? Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <VerificationForm
        isOpen={isVerificationModalOpen}
        toggle={toggleVerificationModal}
        email={email}
        openLoginModal={openLoginModal}
      />
    </>
  );
};

RegisterForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

export default RegisterForm;
