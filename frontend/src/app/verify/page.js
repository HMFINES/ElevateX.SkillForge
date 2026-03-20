"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";

export default function VerifyLandingPage() {
  const router = useRouter();
  const [certificateId, setCertificateId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCertificateId = certificateId.trim();
    if (!trimmedCertificateId) {
      return;
    }

    router.push(`/verify/${encodeURIComponent(trimmedCertificateId)}`);
  };

  return (
    <div className="shell pb-20">
      <div className="mx-auto max-w-4xl glass-card grid gap-8 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
        <div className="space-y-5">
          <div className="eyebrow">Public Verification</div>
          <h1 className="font-display text-5xl font-semibold tracking-tight">
            Validate any ElevateX certificate in seconds.
          </h1>
          <p className="text-base leading-8 text-muted">
            Enter the certificate ID to confirm whether the document was issued by
            ElevateX for a real learner and course.
          </p>
          <div className="rounded-3xl border border-line bg-surface/60 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 text-accent" size={22} />
              <div>
                <div className="font-semibold">Trust layer for employers and students</div>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Every generated PDF includes a unique ID like
                  {" "}
                  <span className="font-medium text-ink">ELX-1710922800000-ABC123</span>
                  {" "}
                  and can be checked against the platform database.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[28px] border border-line bg-surface/70 p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-muted">Check certificate</div>
          <h2 className="mt-3 font-display text-3xl font-semibold">
            Enter certificate ID
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            Use the exact certificate code printed on the PDF.
          </p>
          <div className="mt-6 space-y-4">
            <input
              className="input"
              placeholder="ELX-1710922800000-ABC123"
              value={certificateId}
              onChange={(event) => setCertificateId(event.target.value)}
            />
            <button type="submit" className="button-primary w-full">
              Verify Certificate <Search size={16} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
