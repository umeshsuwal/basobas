import type { ProfileResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function getToken() {
  return window.localStorage.getItem("token");
}

export async function getMyProfile(): Promise<ProfileResponse> {
  const response = await fetch(`${API_URL}/profiles/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const body = (await response.json()) as ProfileResponse | { message: string };
  if (!response.ok || !("user" in body)) {
    throw new Error("message" in body ? body.message : "Unable to load profile");
  }
  return body;
}

export async function updateMyProfile(
  input: Record<string, unknown>,
): Promise<ProfileResponse> {
  const response = await fetch(`${API_URL}/profiles/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(input),
  });
  const body = (await response.json()) as ProfileResponse | { message: string };
  if (!response.ok || !("user" in body)) {
    throw new Error(
      "message" in body ? body.message : "Unable to update profile",
    );
  }
  return body;
}

export async function uploadProfileImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(`${API_URL}/profiles/me/avatar`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  const body = (await response.json()) as
    | { avatarUrl: string }
    | { message: string };
  if (!response.ok || !("avatarUrl" in body)) {
    throw new Error(
      "message" in body ? body.message : "Unable to upload profile image",
    );
  }
  return body.avatarUrl;
}
