import styled from "styled-components";
import LanguageSwitch from "../ui/LanguageSwitch";
import Logo from "../ui/Logo";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background-color: #f0f0f0;
`;

const HamburguerMenu = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
`;

function Home() {
  return (
    // Layout
    // Menu: Home, Guest Reservation, LanguageSwitch
    // Footer
    // Animation
    <HomeContainer>
      <Menu>
        <HamburguerMenu>Menu</HamburguerMenu>
        <Logo height="4rem" />
        <LanguageSwitch />
      </Menu>
    </HomeContainer>
  );
}

export default Home;
