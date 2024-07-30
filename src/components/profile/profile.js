import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from 'reactstrap';
import Avatar from './avatar';

const Profile = ({ session, onSessionTimeout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();
      if (!currentSession) {
        onSessionTimeout();
      }
    };

    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [onSessionTimeout]);

  if (!session) {
    return (
      <Spinner color="light" type="grow">
        Loading...
      </Spinner>
    );
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle
        caret
        color="secondary"
        className="d-flex align-items-center"
      >
        <Avatar name={session.user.name} className="mr-2" />
      </DropdownToggle>
      <DropdownMenu className="text-md">
        <DropdownItem onClick={() => alert('Settings clicked')}>
          Account settings
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={onSessionTimeout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

Profile.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSessionTimeout: PropTypes.func.isRequired,
};

export default Profile;
