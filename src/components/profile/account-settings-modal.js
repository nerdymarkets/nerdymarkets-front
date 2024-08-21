import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { faCcPaypal, faCcStripe } from '@fortawesome/free-brands-svg-icons';
import ChangePassword from './change-password';

const AccountSettingsModal = ({ isOpen, toggle, user }) => {
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);

  const togglePasswordChangeModal = () => {
    setPasswordChangeModalOpen(!passwordChangeModalOpen);
    if (passwordChangeModalOpen) {
      toggle();
    }
  };

  const handlePasswordChangeClick = () => {
    toggle();
    togglePasswordChangeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered={true}>
        <ModalHeader
          toggle={toggle}
          className="bg-coolGray text-white rounded-t-3xl font-bold text-lg"
        >
          Account Settings
        </ModalHeader>
        <ModalBody className="bg-lightGray">
          <ListGroup flush>
            <ListGroupItem>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <strong>Email: </strong>
                  <p>{user.email}</p>
                </div>
                <FontAwesomeIcon
                  icon={user.isVerified ? faCheckCircle : faExclamationCircle}
                  className={`ml-2 w-10  ${user.isVerified ? 'text-success' : 'text-danger'}`}
                />
              </div>
              {user.isVerified ? (
                <Badge color="success" pill className="ml-2">
                  Verified
                </Badge>
              ) : (
                <Badge color="danger" pill className="ml-2">
                  Unverified
                </Badge>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <strong>First Name: </strong> {user.firstname}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Last Name: </strong> {user.lastname}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Subscriptions: </strong>

              {user.paypalsubscriptions.length +
                user.stripeSubscriptions.length >
              0 ? (
                <Badge color="info" pill className="ml-2">
                  Active
                </Badge>
              ) : (
                <Badge color="secondary" pill className="ml-2">
                  Inactive
                </Badge>
              )}
            </ListGroupItem>
            <ListGroupItem className="flex items-center">
              <strong>Payment: </strong>
              {user.paypalsubscriptions.length > 0 ? (
                <FontAwesomeIcon
                  icon={faCcPaypal}
                  className="ml-2 text-primary w-8"
                />
              ) : user.stripeSubscriptions.length > 0 ? (
                <FontAwesomeIcon
                  icon={faCcStripe}
                  className="ml-2 text-primary w-8"
                />
              ) : (
                <Badge color="warning">No active payment method</Badge>
              )}
            </ListGroupItem>
            <ListGroupItem className="flex flex-col">
              <Button
                color="primary"
                onClick={handlePasswordChangeClick}
                className="py-2 px-4 flex flex-col items-center  font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-transform transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faKey} className="mr-2 w-10" />
                Change Password
              </Button>
              <p className="mt-2 text-sm text-gray-500">
                Keep your account secure by updating your password regularly.
              </p>
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
        <ModalFooter className="bg-lightGray rounded-b-3xl">
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <ChangePassword
        isOpen={passwordChangeModalOpen}
        toggle={togglePasswordChangeModal}
      />
    </>
  );
};

AccountSettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired,
    paypalsubscriptions: PropTypes.array.isRequired,
    stripeSubscriptions: PropTypes.array.isRequired,
  }).isRequired,
};

export default AccountSettingsModal;
