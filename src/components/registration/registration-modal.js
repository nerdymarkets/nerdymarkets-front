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
import { toast } from 'react-toastify';
import PasswordValidation from '@/components/shared/password-validation';
import PasswordInput from '../shared/password-input';

const RegisterModal = ({ isOpen, toggle, openLoginModal }) => {
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
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await register(firstname, lastname, email, password);
      setIsLoading(false);
      if (response.status === 201) {
        toggle();
        toggleVerificationModal();
        toast.success(
          'Registration successful. Please check your email for verification.'
        );
      } else if (response.status === 409) {
        toast.error('User already exists. Please try logging in.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered={true}>
        <ModalHeader
          toggle={toggle}
          className="bg-coolGray text-white rounded-t-3xl font-bold text-lg"
        >
          Register
        </ModalHeader>
        <ModalBody className="bg-gray-100 px-6 py-4 rounded-b-3xl">
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Input name="csrfToken" type="hidden" value={csrfToken} />
            <FormGroup>
              <Label
                for="firstname"
                className="block text-lg font-medium text-gray-500"
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
                className="text-lg border-2 border-gray-300 rounded-md shadow-lg font-semibold"
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="lastname"
                className="block text-lg font-medium text-gray-500"
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
                className="text-lg border-2 border-gray-300 rounded-md shadow-lg font-semibold"
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="email"
                className="block text-lg font-medium text-gray-500"
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
                className="text-lg border-2 border-gray-300 rounded-md shadow-lg font-semibold"
              />
              {emailError && (
                <div className="text-danger mt-2">{emailError}</div>
              )}
            </FormGroup>
            <FormGroup>
              <PasswordInput
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                labelClassName="block text-lg font-medium text-gray-500"
                className="text-lg border-2 border-gray-300 rounded-md shadow-lg font-semibold pr-10 "
              />

              {!allValidationsPassed && (
                <PasswordValidation validations={passwordValidation} />
              )}
            </FormGroup>
            <FormGroup>
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                labelClassName="block text-lg font-medium text-gray-500"
                className="text-lg border-2 border-gray-300 rounded-md shadow-lg font-semibold pr-10 "
              />
            </FormGroup>
            {error && <div className="text-danger mt-2 text-sm">{error}</div>}
            <Button
              type="submit"
              className="w-full rounded-3xl bg-customPink border-none shadow-lg  py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner size="sm" className="text-customPink" />
              ) : (
                'Register'
              )}
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

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

export default RegisterModal;
