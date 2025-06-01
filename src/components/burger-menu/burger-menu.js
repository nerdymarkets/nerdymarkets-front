import { slide as Menu } from 'react-burger-menu';
import { useSession } from 'next-auth/react';
import { NavItem, NavLink } from 'reactstrap';

const BurgerMenu = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = session && status === 'authenticated';
  const isAdmin = isAuthenticated && session.user.roles.includes('admin');

  return (
    <Menu right>
      <NavItem className="text-center">
        <NavLink
          href="/"
          className="text-customPink hover:text-customPinkSecondary"
        >
          Home
        </NavLink>
        <NavLink
          href="/research"
          className="text-customPink hover:text-customPinkSecondary"
        >
          Research
        </NavLink>

        {isAuthenticated && (
          <NavLink
            href="/portfolio"
            className="text-customPink hover:text-customPinkSecondary"
          >
            Portfolio
          </NavLink>
        )}
        {isAdmin && (
          <NavLink
            href="/admin"
            className="text-customPink hover:text-customPinkSecondary"
          >
            Dashboard
          </NavLink>
        )}
      </NavItem>
    </Menu>
  );
};

export default BurgerMenu;
