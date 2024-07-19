import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormRow,
  Input,
  Spinner,
  Select,
} from "../../components/common";
import { useReserve } from "../../features/authentication/useAuthentication";
import { useCabins } from "../../features/cabins/useCabins";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useMoveBack } from "../../hooks/useGeneral";

const ReserveLayout = styled.main`
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Reservation() {
  const { t } = useTranslation();
  const { isLoading, reserve } = useReserve();
  const { cabins } = useCabins();
  const [options, setOptions] = useState([]);
  const [cabinId, setCabinId] = useState("");
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const location = useLocation();
  const goBack = useMoveBack();

  function onSubmit({ guestId, startDate, endDate, numGuests }) {
    reserve(
      { guestId, startDate, endDate, numGuests, cabinId },
      {
        onSuccess: () => reset(),
      }
    );
  }

  useEffect(() => {
    const cabinId = location.pathname.split("/").pop();
    setCabinId(cabinId);

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
      <h1>{t("reserve.title")}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* cabinPrice extrasPrice totalPrice hasBreakfast */}
        <FormRow label="Cabin" error={errors?.cabinId?.message}>
          <Select
            value={cabinId}
            options={options}
            id="cabinId"
            disabled="true"
          />
        </FormRow>
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
        {/* <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        </FormRow> */}
        <FormRow>
          <Button disabled={isLoading}>Submit</Button>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={goBack}
          >
            回到首頁
          </Button>
        </FormRow>
      </Form>
    </ReserveLayout>
  );
}

export default Reservation;
