"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck, RefreshCcw, ShieldCheck } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import Button from "@/design-system/Button";
import Card from "@/design-system/Card";

const RESEND_SECONDS = 30;

export default function VerifyView() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your inbox";
  const verified = searchParams.get("status") === "verified";
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!cooldown) return undefined;

    const timer = window.setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  return (
    <AuthShell
      eyebrow="Verify Email"
      title={verified ? "Your email is verified." : "Check your inbox."}
      description={
        verified
          ? "Your ElevateX account is ready. You can continue into the dashboard and start your first focused learning sprint."
          : "Open the verification email and confirm your account to unlock secure login, progress tracking, and certificate eligibility."
      }
      asideTitle="Verification keeps progress and trust tied to the right learner."
      asideCopy="Email verification is part of the ElevateX trust layer for progress, certificates, and account recovery. This screen supports a smooth verification flow with resend cooldown states."
      highlights={[
        {
          eyebrow: "Trust layer",
          title: "Protect certificate identity",
          copy: "Verified accounts make learner records, progress history, and public trust signals more reliable.",
        },
        {
          eyebrow: "Low-friction flow",
          title: "Resend with cooldown",
          copy: "If the email is delayed, you can request another one without hammering the endpoint.",
        },
      ]}
    >
      <div className="space-y-5">
        <Card padding="md" className="flex items-start gap-4 bg-brand-500/8">
          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/14 text-brand-500">
            {verified ? <ShieldCheck size={20} /> : <MailCheck size={20} />}
          </div>
          <div className="space-y-2">
            <div className="font-semibold">
              {verified ? "Verification complete" : `Verification email sent to ${email}`}
            </div>
            <p className="text-sm leading-7 text-muted">
              {verified
                ? "You can log in normally and continue into your dashboard."
                : "Look for the latest ElevateX message and click the secure verification link."}
            </p>
          </div>
        </Card>

        {!verified ? (
          <>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={cooldown > 0}
              onClick={() => {
                setCooldown(RESEND_SECONDS);
                setMessage("A fresh verification email has been queued for delivery.");
              }}
            >
              <RefreshCcw size={16} className="mr-2" />
              {cooldown > 0 ? `Resend available in ${cooldown}s` : "Resend verification email"}
            </Button>
            {message ? <p className="text-sm text-success">{message}</p> : null}
          </>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Link href="/auth/login" className="button-primary">
            Go to login
          </Link>
          <Link href="/" className="button-secondary">
            Back to homepage
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
