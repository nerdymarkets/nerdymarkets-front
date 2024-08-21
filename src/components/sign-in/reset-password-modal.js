import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { sendPasswordResetLink } from '@/pages/api/auth';
import { toast } from 'react-toastify';
import ResetPasswordForm from './reset-password-form';

const ResetPasswordModal = ({ isOpen, toggle }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetLink(email);
      toast.success('Password reset link sent to your email.');
      setIsLoading(false);
      toggle();
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true}>
      <ModalHeader
        toggle={toggle}
        className="bg-coolGray text-white rounded-t-3xl font-bold text-lg"
      >
        Reset Password
      </ModalHeader>
      <ModalBody className="bg-gray-100 px-6 py-4 rounded-b-3xl">
        <ResetPasswordForm
          email={email}
          setEmail={setEmail}
          isEmailValid={isEmailValid}
          isLoading={isLoading}
          handlePasswordReset={handlePasswordReset}
        />
      </ModalBody>
    </Modal>
  );
};

ResetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
