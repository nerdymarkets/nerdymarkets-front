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
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from './change-password';

import UserInfo from './user-info';
import SubscriptionInfo from './subscription-info';
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
          <ListGroup flush className=" rounded-3xl">
            <UserInfo
              firstName={user.firstname}
              lastName={user.lastname}
              email={user.email}
              isVerified={user.isVerified}
            />
            <SubscriptionInfo />
            <ListGroupItem className="flex flex-col">
              <Button
                onClick={handlePasswordChangeClick}
                className="py-2 px-4 flex flex-col items-center border-none  font-semibold text-white rounded-lg shadow-md  transition-transform transform hover:scale-105 bg-customPink hover:bg-customPinkSecondary"
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
