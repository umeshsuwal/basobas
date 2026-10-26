export type UserRole = "landlord" | "tenant";

export interface AuthUser {
  id: string;
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

export interface UserProfile {
  id: string;
  userId: string;
  bio: string | null;
  location?: string | null;
  occupation?: string | null;
  preferredLocations?: string[];
  preferences?: string[];
  avatarUrl: string | null;
  verificationStatus: string;
}

export interface ProfileResponse {
  user: AuthUser;
  profile: UserProfile | null;
}
