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
const ChangePassword = ({ isOpen, toggle }) => {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = async () => {
    if (!session) {
      return;
    }

    try {
      await changePassword(session.accessToken, currentPassword, newPassword);
      NotificationClient.success('Password succseesfulyy changed');
      toggle();
    } catch (err) {
      NotificationClient.error('Failed');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Change Password</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="currentPassword">Current Password</Label>
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handlePasswordChange}>
          Change Password
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
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
