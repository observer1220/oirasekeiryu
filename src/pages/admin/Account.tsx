import UpdatePasswordForm from "../../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm";
import { Row, Heading } from "../../components/common";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>
      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
