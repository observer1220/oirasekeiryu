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
import styled from "styled-components";
import toast from "react-hot-toast";

const GuestLoginContainer = styled.main`
  width: 100%;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [nationalID, setNationalID] = useState("");
  const { isLoading, login } = useLogin();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = [];

    if (!email) {
      errors.push("Email is required");
    }

    if (!nationalID) {
      errors.push("National ID is required");
    }

    if (errors.length > 0) {
      toast.error(errors.join("\n"));
      return;
    }

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
    <GuestLoginContainer>
      <Heading>訪客登入</Heading>
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
          <Button $size="large" disabled={isLoading}>
            {!isLoading ? "登入" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
    </GuestLoginContainer>
  );
}

export default LoginForm;
