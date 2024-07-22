import styled from "styled-components";
import SignupForm from "../../features/guest/SignupForm";
import LoginForm from "../../features/guest/LoginForm";
import { useState } from "react";

const GuestLoginContainer = styled.div`
  display: grid;
  gap: 2rem;
  padding: 4rem;
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  span {
    cursor: pointer;
    font-weight: bold;
    padding: 1rem 2rem;
    background-color: #f0f0f0;
    color: #333;
    border-radius: 1px solid #ccc;
    transition: 0.3s;

    /* &.active {
      background: var(--color-brand-700);
      color: white;
    } */
  }
`;

function GuestLogin() {
  const [tab, setTab] = useState("signup");
  const TabSwicher = (tab) => {
    setTab(tab);
  };

  return (
    <GuestLoginContainer>
      <Tab>
        <span
          onClick={() => TabSwicher("signup")}
          className={tab === "signup" ? "active" : ""}
        >
          註冊
        </span>
        <span
          onClick={() => TabSwicher("login")}
          className={tab === "login" ? "active" : ""}
        >
          登入
        </span>
      </Tab>
      {tab === "signup" ? <SignupForm /> : <LoginForm />}
    </GuestLoginContainer>
  );
}

export default GuestLogin;
