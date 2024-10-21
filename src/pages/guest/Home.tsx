import styled from "styled-components";
import { useRef } from "react";
import { Logo, Button, GuestInfo } from "../../components/common";
import { LanguageSwitch, ToggleDrawer } from "../../components/function";
import {
  HotelDescription,
  SightseeingSpots,
  RoomSection,
  TrafficSection,
} from "../../components/HomeSections";
import { Footer } from "../../components/Layout";
import banner from "../../assets/banner.avif";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface userType {
  fullName: string;
}

function Home() {
  const roomsRef = useRef<HTMLDivElement>(null);
  const trafficRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user: userType = JSON.parse(localStorage.getItem("guest") || "{}");

  return (
    <HomeContainer>
      <Menu>
        <ToggleDrawer roomsRef={roomsRef} trafficRef={trafficRef} />
        <Logo height="4rem" />
        <LanguageSwitch />
        {user ? (
          <GuestInfo />
        ) : (
          <Button onClick={() => navigate("/guestLogin")}>
            {t("homePage.guestLogin")}
          </Button>
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
