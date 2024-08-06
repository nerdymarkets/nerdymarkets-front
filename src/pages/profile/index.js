import ChangePassword from '@/components/profile/change-password';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
const Profile = () => {
  const { data: session, status } = useSession();
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);
  const togglePasswordChangeModal = () => {
    setPasswordChangeModalOpen(!passwordChangeModalOpen);
  };

  if (status === 'loading') {
    return (
      <Spinner color="primary" type="grow">
        Loading...
      </Spinner>
    );
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <h2>Profile</h2>
          <Form>
            <FormGroup>
              <Label for="firstname">First Name</Label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={session.user.firstname}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last Name</Label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                value={session.user.lastname}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={session.user.email}
                readOnly
              />
            </FormGroup>

            <Button color="primary" onClick={togglePasswordChangeModal}>
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
      <ChangePassword
        isOpen={passwordChangeModalOpen}
        toggle={togglePasswordChangeModal}
      />
    </Container>
  );
};

export default Profile;
