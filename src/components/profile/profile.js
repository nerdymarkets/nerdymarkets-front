import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from 'reactstrap';
import Avatar from './avatar';
import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import AccountSettingsModal from './account-settings-modal';

const Profile = ({ session, status }) => {
  const { user } = session;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountSettingsModalOpen, setAccountSettingsModalOpen] =
    useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleAccountSettingsModal = () =>
    setAccountSettingsModalOpen(!accountSettingsModalOpen);

  if (!status === 'authenticated') {
    return (
      <Spinner color="primary" type="grow">
        Loading...
      </Spinner>
    );
  }

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle
          caret
          color="secondary"
          className="d-flex align-items-center bg-gray-800 border-none"
        >
          <Avatar name={user.firstname} className="mr-2" />
        </DropdownToggle>
        <DropdownMenu className="text-md mt-1 rounded-2xl hover:rounded-2xl px-1 ">
          <DropdownItem
            onClick={toggleAccountSettingsModal}
            className="flex items-center font-light"
          >
            <FontAwesomeIcon icon={faCog} className="mr-2 w-6" />
            Account settings
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center font-light"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2  w-6" />
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <AccountSettingsModal
        isOpen={accountSettingsModalOpen}
        toggle={toggleAccountSettingsModal}
        user={user}
      />
    </>
  );
};

Profile.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string,
      email: PropTypes.string,
      isVerified: PropTypes.bool,
      paypalsubscriptions: PropTypes.array,
      stripeSubscriptions: PropTypes.array,
    }).isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
};

export default Profile;
