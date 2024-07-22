import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormRow,
  Heading,
  Input,
  Spinner,
} from "../../components/common";
import { useSignup } from "./useGuest";
import { useMoveBack } from "../../hooks/useGeneral";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const { isLoading, signup } = useSignup();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  function onSubmit({ fullName, email, nationalID }) {
    signup(
      { fullName, email, nationalID },
      {
        onSuccess: () => {
          reset();
          moveBack();
        },
      }
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading level={2}>訪客註冊</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="姓名" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            disabled={isLoading}
            {...register("fullName", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="EMAIL" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="身分證或護照（10碼）"
          error={errors?.nationalID?.message}
        >
          <Input
            type="text"
            id="nationalID"
            disabled={isLoading}
            {...register("nationalID", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "nationalID needs a minimun of 10 characters",
              },
            })}
          />
        </FormRow>

        <FormRow>
          <Button disabled={isLoading}>註冊</Button>
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={() => navigate("/")}
          >
            回到首頁
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default SignupForm;
