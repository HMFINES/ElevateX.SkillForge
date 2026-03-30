"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import AuthShell from "@/components/auth/AuthShell";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import PasswordField from "@/components/auth/PasswordField";
import InputField from "@/design-system/InputField";
import Button from "@/design-system/Button";
import { useAuth } from "@/context/AuthContext";

const roles = [
  {
    value: "student",
    label: "Student",
    copy: "For learners building skills, proof, and certificate-backed progress.",
  },
  {
    value: "educator",
    label: "Educator",
    copy: "For mentors or instructors supporting learners and course delivery.",
  },
];

export default function SignupView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("next");
  const next =
    requestedNext && requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";
  const { signup, signInWithGoogle } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    const value = form.password.trim();
    if (!value) return "Use at least 8 characters.";
    if (value.length < 8) return "Make it longer for better security.";
    if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
      return "Add one uppercase letter and one number.";
    }
    return "Strong enough to get started.";
  }, [form.password]);

  const fieldErrors = useMemo(
    () => ({
      name:
        form.name.trim().length > 0 && form.name.trim().length < 2
          ? "Name must be at least 2 characters."
          : "",
      email:
        form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
          ? "Enter a valid email address."
          : "",
      password:
        form.password && form.password.length < 6
          ? "Password must be at least 6 characters."
          : "",
    }),
    [form.email, form.name, form.password]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (
      !form.name.trim() ||
      !form.email ||
      !form.password ||
      fieldErrors.name ||
      fieldErrors.email ||
      fieldErrors.password
    ) {
      setError("Complete all required fields with valid values.");
      setLoading(false);
      return;
    }

    try {
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      router.push(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Signup"
      title="Build your ElevateX workspace."
      description="Create your account, choose your role, and start with a clearer path toward skills, proof, certificates, and job readiness."
      asideTitle="One account for tracks, progress, certificates, and career direction."
      asideCopy="ElevateX is designed to help Indian students and early-career learners stop collecting random tutorials and start building a visible body of work."
      highlights={[
        {
          eyebrow: "Role-based start",
          title: "Choose how you’ll use the platform",
          copy: "Students and educators can enter through flows that match their purpose.",
        },
        {
          eyebrow: "Progress first",
          title: "Keep everything connected",
          copy: "Courses, progress, certificates, and career guidance stay tied to one account.",
        },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          label="Full name"
          placeholder="Your name"
          value={form.name}
          error={fieldErrors.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <InputField
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          error={fieldErrors.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <PasswordField
          label="Password"
          placeholder="Create a password"
          value={form.password}
          error={fieldErrors.password}
          helperText={passwordStrength}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Role
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, role: role.value }))}
                className={clsx(
                  "rounded-[22px] border p-4 text-left transition",
                  form.role === role.value
                    ? "border-brand-500/40 bg-brand-500/10"
                    : "border-line bg-surface/72 hover:border-brand-500/20"
                )}
              >
                <div className="font-semibold">{role.label}</div>
                <div className="mt-2 text-sm leading-6 text-muted">{role.copy}</div>
              </button>
            ))}
          </div>
          <p className="text-sm text-muted">
            Admin access stays protected and is not available through public signup.
          </p>
        </div>

        {error ? <p className="text-sm text-error">{error}</p> : null}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
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
        Already have an account?{" "}
        <Link href="/auth/login" className="text-brand-500 hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
