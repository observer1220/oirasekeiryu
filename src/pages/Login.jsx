import LoginForm from "../features/authentication/LoginForm";
import { Logo, Heading } from "../components/common";
import LoginLayout from "../components/Layout/LoginLayout";

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
