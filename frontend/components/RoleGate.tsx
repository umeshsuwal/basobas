"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types/auth";
import { useAuth } from "@/providers/AuthProvider";

export function RoleGate({
  role,
  children,
}: {
  role: UserRole;
  children: React.ReactNode;
}) {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/");
    } else if (isHydrated && user && user.role !== role) {
      router.replace(user.role === "landlord" ? "/dashboard" : "/feed");
    }
  }, [isHydrated, role, router, user]);

  if (!isHydrated) {
    return <main className="grid min-h-screen place-items-center bg-[#f8f9ff] text-sm text-slate-500">Checking your account...</main>;
  }

  if (!user) {
    return <main className="grid min-h-screen place-items-center bg-[#f8f9ff] text-sm text-slate-500">Please log in to continue.</main>;
  }

  if (user.role !== role) {
    return <main className="grid min-h-screen place-items-center bg-[#f8f9ff] text-sm text-slate-500">Redirecting to your account...</main>;
  }

  return children;
}
