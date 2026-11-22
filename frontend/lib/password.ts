
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  const token = window.localStorage.getItem("token");

  if (!token) {
    throw new Error("You must be logged in to change your password.");
  }

  const response = await fetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(
      body.message ?? "Unable to change password. Please try again.",
    );
  }
}
