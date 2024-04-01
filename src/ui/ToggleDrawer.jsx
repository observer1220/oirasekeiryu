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
  display: ${({ open }) => (open ? "block" : "none")};
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 67px;
  left: 0;
  width: 300px;
  height: 100%;
  z-index: 1;

  li {
    padding: 1rem;
    border-bottom: 1px solid #fff;
    cursor: pointer;
  }
`;

function ToggleDrawer() {
  const [isOpen, setOpen] = useState();

  const toggleButton = () => {
    setOpen(!isOpen);
    console.log("HELLO", isOpen);
  };
  return (
    <>
      <HamburguerMenu onClick={toggleButton}>Menu</HamburguerMenu>
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
