import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { getCsrfToken } from 'next-auth/react';
import { register } from '../../pages/api/auth';

const RegisterForm = ({ isOpen, toggle, csrfToken, openSignInModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await register(username, password);
      if (response.status === 201) {
        toggle();
        openSignInModal();
      } else if (response.status === 409) {
        setError('User already exists. Please try logging in.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Input name="csrfToken" type="hidden" value={csrfToken} />
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Button type="submit" color="primary">
            Register
          </Button>
          <Button color="link" onClick={toggle}>
            Already have an account? Login
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

RegisterForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  csrfToken: PropTypes.string.isRequired,
  openSignInModal: PropTypes.func.isRequired,
};

RegisterForm.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};

export default RegisterForm;
