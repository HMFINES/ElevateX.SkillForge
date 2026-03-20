"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, ShieldX } from "lucide-react";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function VerifyPage({ params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .verifyCertificate(params.certificateId)
      .then(setData)
      .catch((err) => setError(err.message));
  }, [params.certificateId]);

  return (
    <div className="shell pb-20">
      <div className="mx-auto max-w-3xl glass-card p-8 text-center">
        {data?.valid ? (
          <>
            <ShieldCheck className="mx-auto text-accent" size={48} />
            <h1 className="mt-5 font-display text-4xl font-semibold">
              Certificate verified
            </h1>
            <p className="mt-3 text-base text-muted">
              This certificate is valid and was issued by ElevateX.
            </p>
            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-surface/60 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">Student</div>
                <div className="mt-2 text-lg font-semibold">{data.studentName}</div>
              </div>
              <div className="rounded-3xl border border-line bg-surface/60 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">Course</div>
                <div className="mt-2 text-lg font-semibold">{data.courseName}</div>
              </div>
              <div className="rounded-3xl border border-line bg-surface/60 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">Issued</div>
                <div className="mt-2 text-lg font-semibold">{formatDate(data.issueDate)}</div>
              </div>
              <div className="rounded-3xl border border-line bg-surface/60 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">Certificate ID</div>
                <div className="mt-2 text-lg font-semibold">{data.certificateId}</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={api.assetUrl(data.certificateUrl)}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                Open Certificate PDF
              </a>
              <Link href="/verify" className="button-secondary">
                Verify Another Certificate
              </Link>
            </div>
          </>
        ) : (
          <>
            <ShieldX className="mx-auto text-rose-500" size={48} />
            <h1 className="mt-5 font-display text-4xl font-semibold">
              Certificate not found
            </h1>
            <p className="mt-3 text-base text-muted">
              {error || "This certificate ID is invalid or does not exist."}
            </p>
            <div className="mt-8">
              <Link href="/verify" className="button-secondary">
                Try Another Certificate ID
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
