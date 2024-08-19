import { useState } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '@/pages/api/auth';
import { NotificationClient } from '@/components/shared/notifications/stream';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PasswordValidation from '@/components/shared/password-validation';

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
      NotificationClient.success('Password reset successfully');
      toggleModal();
      router.push('/');
    } catch (error) {
      NotificationClient.error('Password reset failed');
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal}>Reset Password</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label
              for="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <PasswordValidation validations={passwordValidation} />
          </FormGroup>
          <FormGroup>
            <Label
              for="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
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
      <ModalFooter>
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
