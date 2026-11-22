"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AccountHeader } from "@/components/AccountHeader";
import { useAuth } from "@/providers/AuthProvider";
import { RoleGate } from "@/components/RoleGate";
import {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
} from "@/lib/profiles";
import type { ProfileResponse } from "@/types/auth";
import { changePassword } from "@/lib/password";

export default function ProfileSettingsPage() {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyProfile();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  useEffect(() => {
    if (!profileData) return;

    setFormData({
      name: profileData.user.name ?? "",
      phone: profileData.user.phone ?? "",
      location: profileData.profile?.location ?? "",
      bio: profileData.profile?.bio ?? "",
    });
  }, [profileData]);

  const user = profileData?.user;
  const profile = profileData?.profile;

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    setPasswordSaving(true);

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordSuccess("Password changed successfully. Please log in again.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      logout();
      router.push("/login");
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Unable to change password.",
      );
    } finally {
      setPasswordSaving(false);
    }
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setEditError("");
    setEditSuccess("");

    try {
      let avatarUrl = profile?.avatarUrl ?? null;

      if (avatarFile) {
        avatarUrl = await uploadProfileImage(avatarFile);
      }

      const updated = await updateMyProfile({
        ...formData,
        ...(avatarUrl ? { avatarUrl } : {}),
      });

      setProfileData(updated);
      setAvatarFile(null);
      setEditSuccess("Profile updated successfully.");
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "Unable to update profile",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="p-8">Loading landlord profile...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>;
  }

  return (
    <RoleGate role="landlord">
      <main className="min-h-screen bg-[#f8f9ff]">
        <AccountHeader role="Landlord Account" title="Profile & Settings" />

        <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
          <p className="text-sm text-slate-600">
            Dashboard <span className="mx-2">/</span>{" "}
            <strong className="text-brand-700">Profile &amp; Settings</strong>
          </p>

          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Landlord Profile &amp; Settings
              </h1>
              <p className="mt-2 text-slate-600">
                Manage your contact details, verified status, and account
                security.
              </p>
            </div>

            <span className="w-fit rounded-full bg-brand-50 px-4 py-2 text-xs text-brand-700">
              {profile?.verificationStatus ?? "Unverified"}
            </span>
          </div>

          {/* Profile Information */}
          <form
            id="landlord-profile-form"
            onSubmit={saveProfile}
            className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"
          >
            <div className="flex items-center gap-3">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Profile"
                  className="h-16 w-16 rounded-2xl object-cover"
                />
              ) : (
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-amber-100 text-2xl">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {user?.name}
                </h2>
                <p className="text-sm text-slate-600">
                  {profile?.location || "Location not provided"}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Full Name
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                />
              </label>

              <label className="text-sm font-medium">
                Phone Number
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                />
              </label>

              <label className="text-sm font-medium">
                Email
                <input
                  type="email"
                  disabled
                  value={user?.email ?? ""}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 p-3"
                />
              </label>

              <label className="text-sm font-medium">
                Location
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Kathmandu, Nepal"
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                />
              </label>

              <label className="text-sm font-medium sm:col-span-2">
                About You
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell tenants a little about yourself..."
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                />
              </label>

              <label className="text-sm font-medium sm:col-span-2">
                Profile Picture
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                  className="mt-2 block w-full text-sm"
                />
              </label>
            </div>

            {editError && (
              <p className="mt-4 text-sm text-red-600">{editError}</p>
            )}

            {editSuccess && (
              <p className="mt-4 text-sm text-emerald-600">{editSuccess}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-6 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>

          {/* Security and Account Sections */}
          <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_0.8fr]">
            <form
              onSubmit={updatePassword}
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100"
            >
              <h2 className="text-xl font-bold text-slate-900">
                ◉ Security &amp; Password
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Update your password to keep your Basobas listings, inquiries,
                and rental agreements completely secure.
              </p>

              <label className="mt-7 block text-sm font-medium">
                Current Password
                <input
                  type="password"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                  value={passwordData.currentPassword}
                  disabled={passwordSaving}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </label>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  New Password
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                    value={passwordData.newPassword}
                    disabled={passwordSaving}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </label>

                <label className="text-sm font-medium">
                  Confirm New Password
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Repeat new password"
                    className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                    value={passwordData.confirmPassword}
                    disabled={passwordSaving}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={passwordSaving}
                className="mt-7 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
              >
                {passwordSaving ? "Updating..." : "Update Password"}
              </button>

              {passwordError && (
                <p className="mt-3 text-sm text-red-600">{passwordError}</p>
              )}

              {passwordSuccess && (
                <p className="mt-3 text-sm text-emerald-600">
                  {passwordSuccess}
                </p>
              )}
            </form>

            <aside className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h2 className="font-bold text-slate-900">
                  Ownership &amp; Verification
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Need to update your citizenship, Lalpurja, or bank payment
                  details?
                </p>

                <a
                  href="mailto:support@basobas.com.np"
                  className="mt-5 inline-block text-sm font-semibold text-brand-700"
                >
                  Contact Verification Desk →
                </a>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h2 className="font-bold text-slate-900">Account Session</h2>

                <p className="mt-2 text-sm text-slate-600">
                  Current active session on this device.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="mt-5 w-full rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-700"
                >
                  ⇥ Log Out of Basobas
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </RoleGate>
  );
}
