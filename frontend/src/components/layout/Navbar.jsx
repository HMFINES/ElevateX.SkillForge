"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { buttonStyles } from "@/design-system/Button";
import Avatar from "@/design-system/Avatar";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/certificates", label: "Certificates" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const isLinkActive = (pathname, href) => {
  if (href.includes("#")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-canvas/78 backdrop-blur-2xl">
      <div className="shell relative flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="font-display text-lg font-semibold">ElevateX</div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted">
              Futuristic Skill Platform
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-line bg-surface/70 p-1 lg:flex">
          {links.map((link) => {
            const active = isLinkActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-brand-500 text-white shadow-glow"
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

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-line bg-surface/72 px-4 py-2 text-sm text-muted xl:flex">
            <Command size={14} />
            Learn skills. Build proof. Get placement-ready.
          </div>
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-line bg-surface/80 px-3 py-2 md:flex">
                <Avatar
                  size="sm"
                  src={user?.avatar}
                  fallback={user?.name?.slice(0, 2)?.toUpperCase() || "EX"}
                />
                <div>
                  <div className="text-sm font-medium text-ink">{user?.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
                    {user?.role}
                  </div>
                </div>
                {isAdmin ? <ShieldCheck size={16} className="text-accent" /> : null}
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className={buttonStyles({
                  variant: "secondary",
                  size: "sm",
                  className: "hidden sm:inline-flex",
                })}
              >
                Logout
              </button>
              <Link
                href="/dashboard"
                className={buttonStyles({
                  size: "sm",
                  className: "hidden lg:inline-flex",
                })}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={buttonStyles({
                  variant: "secondary",
                  size: "sm",
                  className: "hidden sm:inline-flex",
                })}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className={buttonStyles({
                  size: "sm",
                  className: "hidden sm:inline-flex",
                })}
              >
                Join Now
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/82 text-muted transition hover:border-brand-500/30 hover:text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="absolute inset-x-0 top-full mt-3 rounded-[28px] border border-line/80 bg-surface/96 p-4 shadow-panel backdrop-blur-xl lg:hidden">
            <nav className="grid gap-2">
              {links.map((link) => {
                const active = isLinkActive(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-[20px] px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-brand-500 text-white shadow-glow"
                        : "border border-line bg-canvas/55 text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="rounded-[20px] border border-line bg-canvas/55 px-4 py-3 text-sm font-medium text-ink"
                >
                  Admin
                </Link>
              ) : null}
            </nav>

            <div className="mt-4 rounded-[24px] border border-line/80 bg-canvas/45 p-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    src={user?.avatar}
                    fallback={user?.name?.slice(0, 2)?.toUpperCase() || "EX"}
                  />
                  <div>
                    <div className="text-sm font-medium text-ink">{user?.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
                      {user?.role}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="font-medium text-ink">
                    Start free and explore the platform.
                  </div>
                  <div className="text-sm text-muted">
                    Create an account to unlock courses, progress, and certificates.
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className={buttonStyles({ size: "sm" })}>
                      Open Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                      className={buttonStyles({ variant: "secondary", size: "sm" })}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signup" className={buttonStyles({ size: "sm" })}>
                      Join Now
                    </Link>
                    <Link
                      href="/auth/login"
                      className={buttonStyles({ variant: "secondary", size: "sm" })}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
