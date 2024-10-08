import { useState } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '@/pages/api/auth';
import { toast } from 'react-toastify';
import {
  Form,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PasswordValidation from '@/components/shared/password-validation';
import PasswordInput from '@/components/shared/password-input';

const ResetPassword = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(true);
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const passwordValidation = [
    {
      message: 'Password must be at least 8 characters long',
      isValid: newPassword.length >= 8,
    },
    {
      message: 'Password must contain at least one uppercase letter',
      isValid: /[A-Z]/.test(newPassword),
    },
    {
      message:
        'Password must contain at least one symbol (e.g., !, @, #, etc.)',
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];

  const allValidationsPassed = passwordValidation.every((v) => v.isValid);
  const passwordsMatch = newPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allValidationsPassed || !passwordsMatch) {
      setError('Please ensure your passwords match and meet all requirements.');
      return;
    }
    try {
      await resetPassword(token, newPassword);
      toast.success('Password reset successfully');
      toggleModal();
      router.push('/');
    } catch (error) {
      toast.error('Password reset failed');
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    router.push('/');
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered={true}>
      <ModalHeader
        toggle={toggleModal}
        className="bg-coolGray  text-white rounded-t-3xl font-bold text-lg"
      >
        Reset Password
      </ModalHeader>
      <ModalBody className="bg-gray-100 px-6 py-4 ">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <PasswordInput
              label="New Password"
              placeholder="New Password"
              labelClassName="block text-sm font-medium text-gray-700"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  sm:text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <PasswordValidation validations={passwordValidation} />
          </FormGroup>
          <FormGroup>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Password"
              labelClassName="block text-sm font-medium text-gray-700"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400  sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {!passwordsMatch && confirmPassword && (
              <div className="text-danger mt-2 text-sm">
                Passwords do not match.
              </div>
            )}
          </FormGroup>
          {error && <div className="text-danger text-sm mt-2">{error}</div>}
        </Form>
      </ModalBody>
      <ModalFooter className="rounded-b-3xl bg-gray-100 px-6 py-4">
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={!allValidationsPassed || !passwordsMatch}
        >
          Reset Password
        </Button>{' '}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ResetPassword;
