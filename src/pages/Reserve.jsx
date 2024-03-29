import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Spinner from "../ui/Spinner";
import { useReserve } from "../features/authentication/useReserve";
import Select from "../ui/Select";
import { useCabins } from "../features/cabins/useCabins";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReserveLayout from "../ui/Layout/ReserveLayout";
import LanguageSwitch from "../ui/LanguageSwitch";

function Reserve() {
  const { t } = useTranslation();
  const { isLoading, reserve } = useReserve();
  const { cabins } = useCabins();
  const [options, setOptions] = useState([]);
  const [cabinId, setCabinId] = useState("");
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ guestId, startDate, endDate, numGuests }) {
    reserve(
      { guestId, startDate, endDate, numGuests, cabinId },
      {
        onSuccess: () => reset(),
      }
    );
  }

  useEffect(() => {
    const results = [];
    cabins?.forEach((value) => {
      results.push({
        key: value.name,
        label: value.name,
        value: value.id,
      });
    });
    // Update the options state
    setOptions([{ key: 0, label: "Select a cabin", value: "" }, ...results]);
  }, [cabins]);

  if (isLoading) return <Spinner />;
  return (
    <ReserveLayout>
      <LanguageSwitch />
      <h1>{t("reserve.title")}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* cabinPrice extrasPrice totalPrice hasBreakfast */}
        <FormRow label="Guest Name" error={errors?.guestId?.message}>
          <Input
            type="text"
            id="guestId"
            disabled={isLoading}
            {...register("guestId", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Start Date" error={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            disabled={isLoading}
            {...register("startDate", {
              required: "This field is required",
              validate: (value) => {
                const today = new Date().toISOString().split("T")[0];
                return value < today
                  ? "Start date must be today or later"
                  : true;
              },
            })}
          />
        </FormRow>
        <FormRow label="End Date" error={errors?.endDate?.message}>
          <Input
            type="date"
            id="endDate"
            disabled={isLoading}
            {...register("endDate", {
              required: "This field is required",
              validate: (value) => {
                const startDate = getValues("startDate");
                return startDate && value < startDate
                  ? "End date must be after start date"
                  : true;
              },
            })}
          />
        </FormRow>
        <FormRow label="Guests" error={errors?.numGuests?.message}>
          <Input
            type="number"
            id="numGuests"
            disabled={isLoading}
            {...register("numGuests", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Number of guests must be at least 1",
              },
            })}
          />
        </FormRow>
        <FormRow label="Cabin" error={errors?.cabinId?.message}>
          <Select
            options={options}
            id="cabinId"
            onChange={(event) => setCabinId(Number(event.target.value))}
          />
        </FormRow>
        {/* <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        </FormRow> */}
        <FormRow>
          <Button disabled={isLoading}>Submit</Button>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={reset}
          >
            Cancel
          </Button>
        </FormRow>
      </Form>
    </ReserveLayout>
  );
}

export default Reserve;
