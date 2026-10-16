"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockLogin, mockSignup } from "@/lib/auth/mockAuth";
import type { UserRole } from "@/types/auth";
import { useAuth } from "@/providers/AuthProvider";

type AuthMode = "login" | "signup";

interface AuthForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const INITIAL_FORM: AuthForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const roleOptions: { value: UserRole; label: string }[] = [
  { value: "tenant", label: "I'm looking for a room" },
  { value: "landlord", label: "I have a room to rent" },
];

export function LoginForm() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [role, setRole] = useState<UserRole>("tenant");
  const [form, setForm] = useState<AuthForm>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  function updateField(field: keyof AuthForm, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response =
        mode === "signup"
          ? await mockSignup({ ...form, role })
          : await mockLogin(form.email, form.password);

      login(response.user, response.token);
      router.push(response.user.role === "landlord" ? "/dashboard" : "/feed");
    } catch (requestError: unknown) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-6 flex rounded-xl bg-brand-50 p-1">
        {(["signup", "login"] as const).map((nextMode) => (
          <button
            key={nextMode}
            type="button"
            onClick={() => setMode(nextMode)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              mode === nextMode
                ? "bg-white text-brand-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {nextMode === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <>
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-800">
                I am joining as
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      role === option.value
                        ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                        : "border-slate-200 text-slate-600 hover:border-brand-200"
                    }`}
                  >
                    {option.value === "tenant" ? "🏠 " : "🔑 "}
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="block text-sm font-medium text-slate-800">
              Full Name
              <input
                className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-100"
                placeholder="e.g. Aarav Sharma"
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-slate-800">
              Phone Number
              <input
                className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-100"
                placeholder="98XXXXXXXX"
                required
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </label>
          </>
        )}
        <label className="block text-sm font-medium text-slate-800">
          Email Address
          <input
            className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-100"
            type="email"
            placeholder="name@example.com"
            required
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Password
          <input
            className="mt-2 w-full rounded-xl bg-brand-50 p-3 font-normal outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-100"
            type="password"
            placeholder="At least 8 characters"
            minLength={8}
            required
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-700 p-3 font-semibold text-white transition hover:bg-brand-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Log In"
              : "Create Account"}
        </button>
        <p className="text-center text-xs leading-5 text-slate-500">
          By continuing, you agree to Basobas{" "}
          <span className="font-medium text-brand-700">Terms</span> &amp;{" "}
          <span className="font-medium text-brand-700">Privacy Policy</span>.
        </p>
      </form>
    </>
  );
}
