import SignupForm from "../features/authentication/SignupForm";
import { Heading } from "../components/common";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create admin account</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
