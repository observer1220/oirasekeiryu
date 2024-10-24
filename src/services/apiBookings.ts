import supabase from "./supabase";
import { getToday } from "../utils";
import { PAGE_SIZE } from "../utils/constants";

async function getBookings({
  filter,
  sortBy,
  page,
}: GetBookingsRequest): Promise<GetBookingsResponse> {
  let query: any = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER CONDITION
  if (filter) {
    query = query[filter.method](filter.field, filter.value);
  }

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) throw new Error("Bookings could not be loaded");

  return { data, count };
}

async function getBooking({ id }: GetBookingRequest): Promise<BookingResponse> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error("Booking not found");

  return data;
}

async function updateBooking(id: number, obj: any): Promise<BookingResponse> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  return data;
}

async function deleteBooking(id: number) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error("Booking could not be deleted");
}

async function getBookingsAfterDate({
  date,
}: GetDataByDateRequest): Promise<GetBookingsAfterDateResponse[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) throw new Error("Bookings could not get loaded");

  return data;
}

async function getStaysAfterDate({
  date,
}: GetDataByDateRequest): Promise<GetStaysAfterDateResponse[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) throw new Error("Bookings could not get loaded");

  return data;
}

async function getStaysTodayActivity(): Promise<
  GetStaysTodayActivityResponse[]
> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) throw new Error("Bookings could not get loaded");

  return data;
}

export {
  getBookings,
  getBooking,
  getBookingsAfterDate,
  getStaysAfterDate,
  getStaysTodayActivity,
  updateBooking,
  deleteBooking,
};
