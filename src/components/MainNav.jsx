import styled from "styled-components";
import {
  HiHome,
  HiCalendarDays,
  HiUsers,
  HiHomeModern,
  HiMiniCog6Tooth,
} from "react-icons/hi2";
import { StyledNavLink } from "./common";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function MainNav() {
  return (
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
  );
}

export default MainNav;
