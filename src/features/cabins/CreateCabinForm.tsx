import { useForm } from "react-hook-form";
import {
  Input,
  Form,
  Button,
  FileInput,
  Textarea,
  FormRow,
} from "../../components/common";
import { useCreateCabin, useEditCabin } from "./useCabins";

interface CreateCabinFormProps {
  cabinToEdit?: {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description: string;
  };
  onCloseModal?: () => void;
}

function CreateCabinForm({
  cabinToEdit = {
    id: 0,
    name: "",
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    image: "",
    description: "",
  },
  onCloseModal,
}: CreateCabinFormProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, editCabin } = useEditCabin();
  const isWorking = isCreating || isUpdating;

  const { id: edit_id, ...edit_values } = cabinToEdit;
  const isEditSession = Boolean(edit_id);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? edit_values : {},
  });
  const { errors } = formState;

  const onSubmit = (data: any) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: edit_id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              if (Number(value) >= Number(getValues().regularPrice)) {
                return "Discount should be less than regular price";
              }
            },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>{" "}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
