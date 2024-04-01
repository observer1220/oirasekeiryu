import { useState } from "react";
import styled from "styled-components";
import StyledNavLink from "./StyledNavLink";

const HamburguerMenu = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
`;

const Drawer = styled.ul`
  background: #333;
  color: #fff;
  position: fixed;
  top: 67px;
  left: 0;
  width: 300px;
  height: 100%;
  z-index: 1;

  /* add ease-in animation */
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  li {
    padding: 1rem;
    border-bottom: 1px solid #fff;
    cursor: pointer;
  }
`;

function ToggleDrawer() {
  const [isOpen, setOpen] = useState();

  return (
    <>
      <HamburguerMenu onClick={() => setOpen(!isOpen)}>Menu</HamburguerMenu>
      <Drawer open={isOpen}>
        <li>
          <StyledNavLink to="/admin/dashboard">
            <span>客房介紹</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/dashboard">
            <span>周邊景點</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/dashboard">
            <span>會員註冊</span>
          </StyledNavLink>
        </li>
      </Drawer>
    </>
  );
}

export default ToggleDrawer;
