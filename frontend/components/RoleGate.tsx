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
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== role) {
      router.replace(user.role === "landlord" ? "/dashboard" : "/feed");
    }
  }, [role, router, user]);

  if (!user || user.role !== role) {
    return <main className="grid min-h-screen place-items-center bg-[#f8f9ff] text-sm text-slate-500">Checking your account...</main>;
  }

  return children;
}
