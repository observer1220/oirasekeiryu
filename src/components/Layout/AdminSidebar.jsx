import { styled } from "styled-components";
import { Logo, StyledNavLink } from "../common";
import {
  HiHome,
  HiCalendarDays,
  HiUsers,
  HiHomeModern,
  HiMiniCog6Tooth,
} from "react-icons/hi2";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo height="4.2rem" />
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/admin/dashboard">
              <HiHome />
              <span>Home</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/bookings">
              <HiCalendarDays />
              <span>Bookings</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/cabins">
              <HiHomeModern />
              <span>Cabins</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/users">
              <HiUsers />
              <span>Users</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/settings">
              <HiMiniCog6Tooth />
              <span>Settings</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </StyledSidebar>
  );
}

export default Sidebar;
