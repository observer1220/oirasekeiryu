import styled from "styled-components";
import LanguageSwitch from "../ui/LanguageSwitch";
import Logo from "../ui/Logo";
import ToggleDrawer from "../ui/ToggleDrawer";
import Footer from "../ui/Footer";
import HotelDescription from "../ui/HotelDescription";
import SightseeingSpots from "../ui/SightseeingSpots";

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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

function Home() {
  return (
    <HomeContainer>
      <Menu>
        <ToggleDrawer />
        <Logo height="4rem" />
        <LanguageSwitch />
      </Menu>
      <MainContainer>
        {/* 飯店描述 */}
        <HotelDescription />
        {/* 景點介紹 */}
        <SightseeingSpots />
        {/* 客房介紹 */}
        {/* 交通指南 */}
      </MainContainer>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
