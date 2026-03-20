"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup, signInWithGoogle } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(form);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shell pb-20">
      <div className="mx-auto max-w-xl glass-card p-8">
        <div className="eyebrow">Signup</div>
        <h1 className="mt-4 font-display text-4xl font-semibold">
          Build your learning system.
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Create your ElevateX account and start progressing through internal and external pathways.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="my-6 text-center text-xs uppercase tracking-[0.22em] text-muted">
          or continue with Google
        </div>

        <GoogleLoginButton
          onCredential={async (credential) => {
            try {
              await signInWithGoogle(credential);
              router.push("/dashboard");
            } catch (err) {
              setError(err.message);
            }
          }}
        />

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
