import styled from "styled-components";
import LanguageSwitch from "../ui/LanguageSwitch";
import Logo from "../ui/Logo";
import ToggleDrawer from "../ui/ToggleDrawer";
import Footer from "../ui/Footer";

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

function Home() {
  return (
    <HomeContainer>
      <Menu>
        <ToggleDrawer />
        <Logo height="4rem" />
        <LanguageSwitch />
      </Menu>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
