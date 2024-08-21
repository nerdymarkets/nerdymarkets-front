import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Button,
  Alert,
  InputGroup,
  Input,
} from 'reactstrap';
import { verify } from '../../pages/api/auth';
import { toast } from 'react-toastify';
const VerificationForm = ({ isOpen, toggle, email, openLoginModal }) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== '' && index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (/^\d{5}$/.test(pasteData)) {
      const newCode = pasteData.split('');
      setCode(newCode);
      document.getElementById(`code-input-4`).focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const verificationCode = code.join('');
    try {
      const response = await verify(email, verificationCode);
      if (response.status === 201) {
        toast.success('Verification successful! You can now log in.');
        openLoginModal();
        toggle();
      } else if (response.status === 400) {
        toast.error(
          'Verification failed. The verification code is incorrect. Please try again.'
        );
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true}>
      <ModalBody>
        <ModalHeader
          toggle={toggle}
          className="bg-coolGray text-white rounded-t-3xl font-bold text-lg"
        >
          Verify Email
        </ModalHeader>
        <ModalBody className="bg-gray-50 rounded-b-3xl px-6 py-4">
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <InputGroup
              className="d-flex justify-content-center py-4 "
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                  className="text-center mx-1"
                  style={{ width: '3rem', fontSize: '1.5rem' }}
                />
              ))}
            </InputGroup>

            <Button
              type="submit"
              className="w-full py-2 rounded-3xl bg-customPink border-none shadow-lg"
            >
              Verify
            </Button>
          </Form>
        </ModalBody>
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
