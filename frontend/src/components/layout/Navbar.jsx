"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/certificates", label: "Certificates" },
  { href: "/verify", label: "Verify" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-canvas/70 backdrop-blur-2xl">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="font-display text-lg font-semibold">ElevateX</div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted">
              Harshal Wakode
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-brand-500/10 text-brand-500"
                    : "text-muted hover:bg-surface/70 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {isAdmin ? (
            <Link
              href="/admin"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-surface/70 hover:text-ink"
            >
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <div className="hidden rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-muted md:block">
                {user?.name}
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="button-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="button-secondary hidden sm:inline-flex">
                Login
              </Link>
              <Link href="/signup" className="button-primary">
                Start Learning
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
