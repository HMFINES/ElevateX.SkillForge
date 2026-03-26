"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, MailOpen, ShieldAlert } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import PasswordField from "@/components/auth/PasswordField";
import InputField from "@/design-system/InputField";
import Button from "@/design-system/Button";
import Card from "@/design-system/Card";

export default function ResetPasswordView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasToken = Boolean(searchParams.get("token"));
  const [step, setStep] = useState(hasToken ? 3 : 1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    if (!password) return "Use at least 8 characters.";
    if (password.length < 8) return "Make it longer for better security.";
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return "Add one uppercase letter and one number.";
    }
    return "Strong enough to continue.";
  }, [password]);

  const passwordError =
    password && password.length < 6 ? "Password must be at least 6 characters." : "";
  const confirmError =
    confirmPassword && confirmPassword !== password ? "Passwords do not match." : "";

  const requestReset = async (event) => {
    event.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Enter a valid email to continue.");
      return;
    }

    setLoading(true);
    setMessage("");
    window.setTimeout(() => {
      setStep(2);
      setLoading(false);
      setMessage("Reset instructions have been prepared for your inbox.");
    }, 600);
  };

  const submitNewPassword = async (event) => {
    event.preventDefault();
    if (!password || passwordError || confirmError) {
      setMessage("Use a valid password and make sure both fields match.");
      return;
    }

    setLoading(true);
    setMessage("");
    window.setTimeout(() => {
      setStep(4);
      setLoading(false);
    }, 700);
  };

  return (
    <AuthShell
      eyebrow="Reset Password"
      title="Recover access without losing momentum."
      description="Recover access through a clear step-by-step flow with inbox confirmation, password guidance, and a smooth return back into login."
      asideTitle="Password recovery should feel calm, not chaotic."
      asideCopy="The experience covers email entry, inbox guidance, password reset, and success confirmation so learners can get back to their dashboard with less friction."
      highlights={[
        {
          eyebrow: "Step 1",
          title: "Request a reset email",
          copy: "Enter the email linked to your ElevateX account.",
        },
        {
          eyebrow: "Step 2",
          title: "Use the secure inbox link",
          copy: "The reset link returns the learner to the password form with the right recovery context.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["1", "Email"],
            ["2", "Inbox"],
            ["3", "Reset"],
            ["4", "Success"],
          ].map(([index, label]) => (
            <div
              key={label}
              className={`rounded-[20px] border p-3 text-center ${
                step >= Number(index)
                  ? "border-brand-500/30 bg-brand-500/10 text-ink"
                  : "border-line bg-surface/60 text-muted"
              }`}
            >
              <div className="text-xs uppercase tracking-[0.2em]">{index}</div>
              <div className="mt-1 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>

        {step === 1 ? (
          <form className="space-y-4" onSubmit={requestReset}>
            <InputField
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Preparing reset..." : "Send reset link"}
            </Button>
          </form>
        ) : null}

        {step === 2 ? (
          <Card padding="md" className="space-y-3 bg-brand-500/8">
            <div className="flex items-center gap-3">
              <MailOpen className="text-brand-500" size={18} />
              <div className="font-semibold">Check your inbox</div>
            </div>
            <p className="text-sm leading-7 text-muted">
              We&apos;ve prepared the reset step for <span className="text-ink">{email}</span>.
              Open the latest ElevateX email and use the secure link to continue.
            </p>
            <Button type="button" variant="secondary" onClick={() => setStep(3)}>
              I have the reset link
            </Button>
          </Card>
        ) : null}

        {step === 3 ? (
          <form className="space-y-4" onSubmit={submitNewPassword}>
            <PasswordField
              label="New password"
              placeholder="Create a new password"
              value={password}
              error={passwordError}
              helperText={passwordStrength}
              onChange={(event) => setPassword(event.target.value)}
            />
            <PasswordField
              label="Confirm password"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              error={confirmError}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Card padding="md" className="bg-surface/60">
              <div className="flex items-start gap-3 text-sm text-muted">
                <ShieldAlert size={18} className="mt-0.5 text-warning" />
                <p className="leading-7">
                  This screen is prepared for the secure token-verification step so the reset link
                  can land here and submit directly to the API.
                </p>
              </div>
            </Card>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating password..." : "Update password"}
            </Button>
          </form>
        ) : null}

        {step === 4 ? (
          <Card padding="md" className="space-y-3 bg-accent/10">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-success" />
              <div className="font-semibold">Password updated successfully</div>
            </div>
            <p className="text-sm leading-7 text-muted">
              Your account recovery flow is complete. Continue into login and return to your
              dashboard.
            </p>
            <Button type="button" onClick={() => router.push("/auth/login")}>
              Back to login
            </Button>
          </Card>
        ) : null}

        {message ? <p className="text-sm text-muted">{message}</p> : null}

        {step < 4 ? (
          <div className="text-sm text-muted">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-brand-500 hover:underline">
              Go back to login
            </Link>
          </div>
        ) : null}
      </div>
    </AuthShell>
  );
}
