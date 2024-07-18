import { useState } from "react";
import styled from "styled-components";
import StyledNavLink from "../common/StyledNavLink";
import menuIcon from "../../assets/menuIcon.png";
import PropTypes from "prop-types";

ToggleDrawer.propTypes = {
  roomsRef: PropTypes.object,
  trafficRef: PropTypes.object,
};

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
    padding: 1.2rem 2.4rem;
    border-bottom: 1px solid #fff;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 30px;
`;

function ToggleDrawer({ roomsRef, trafficRef }) {
  const [isOpen, setOpen] = useState();

  const scrollToAnchor = (event, ref) => {
    event.preventDefault();
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <>
      <HamburguerMenu onClick={() => setOpen(!isOpen)}>
        <Icon src={menuIcon} alt="" />
      </HamburguerMenu>
      <Drawer open={isOpen}>
        <li>
          <a href="#rooms" onClick={(event) => scrollToAnchor(event, roomsRef)}>
            <span>客房介紹</span>
          </a>
        </li>
        <li>
          <a
            href="#traffic"
            onClick={(event) => scrollToAnchor(event, trafficRef)}
          >
            <span>交通指南</span>
          </a>
        </li>
        <li>
          <StyledNavLink to="/admin/dashboard">
            <span>後台管理</span>
          </StyledNavLink>
        </li>
      </Drawer>
    </>
  );
}

export default ToggleDrawer;
