import { useRef } from "react";
import styled from "styled-components";
import { Logo } from "../components/common";
import { LanguageSwitch, ToggleDrawer } from "../components/function";
import {
  HotelDescription,
  SightseeingSpots,
  RoomSection,
  TrafficSection,
} from "../components/HomeSections";
import { Footer } from "../components/Layout";
import banner from "../assets/banner.avif";

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
