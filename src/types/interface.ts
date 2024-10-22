interface SelectOptionType {
  key: string | number;
  label: string;
  value: number;
}

interface GetTodayProps {
  end?: boolean;
}

interface CabinRequest {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: any;
}

interface CabinResponse {
  cabin: {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
  };
}

interface BookingResponse {
  booking: {
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
    guests: {
      fullName: string;
      email: string;
      country: string;
      countryFlag: string;
      nationalID: string;
    };
    cabins: {
      name: string;
    };
  };
}
