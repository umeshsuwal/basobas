import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.1)] sm:p-10">
        <div className="mb-7 text-center">
          <div className="mx-auto grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-lg text-white">
            ⌂
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Welcome to Basobas
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Your simple, trusted rental home in Nepal
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
