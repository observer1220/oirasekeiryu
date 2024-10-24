interface GetBookingsRequest {
  filter?: {
    field: string;
    value: string;
    method: string;
  } | null;
  sortBy?: { field: string; direction: string };
  page?: number;
}

interface GetBookingsResponse {
  data: CabinRequest[];
  count: number;
}

interface GetBookingRequest {
  id?: string;
}

interface GetDataByDateRequest {
  date: string;
}

interface BookingResponse {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  status: "unconfirmed" | "checked-in" | "checked-out";
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: CabinResponse;
}

interface GetStaysAfterDateResponse {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  guests: {
    fullName: string;
  };
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string | null;
  startDate: string;
  status: "unconfirmed" | "checked-in" | "checked-out";
  totalPrice: number;
}

interface GetBookingsAfterDateResponse {
  created_at: string;
  extrasPrice: number;
  totalPrice: number;
}

interface GetStaysTodayActivityResponse {
  id: number;
  status: string;
  guests: {
    countryFlag: string;
    fullName: string;
    country: string;
  };
  numNight: number;
}
