import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { changePassword } from '@/pages/api/auth';
import { useSession } from 'next-auth/react';
import { NotificationClient } from '@/components/shared/notifications/stream';
import PasswordValidation from '@/components/shared/password-validation';

const ChangePassword = ({ isOpen, toggle }) => {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState('');
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

  const handlePasswordChange = async () => {
    if (!session) {
      return;
    }
    if (!allValidationsPassed || !passwordsMatch) {
      setError('Please ensure your passwords match and meet all requirements.');
      return;
    }
    try {
      await changePassword(session.accessToken, currentPassword, newPassword);
      NotificationClient.success('Password successfully changed');
      toggle();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      NotificationClient.error('Password change failed');
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    toggle();
  };
  return (
    <Modal isOpen={isOpen} toggle={handleCancel} centered>
      <ModalHeader toggle={handleCancel}>Change Password</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label
              for="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </Label>
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </FormGroup>
          <FormGroup>
            <Label
              for="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              invalid={!!error}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {!allValidationsPassed && (
              <PasswordValidation validations={passwordValidation} />
            )}
            {error && <div className="text-danger text-sm mt-2">{error}</div>}
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
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {!passwordsMatch && confirmPassword && (
              <div className="text-danger mt-2 text-sm">
                Passwords do not match.
              </div>
            )}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={handlePasswordChange}
          disabled={!allValidationsPassed || !passwordsMatch}
        >
          Change Password
        </Button>{' '}
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ChangePassword.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ChangePassword;
