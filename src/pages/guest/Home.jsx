import styled from "styled-components";
import { useRef } from "react";
import { Logo, Button, GuestInfo } from "../../components/common";
import { ToggleDrawer } from "../../components/function";
import {
  HotelDescription,
  SightseeingSpots,
  RoomSection,
  TrafficSection,
} from "../../components/HomeSections";
import { Footer } from "../../components/Layout";
import banner from "../../assets/banner.avif";
import { useNavigate } from "react-router-dom";
// import { useLocalStorageState } from "../../hooks/useGeneral";

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
  const navigate = useNavigate();
  const user = localStorage.getItem("guest");

  return (
    <HomeContainer>
      <Menu>
        <ToggleDrawer roomsRef={roomsRef} trafficRef={trafficRef} />
        <Logo height="4rem" />
        {/* <LanguageSwitch /> */}
        {user ? (
          <GuestInfo />
        ) : (
          <Button onClick={() => navigate("/guestLogin")}>註冊/登入</Button>
        )}
      </Menu>
      <MainContainer>
        <img src={banner} alt="" />
        <HotelDescription />
        <SightseeingSpots />
        <RoomSection ref={roomsRef} />
        <TrafficSection ref={trafficRef} />
      </MainContainer>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
