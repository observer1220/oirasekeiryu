interface SettingsRequest {
  [key: string]: string;
}

interface SettingsResponse {
  id: number;
  created_at: string;
  maxGuestsPerBooking: number;
  minBookingLength: number;
  maxBookingLength: number;
  breakfastPrice: number;
}
