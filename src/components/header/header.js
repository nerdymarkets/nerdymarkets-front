import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { NavItem, NavLink, Nav, Navbar } from 'reactstrap';
import Link from 'next/link';
import SignInForm from '@/components/signin-form/signin-form';
import nerdylogo from '../../../public/logo/nerdylogo.png';
import Image from 'next/image';
import RegisterForm from '@/components/register-form/register-form';
import Profile from '../profile/profile';

const Header = () => {
  const { data: session } = useSession();
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

  const handleSessionTimeout = useCallback(async () => {
    await signOut({ callbackUrl: '/' });
    toggleSignInModal();
  }, [toggleSignInModal]);

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();
      if (!currentSession) {
        handleSessionTimeout();
      }
    };

    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [handleSessionTimeout]);

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
          {session && (
            <Profile
              session={session}
              onSessionTimeout={handleSessionTimeout}
            />
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
        openSignInModal={toggleSignInModal}
      />
    </>
  );
};

export default Header;
