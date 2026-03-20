"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  const { login, signInWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

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
    <div className="shell pb-20">
      <div className="mx-auto max-w-xl glass-card p-8">
        <div className="eyebrow">Login</div>
        <h1 className="mt-4 font-display text-4xl font-semibold">
          Welcome back to ElevateX.
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Sign in with email or Google and continue learning with your saved progress.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
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
          <Link href="/signup" className="text-brand-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
