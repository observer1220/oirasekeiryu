import { styled } from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import Logout from "../features/authentication/Logout";
import { ButtonIcon } from "./common";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./function/DarkModeToggle";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
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
function Header() {
  const navigete = useNavigate();
  const MenuToggle = () => {
    console.log("HELLO");
  };

  return (
    <StyledHeader>
      {/* 左側菜單縮排按鈕 */}
      <button onClick={MenuToggle}>開關</button>
      <RightSide>
        <UserAvatar />
        <StyledHeaderMenu>
          <li>
            <ButtonIcon>
              <HiOutlineUser onClick={() => navigete("/admin/account")} />
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
  );
}

export default Header;
