import { MouseEvent, RefObject, useState } from "react";
import styled from "styled-components";
import { StyledNavLink } from "../common";
import menuIcon from "../../assets/menuIcon.png";
import { useTranslation } from "react-i18next";

const HamburguerMenu = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
`;

interface DrawerProps {
  open: boolean;
}

const Drawer = styled.ul<DrawerProps>`
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

interface ToggleDrawerProps {
  roomsRef: any;
  trafficRef: any;
}

function ToggleDrawer({ roomsRef, trafficRef }: ToggleDrawerProps) {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(Boolean);

  const scrollToAnchor = (
    event: MouseEvent<HTMLAnchorElement>,
    ref: RefObject<HTMLDivElement>
  ) => {
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
            <span>{t("homePage.room")}</span>
          </a>
        </li>
        <li>
          <a
            href="#traffic"
            onClick={(event) => scrollToAnchor(event, trafficRef)}
          >
            <span>{t("homePage.trafficGuide")}</span>
          </a>
        </li>
        <li>
          <StyledNavLink to="/admin/dashboard">
            <span>{t("homePage.admin")}</span>
          </StyledNavLink>
        </li>
      </Drawer>
    </>
  );
}

export default ToggleDrawer;
