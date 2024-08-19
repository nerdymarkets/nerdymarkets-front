import { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { NavItem, NavLink, Nav, Navbar, Spinner } from 'reactstrap';
import Link from 'next/link';
import SignInForm from '@/components/signin-form/signin-form';
import nerdylogo from '../../../public/logo/nerdylogo.png';
import Image from 'next/image';
import RegisterForm from '@/components/register-form/register-form';
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
          <NavItem>
            <NavLink href="#" onClick={handleAuthClick}>
              {!session && 'Sign In'}
            </NavLink>
          </NavItem>
          {!session && (
            <NavItem>
              <NavLink href="#" onClick={handleRegisterClick}>
                Register
              </NavLink>
            </NavItem>
          )}
          {session && status === 'authenticated' && (
            <Profile session={session} status={status} />
          )}
        </Nav>
      </Navbar>
      <SignInForm
        isOpen={isSignInModalOpen}
        toggle={toggleSignInModal}
        openRegisterModal={toggleRegisterModal}
      />
      <RegisterForm
        isOpen={isRegisterModalOpen}
        toggle={toggleRegisterModal}
        openLoginModal={toggleSignInModal}
      />
    </>
  );
};

export default Header;
