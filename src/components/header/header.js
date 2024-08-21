import { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { NavItem, NavLink, Nav, Navbar, Spinner } from 'reactstrap';
import Link from 'next/link';
import SignInModal from '@/components/sign-in/signin-modal';
import nerdylogo from '../../../public/logo/nerdylogo.png';
import Image from 'next/image';
import RegistrationModal from '@/components/registration/registration-modal';
import Profile from '../profile/profile';

const Header = () => {
  const { data: session, status } = useSession();
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const toggleSignInModal = useCallback(() => {
    setSignInModalOpen((prev) => !prev);
  }, []);

  const toggleRegisterModal = useCallback(() => {
    setRegisterModalOpen((prev) => !prev);
  }, []);

  const handleAuthClick = () => {
    if (session) {
      signOut({ callbackUrl: '/' });
    } else {
      toggleSignInModal();
    }
  };

  const handleRegisterClick = () => {
    toggleRegisterModal();
  };

  if (status === 'loading') {
    return (
      <Spinner color="primary" type="grow">
        Loading...
      </Spinner>
    );
  }

  return (
    <>
      <Navbar className="flex flex-end">
        <Link href="/" passHref>
          <Image src={nerdylogo} alt="logo" width={300} height={250} />
        </Link>
        <Nav pills className="py-4 flex items-center">
          {!session && status !== 'authenticated' && (
            <NavItem>
              <NavLink href="#" onClick={handleAuthClick}>
                Sign In
              </NavLink>
            </NavItem>
          )}
          {!session && (
            <NavItem>
              <NavLink href="#" onClick={handleRegisterClick}>
                Register
              </NavLink>
            </NavItem>
          )}
          {session && status === 'authenticated' && (
            <>
              <NavItem>
                <NavLink href="/portfolio">Portfolio</NavLink>
              </NavItem>
              <Profile session={session} status={status} />
            </>
          )}
        </Nav>
      </Navbar>
      <SignInModal
        isOpen={isSignInModalOpen}
        toggle={toggleSignInModal}
        openRegisterModal={toggleRegisterModal}
      />
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        toggle={toggleRegisterModal}
        openLoginModal={toggleSignInModal}
      />
    </>
  );
};

export default Header;
