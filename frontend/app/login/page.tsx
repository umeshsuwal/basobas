import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-brand-700">
          Basobas
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
