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

const SignInForm = ({ isOpen, toggle, openRegisterModal }) => {
  const [username, setUsername] = useState('');
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
      username,
      password,
      redirect: false,
    });

    if (result.error) {
      // You can replace this with a proper error display
    } else {
      toggle();
      router.push('/');
    }
  };

  const onRegisterClick = () => {
    toggle();
    openRegisterModal();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="text-white" fade centered>
      <ModalBody className="bg-darkGray">
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
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
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Sign in
          </Button>
          <p className="mt-3">
            Don&apos;t have an account?{' '}
            <Button onClick={onRegisterClick}>Register</Button>
          </p>
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
