"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import PasswordField from "@/components/auth/PasswordField";
import InputField from "@/design-system/InputField";
import Button from "@/design-system/Button";
import { useAuth } from "@/context/AuthContext";

export default function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("next");
  const next =
    requestedNext && requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";
  const { login, signInWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fieldErrors = useMemo(
    () => ({
      email:
        form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
          ? "Enter a valid email address."
          : "",
      password:
        form.password && form.password.length < 6
          ? "Password must be at least 6 characters."
          : "",
    }),
    [form.email, form.password]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!form.email || !form.password || fieldErrors.email || fieldErrors.password) {
      setError("Enter a valid email and password to continue.");
      setLoading(false);
      return;
    }

    try {
      await login(form);
      router.push(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Login"
      title="Welcome back to ElevateX."
      description="Sign in with email or Google and continue from your dashboard, progress milestones, and certificate-ready tracks."
      asideTitle="Your learning system should still be here when you come back."
      asideCopy="Log in to resume your active tracks, review progress, and keep building proof without losing momentum."
      highlights={[
        {
          eyebrow: "Resume fast",
          title: "Continue where you left off",
          copy: "Pick up your active course, next lesson, and progress state in one place.",
        },
        {
          eyebrow: "Certificate trust",
          title: "Keep your verifiable record",
          copy: "Your certificates, verification IDs, and dashboard history stay connected to your account.",
        },
      ]}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          error={fieldErrors.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          error={fieldErrors.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted">JWT session + Google OAuth available</span>
          <Link href="/auth/reset-password" className="text-brand-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        {error ? <p className="text-sm text-error">{error}</p> : null}
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="my-6 text-center text-xs uppercase tracking-[0.22em] text-muted">
        or continue with Google
      </div>

      <GoogleLoginButton
        onCredential={async (credential) => {
          try {
            await signInWithGoogle(credential);
            router.push(next);
          } catch (err) {
            setError(err.message);
          }
        }}
      />

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/auth/signup" className="text-brand-500 hover:underline">
          Create your account
        </Link>
      </p>
    </AuthShell>
  );
}
