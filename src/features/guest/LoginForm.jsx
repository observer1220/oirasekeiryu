import { useState } from "react";
import {
  Button,
  Form,
  Input,
  FormRowVertical,
  SpinnerMini,
  Heading,
} from "../../components/common";
import { useLogin } from "./useGuest";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [nationalID, setNationalID] = useState("");
  const { isLoading, login } = useLogin();

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !nationalID) return;
    login(
      { email, nationalID },
      {
        onError: () => {
          setEmail("");
          setNationalID("");
        },
      }
    );
  }

  return (
    <>
      <Heading level={2}>訪客登入</Heading>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="EMAIL">
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="身分證或護照（10碼）">
          <Input
            type="text"
            id="nationalID"
            value={nationalID}
            onChange={(e) => setNationalID(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoading}>
            {!isLoading ? "Login" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default LoginForm;
