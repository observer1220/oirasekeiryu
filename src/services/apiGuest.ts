import supabase from "./supabase";

async function signup({ fullName, email, nationalID }: GuestSignupRequest) {
  const { error } = await supabase
    .from("guests")
    .insert([{ fullName, email, nationalID }]);

  if (error) throw new Error(error.message);
}

async function login({
  email,
  nationalID,
}: GuestLoginRequest): Promise<GuestLoginResponse[]> {
  const { data, error } = await supabase
    .from("guests")
    .select()
    .eq("email", email)
    .eq("nationalID", nationalID);

  if (error) throw new Error(error.message);

  return data;
}

async function reserve({
  fullName,
  startDate,
  endDate,
  numGuests,
  cabinId,
}: GuestReserveRequest) {
  const numNights =
    (Number(new Date(endDate)) - Number(new Date(startDate))) /
    (1000 * 60 * 60 * 24);

  const { data: cabinData } = await supabase.from("cabins").select("*");

  const cabinDataById = cabinData?.find((cabin) => cabin.id === cabinId);
  const cabinPrice =
    cabinDataById.discount === 0
      ? cabinDataById.regularPrice
      : cabinDataById.discount;
  const totalPrice = numNights * cabinPrice;
  const { data: guestData } = await supabase
    .from("guests")
    .select("id")
    .eq("fullName", fullName);

  if (!guestData) return;

  const { error } = await supabase.from("bookings").insert([
    {
      startDate: startDate,
      endDate: endDate,
      numGuests: numGuests,
      isPaid: false,
      status: "unconfirmed",
      numNights: numNights,
      cabinPrice: cabinPrice,
      totalPrice: totalPrice,
      cabinId: cabinId,
      guestId: guestData[0].id,
    },
  ]);

  if (error) throw new Error(error.message);
}

export { signup, login, reserve };
