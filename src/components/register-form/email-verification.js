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
import { verify } from '../../pages/api/auth';

const VerificationForm = ({ isOpen, toggle, email, openLoginModal }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await verify(email, code);
      if (response.status === 201) {
        openLoginModal();
        toggle();
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody>
        <ModalHeader toggle={toggle}>Verify Email</ModalHeader>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="code">Verification Code</Label>
            <Input
              id="code"
              name="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Verify
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

VerificationForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

export default VerificationForm;
