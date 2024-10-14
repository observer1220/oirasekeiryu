import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { Logo, Heading } from "../components/common";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo height="8.6rem" />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
