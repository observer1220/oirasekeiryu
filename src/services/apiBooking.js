import supabase from "./supabase";

export async function reserve ({ guestId, startDate, endDate, numGuests, cabinId }) {
  console.log({ startDate, endDate, numGuests, cabinId });
  const numNights = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

  const { data: cabinData } = await supabase
    .from('cabins')
    .select('*');
  const cabinDataById = cabinData.find((cabin) => cabin.id === cabinId);
  const cabinPrice = cabinDataById.discount === 0 ? cabinDataById.regularPrice : cabinDataById.discount;
  const totalPrice = numNights * cabinPrice;
  // const guestId = guestId;
  // console.log({ guestId });

  const { data, error } = await supabase.from('bookings').insert([
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
      guestId: guestId,
    }
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}