import type { AuthResponse, SignupData, UserRole } from "@/types/auth";

const MOCK_TOKEN = "mock-token-123";
const MOCK_USER_ID = 1;

function waitForMockRequest() {
  return new Promise((resolve) => setTimeout(resolve, 400));
}

export async function mockSignup(data: SignupData): Promise<AuthResponse> {
  await waitForMockRequest();

  return {
    token: MOCK_TOKEN,
    user: {
      id: MOCK_USER_ID,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  };
}

export async function mockLogin(email: string, password: string): Promise<AuthResponse> {
  await waitForMockRequest();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const role: UserRole = email.toLowerCase().includes("landlord")
    ? "landlord"
    : "tenant";

  return {
    token: MOCK_TOKEN,
    user: {
      id: MOCK_USER_ID,
      name: "Demo User",
      email,
      phone: "9800000000",
      role,
    },
  };
}
