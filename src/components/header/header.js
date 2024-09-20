import { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { NavItem, NavLink, Nav, Navbar, Spinner } from 'reactstrap';
import Link from 'next/link';
import SignInModal from '@/components/sign-in/signin-modal';
import nerdylogo from '../../../public/logo/nerdylogo.png';
import Image from 'next/image';
import RegistrationModal from '@/components/registration/registration-modal';
import Profile from '../profile/profile';
import BurgerMenu from '../burger-menu/burger-menu';
import useWindowDimensions from '@/hooks/useWindowDimension';
const Header = () => {
  const { data: session, status } = useSession();
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const toggleSignInModal = useCallback(() => {
    setSignInModalOpen((prev) => !prev);
  }, []);
  const { width } = useWindowDimensions();
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
    return <Spinner className="text-customPink" />;
  }

  return (
    <>
      <Navbar className="flex justify-between items-center p-4">
        <Link href="/" passHref>
          <Image src={nerdylogo} alt="logo" width={150} height={100} />
        </Link>
        {width < 678 ? (
          <div>
            <BurgerMenu />
            <div className="mr-6">
              <Profile session={session} status={status} />
            </div>
          </div>
        ) : (
          <Nav pills className="py-4 flex items-center">
            {!session && status !== 'authenticated' && (
              <NavItem>
                <NavLink
                  href="#"
                  onClick={handleAuthClick}
                  className="text-customPink hover:text-customPinkSecondary"
                >
                  Sign In
                </NavLink>
              </NavItem>
            )}
            {!session && (
              <NavItem>
                <NavLink
                  href="#"
                  onClick={handleRegisterClick}
                  className="text-customPink hover:text-customPinkSecondary"
                >
                  Register
                </NavLink>
              </NavItem>
            )}
            {session && status === 'authenticated' && (
              <>
                <NavItem>
                  <NavLink
                    href="/portfolio"
                    className="text-customPink hover:text-customPinkSecondary"
                  >
                    Portfolio
                  </NavLink>
                </NavItem>
                {session.user.roles.includes('admin') && (
                  <NavItem>
                    <NavLink
                      href="/admin"
                      className="text-customPink hover:text-customPinkSecondary"
                    >
                      Dashboard
                    </NavLink>
                  </NavItem>
                )}
                <Profile session={session} status={status} />
              </>
            )}
          </Nav>
        )}
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
