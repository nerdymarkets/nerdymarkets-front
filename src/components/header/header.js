import { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { NavItem, NavLink, Nav, Navbar, Container } from 'reactstrap';
import Link from 'next/link';
import SignInModal from '../../components/sign-in/signin-modal';
import logoBlack from '../../../public/logo/logo-black.png';
import Image from 'next/image';
import RegistrationModal from '../../components/registration/registration-modal';
import Profile from '../profile/profile';
import BurgerMenu from '../burger-menu/burger-menu';
import { useRouter } from 'next/router';
import useWindowDimensions from '../../hooks/useWindowDimension';

const Header = () => {
  const { data: session, status } = useSession();
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const router = useRouter();
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

  return (
    <Container>
      <Navbar className="flex justify-between items-center py-4 ">
        {width >= 678 && (
          <div className="flex gap-10 items-center">
            <Link
              href="/"
              className={`${
                router.pathname === '/' ? 'underline' : ''
              } hover:underline`}
            >
              Home
            </Link>
            <Link
              href="/research"
              className={`${
                router.pathname === '/research' ? 'underline' : ''
              } hover:underline`}
            >
              Research
            </Link>
          </div>
        )}

        <Link href="/" passHref>
          <Image src={logoBlack} alt="logo" width={110} height={80} />
        </Link>
        {width < 678 ? (
          <div>
            {!session && status !== 'authenticated' ? (
              <div className="flex items-center gap-x-4">
                <NavItem className="list-none">
                  <NavLink
                    href="#"
                    onClick={handleAuthClick}
                    className="text-customPink hover:text-customPinkSecondary"
                  >
                    Sign In
                  </NavLink>
                </NavItem>
                <BurgerMenu />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="mr-6">
                  <Profile session={session} status={status} />
                </div>
                <BurgerMenu />
              </div>
            )}
          </div>
        ) : (
          <Nav pills className=" flex items-center">
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
                <div className="absolute right-[-80px]">
                  <Profile session={session} status={status} />
                </div>
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
    </Container>
  );
};

export default Header;
