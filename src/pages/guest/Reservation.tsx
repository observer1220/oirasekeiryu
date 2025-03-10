import { useEffect, useState } from "react";
import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks";
import toast from "react-hot-toast";

const ReserveLayout = styled.main`
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

interface FormValues {
  cabinId: number;
  fullName: string;
  startDate: string;
  endDate: string;
  numGuests: number;
}

function Reservation() {
  const location = useLocation();
  const { t } = useTranslation();
  const { isLoading, reserve } = useReserve();
  const { cabins } = useCabins();
  const [options, setOptions] = useState<SelectOptionType[]>([]);
  const user = JSON.parse(localStorage.getItem("guest")!);
  const cabinId = Number(location.pathname.split("/").pop());
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<FormValues>();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  function onSubmit({ fullName, startDate, endDate, numGuests }: FieldValues) {
    reserve(
      { fullName, startDate, endDate, numGuests, cabinId },
      {
        onSuccess: () => {
          reset();
          moveBack();
        },
      }
    );
  }

  useEffect(() => {
    const results: SelectOptionType[] = [];
    cabins?.forEach((value) => {
      results.push({
        key: value.name,
        label: value.name,
        value: value.id ?? 0,
      });
    });
    // Update the options state
    setOptions([{ key: 0, label: "Select a cabin", value: 0 }, ...results]);

    // IF guestName is not in localStorage, redirect to /guestLogin
    if (!user || !user.fullName) {
      navigate("/guestLogin");
      toast.error("請先登入");
    }
  }, [cabins, navigate]);

  if (isLoading) return <Spinner />;
  return (
    <ReserveLayout>
      <h1>{t("reserve.title")}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label={t("reserve.roomType")} error={errors?.cabinId?.message}>
          <Select value={cabinId} options={options} id="cabinId" disabled />
        </FormRow>
        <FormRow
          label={t("reserve.guestName")}
          error={errors?.fullName?.message}
        >
          <Input
            value={user?.fullName}
            type="text"
            id="fullName"
            readOnly
            {...register("fullName", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow
          label={t("reserve.checkIn")}
          error={errors?.startDate?.message}
        >
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
        <FormRow label={t("reserve.checkOut")} error={errors?.endDate?.message}>
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
        <FormRow
          label={t("reserve.numGuests")}
          error={errors?.numGuests?.message}
        >
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
          <Button disabled={isLoading}>{t("reserve.reserve")}</Button>
          <Button
            $variation="secondary"
            disabled={isLoading}
            onClick={moveBack}
          >
            {t("reserve.backHome")}
          </Button>
        </FormRow>
      </Form>
    </ReserveLayout>
  );
}

export default Reservation;
