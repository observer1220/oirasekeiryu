interface GuestSignupRequest {
  fullName: string;
  email: string;
  nationalID: string;
}

interface GuestLoginRequest {
  email: string;
  nationalID: string;
}

interface GuestLoginResponse {
  countryFlag: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
}

interface GuestReserveRequest {
  fullName: string;
  startDate: string;
  endDate: string;
  numGuests: number;
  cabinId: number;
}
