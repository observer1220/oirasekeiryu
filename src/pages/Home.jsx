import styled from "styled-components";
import LanguageSwitch from "../ui/LanguageSwitch";
import Logo from "../ui/Logo";
import ToggleDrawer from "../ui/ToggleDrawer";
import Footer from "../ui/Footer";
import HotelDescription from "../ui/HomeSections/HotelDescription";
import SightseeingSpots from "../ui/HomeSections/SightseeingSpots";
import RoomSection from "../ui/HomeSections/RoomSection";
import { useRef } from "react";
import banner from "../assets/banner.avif"; 
import TrafficSection from "../ui/HomeSections/TrafficSection";

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
`;

function Home() {
  const roomsRef = useRef();
  const trafficRef = useRef();

  return (
    <HomeContainer>
      <Menu>
        <ToggleDrawer roomsRef={roomsRef} trafficRef={trafficRef} />
        <Logo height="4rem" />
        <LanguageSwitch />
      </Menu>
      <MainContainer>
        <img src={banner} alt="" />
        {/* 飯店描述 */}
        <HotelDescription />
        {/* 景點介紹 */}
        <SightseeingSpots />
        {/* 客房介紹 */}
        <RoomSection ref={roomsRef} />
        {/* 交通指南 */}
        <TrafficSection ref={trafficRef} />
      </MainContainer>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
