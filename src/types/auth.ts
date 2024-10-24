interface AdminSignupRequest {
  fullName: string;
  email: string;
  password: string;
}

interface AdminLoginRequest {
  email: string;
  password: string;
}

interface UpdateCurrentUserRequest {
  fullName?: string;
  password?: string;
  avatar?: File | null;
}
