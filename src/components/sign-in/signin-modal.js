import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import ResetPasswordModal from './reset-password-modal';
import SigninForm from './signin-form';
const SignInModal = ({ isOpen, toggle, openRegisterModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const toggleCancel = () => {
    toggle();
    setEmail('');
    setPassword('');
  };

  const onRegisterClick = () => {
    toggle();
    openRegisterModal();
  };

  const toggleResetModal = useCallback(() => {
    setIsResetModalOpen((prev) => !prev);
    toggle();
  }, [toggle]);

  const handleFormSubmit = () => {
    toggleCancel();
    router.push('/');
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleCancel} centered={true}>
        <ModalHeader
          toggle={toggleCancel}
          className="bg-coolGray text-white rounded-t-3xl font-bold text-lg"
        >
          Sign In
        </ModalHeader>
        <ModalBody className="bg-gray-100 px-6 py-4 rounded-b-3xl">
          <SigninForm
            csrfToken={csrfToken}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleFormSubmit}
          />
          <div className="mt-4 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Button
              onClick={onRegisterClick}
              color="link"
              className="text-blue-500 hover:text-blue-700"
            >
              Register
            </Button>
          </div>
          <div className=" text-center text-sm text-gray-500">
            Forgot your password?{' '}
            <Button
              onClick={toggleResetModal}
              color="link"
              className="text-blue-500 hover:text-blue-700"
            >
              Reset Password
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <ResetPasswordModal toggle={toggleResetModal} isOpen={isResetModalOpen} />
    </>
  );
};

SignInModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  openRegisterModal: PropTypes.func.isRequired,
};

export default SignInModal;
