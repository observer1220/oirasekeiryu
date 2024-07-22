import styled from "styled-components";
import Button from "./Button";

const GuestInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--color-text-100);
  font-weight: bold;
  font-size: 1.5rem;
`;

const Welcome = styled.span`
  font-size: 14px;
`;

function GuestInfo() {
  const user = JSON.parse(localStorage.getItem("guest"));
  const logoutBtn = () => {
    localStorage.removeItem("guest");
    window.location.reload();
  };
  return (
    <>
      <GuestInfoContainer>
        <Welcome>
          <span>歡迎光臨</span>
          <br />
          <span>{user.fullName}</span>
        </Welcome>
        <Button onClick={logoutBtn}>登出</Button>
      </GuestInfoContainer>
    </>
  );
}

export default GuestInfo;
