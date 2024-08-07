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

const RegisterForm = ({ isOpen, toggle, openLoginModal }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        <ModalBody>
          <ModalHeader toggle={toggle}>Register</ModalHeader>
          <Form onSubmit={handleSubmit}>
            <Input name="csrfToken" type="hidden" value={csrfToken} />
            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Register'}
            </Button>
            <Button color="link" onClick={onOpenLoginModal}>
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
