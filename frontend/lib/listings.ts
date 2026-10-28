export interface ManagedListing {
  id: string;
  title: string;
  roomType: string;
  location: string;
  monthlyRent: number;
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function getMyListings() {
  const response = await fetch(`${API_URL}/listings/mine`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token") ?? ""}`,
    },
  });
  const body = (await response.json()) as ManagedListing[] | { message: string };
  if (!response.ok) {
    throw new Error("message" in body ? body.message : "Unable to load listings");
  }
  return body as ManagedListing[];
}
