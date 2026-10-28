export interface TenantApplication {
  id: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  listing: {
    id: string;
    title: string;
    location: string;
    monthlyRent: number;
  };
}

export interface ReceivedApplication {
  id: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    tenantProfile?: {
      occupation: string | null;
    } | null;
  };
  listing: {
    id: string;
    title: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function authHeaders() {
  const token = window.localStorage.getItem("token");
  return { Authorization: `Bearer ${token ?? ""}` };
}

async function parseResponse<T extends object>(response: Response) {
  const body = (await response.json()) as T | { message: string };
  if (!response.ok) {
    throw new Error("message" in body ? body.message : "Request failed");
  }
  return body as T;
}

export async function getMyApplications() {
  return parseResponse<TenantApplication[]>(
    await fetch(`${API_URL}/applications/mine`, { headers: authHeaders() }),
  );
}

export async function getReceivedApplications() {
  return parseResponse<ReceivedApplication[]>(
    await fetch(`${API_URL}/applications/received`, { headers: authHeaders() }),
  );
}

export async function updateApplicationStatus(
  id: string,
  status: ReceivedApplication["status"],
) {
  return parseResponse<ReceivedApplication>(
    await fetch(`${API_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),
  );
}

export async function submitApplication(listingId: string, message: string) {
  return parseResponse<TenantApplication>(
    await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, message }),
    }),
  );
}
