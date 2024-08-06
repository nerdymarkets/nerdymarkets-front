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
import { useRouter } from 'next/router';
const Profile = ({ session }) => {
  const { user } = session;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const router = useRouter();
  if (!session) {
    return (
      <Spinner color="light" type="grow">
        Loading...
      </Spinner>
    );
  }
  const navigateProfilepage = () => {
    router.push('/profile');
  };
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle
        caret
        color="secondary"
        className="d-flex align-items-center"
      >
        <Avatar name={user.firstname} className="mr-2" />
      </DropdownToggle>
      <DropdownMenu className="text-md">
        <DropdownItem onClick={navigateProfilepage}>
          Account settings
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => signOut({ callbackUrl: '/' })}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

Profile.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
