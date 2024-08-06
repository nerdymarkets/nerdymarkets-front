// pages/reset-password.js
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
  Container,
  Row,
  Col,
} from 'reactstrap';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      NotificationClient.error('Passwords do not match');
      return;
    }
    try {
      await resetPassword(token, newPassword);
      NotificationClient.success('Password reset successfully');
      router.push('/');
    } catch (error) {
      NotificationClient.error('Password reset failed');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <h1>Reset Password</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
