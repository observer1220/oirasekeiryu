import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, Outlet } from "react-router-dom";
import Logout from "../../features/authentication/Logout";
import { ButtonIcon, UserAvatar, Logo, StyledNavLink } from "../common";
import {
  HiOutlineUser,
  HiHome,
  HiCalendarDays,
  HiUsers,
  HiHomeModern,
  HiMiniCog6Tooth,
} from "react-icons/hi2";
import DarkModeToggle from "../function/DarkModeToggle";
import menuIcon from "../../assets/menuIcon.png";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${({ isOpen }) => (isOpen ? "20rem" : "8.4rem")} 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  transition: grid-template-columns 0.3s ease-in-out;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-grey-0);
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const RightSide = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1.6rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Icon = styled.img`
  width: 30px;
`;

function AdminLayout() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const navItems = [
    { to: "/admin/dashboard", icon: <HiHome />, label: "Home" },
    { to: "/admin/bookings", icon: <HiCalendarDays />, label: "Bookings" },
    { to: "/admin/cabins", icon: <HiHomeModern />, label: "Cabins" },
    { to: "/admin/users", icon: <HiUsers />, label: "Users" },
    { to: "/admin/settings", icon: <HiMiniCog6Tooth />, label: "Settings" },
  ];

  return (
    <StyledAppLayout isOpen={isOpen}>
      <StyledHeader>
        <ButtonIcon onClick={() => setOpen(!isOpen)}>
          <Icon src={menuIcon} alt="" />
        </ButtonIcon>
        <RightSide>
          <UserAvatar />
          <StyledHeaderMenu>
            <li>
              <ButtonIcon>
                <HiOutlineUser onClick={() => navigate("/admin/account")} />
              </ButtonIcon>
            </li>
            <li>
              <DarkModeToggle />
            </li>
            <li>
              <Logout />
            </li>
          </StyledHeaderMenu>
        </RightSide>
      </StyledHeader>
      <StyledSidebar>
        <Logo height="4.2rem" />
        <NavList>
          {navItems.map((item, index) => (
            <li key={index}>
              <StyledNavLink to={item.to}>
                {item.icon}
                <span style={{ display: isOpen ? "block" : "none" }}>
                  {item.label}
                </span>
              </StyledNavLink>
            </li>
          ))}
        </NavList>
      </StyledSidebar>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AdminLayout;
