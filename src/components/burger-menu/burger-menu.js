import { slide as Menu } from 'react-burger-menu';
import { useSession } from 'next-auth/react';
import { NavItem, NavLink } from 'reactstrap';
const BurgerMenu = () => {
  const { data: session, status } = useSession();

  return (
    <Menu right>
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
        </>
      )}
    </Menu>
  );
};

export default BurgerMenu;
