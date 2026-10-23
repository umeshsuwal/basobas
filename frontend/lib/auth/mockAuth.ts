import type { AuthResponse, SignupData, UserRole } from "@/types/auth";

const MOCK_TOKEN = "mock-token-123";

export const DEMO_ACCOUNTS = {
  tenant: {
    email: "tenant@basobas.com",
    password: "tenant123",
    name: "Umesh Suwal",
    phone: "9813456789",
    role: "tenant",
  },
  landlord: {
    email: "landlord@basobas.com",
    password: "landlord123",
    name: "Saroj Thapa",
    phone: "9841382910",
    role: "landlord",
  },
} as const satisfies Record<
  UserRole,
  {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: UserRole;
  }
>;

function waitForMockRequest() {
  return new Promise((resolve) => setTimeout(resolve, 400));
}

export async function mockSignup(data: SignupData): Promise<AuthResponse> {
  await waitForMockRequest();

  return {
    token: MOCK_TOKEN,
    user: {
      id: "demo-tenant",
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

  const account = Object.values(DEMO_ACCOUNTS).find(
    (demoAccount) =>
      demoAccount.email === email.trim().toLowerCase() &&
      demoAccount.password === password,
  );

  if (!account) {
    throw new Error(
      "Invalid demo credentials. Use one of the accounts shown below.",
    );
  }

  return {
    token: MOCK_TOKEN,
    user: {
      id: account.role === "landlord" ? "demo-landlord" : "demo-tenant",
      name: account.name,
      email: account.email,
      phone: account.phone,
      role: account.role,
    },
  };
}
