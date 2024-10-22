import { useState } from "react";
import {
  Button,
  FileInput,
  Form,
  FormRow,
  Input,
} from "../../components/common";
import { useUser, useUpdateUser } from "./useAuthentication";
import { toast } from "react-hot-toast";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data,
  // because we know that it has already been loaded at this point
  const { userData } = useUser();
  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(userData.user_metadata.fullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fullName) {
      toast.error("Full name field cannot be empty!");
      return;
    }

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          const form = event.target as HTMLFormElement;
          form.reset(); // Reset the form
        },
      }
    );
  }

  function handleCancel() {
    setFullName(userData.user_metadata.fullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={userData.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(event) => {
            const files = event.target.files;
            if (files) {
              setAvatar(files[0]);
            }
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
