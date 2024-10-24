import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  $position: { x: number; y: number };
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenuContextType {
  openId: number;
  close: () => void;
  position: { x: number; y: number };
  setOpenId: (id: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
}

const MenuContext = createContext<MenuContextType>({
  openId: 0,
  close: () => {},
  position: { x: 0, y: 0 },
  setOpenId: () => {},
  setPosition: () => {},
});

interface MenusProps {
  children: React.ReactNode;
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId(0);
  return (
    <MenuContext.Provider
      value={{ openId, close, setOpenId, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

interface ToggleProps {
  id: number;
}

function Toggle({ id }: ToggleProps) {
  const { openId, close, setOpenId, setPosition } = useContext(MenuContext);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    console.log("click");

    const button = event.target as HTMLElement;
    const rect = button.closest("button")!.getBoundingClientRect();
    // console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === 0 || openId !== id ? setOpenId(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

interface ListProps {
  id: number;
  children: React.ReactNode;
}

function List({ id, children }: ListProps) {
  const { openId, position, close } = useContext(MenuContext);
  /* useOutsideClick()的第二個參數為listenCapturing，將其設定為false
     並在handleClick()使用event.stopPropagation()，才能避免Toggle時出現無法開啟的BUG */
  const ref: any = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

interface ButtonProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
