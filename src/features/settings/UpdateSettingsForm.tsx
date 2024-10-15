import { Form, FormRow, Input, Spinner } from "../../components/common";
import { useSettings, useUpdateSetting } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isEditing, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  const handleUpdate = (event: any, fieldName: string) => {
    const { value } = event.target;
    if (!value) return;
    updateSetting({ [fieldName]: value });
  };
  return (
    <Form>
      <FormRow label="Minimum stay">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(event) => handleUpdate(event, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum stay">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(event) => handleUpdate(event, "maxBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(event) => handleUpdate(event, "maxGuestsPerBooking")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(event) => handleUpdate(event, "breakfastPrice")}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
