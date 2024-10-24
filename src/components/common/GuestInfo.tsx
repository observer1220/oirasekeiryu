import styled from "styled-components";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const GuestInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Welcome = styled.span`
  font-size: 14px;
`;

function GuestInfo() {
  const user = JSON.parse(localStorage.getItem("guest")!);
  const { t } = useTranslation();
  const logoutBtn = () => {
    localStorage.removeItem("guest");
    window.location.reload();
  };

  return (
    <GuestInfoContainer>
      <Welcome>
        <span>{t("homePage.welcome")}</span>
        <br />
        <span>{user.fullName}</span>
      </Welcome>
      <Button onClick={logoutBtn}>{t("homePage.logout")}</Button>
    </GuestInfoContainer>
  );
}

export default GuestInfo;
