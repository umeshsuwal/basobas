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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function authHeaders() {
  return { Authorization: `Bearer ${window.localStorage.getItem("token")}` };
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

export async function submitApplication(listingId: string, message: string) {
  return parseResponse<TenantApplication>(
    await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, message }),
    }),
  );
}
