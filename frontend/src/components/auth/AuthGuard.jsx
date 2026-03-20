"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children, adminOnly = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (adminOnly && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [adminOnly, isAdmin, isAuthenticated, loading, pathname, router]);

  if (loading || !isAuthenticated || (adminOnly && !isAdmin)) {
    return (
      <div className="shell py-24">
        <div className="glass-card p-8 text-center text-muted">Loading your workspace...</div>
      </div>
    );
  }

  return children;
}
