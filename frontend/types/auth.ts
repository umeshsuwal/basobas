export type UserRole = "landlord" | "tenant";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}
