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
  const [mode, setMode] = useState<AuthMode>("login");
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
      router.push(response.user.role === "landlord" ? "/dashboard" : "/");
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
      <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
        {(["login", "signup"] as const).map((nextMode) => (
          <button
            key={nextMode}
            type="button"
            onClick={() => setMode(nextMode)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              mode === nextMode
                ? "bg-white text-slate-900 shadow-sm"
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
            <input
              className="w-full rounded-lg border border-slate-200 p-3 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              placeholder="Full name"
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
            <input
              className="w-full rounded-lg border border-slate-200 p-3 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              placeholder="Phone number"
              required
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </>
        )}
        <input
          className="w-full rounded-lg border border-slate-200 p-3 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
        <input
          className="w-full rounded-lg border border-slate-200 p-3 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
        />

        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-3">
            {roleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                className={`rounded-lg border p-3 text-sm transition ${
                  role === option.value
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-slate-200 text-slate-600 hover:border-brand-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 p-3 font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Log In"
              : "Create Account"}
        </button>
      </form>
    </>
  );
}
