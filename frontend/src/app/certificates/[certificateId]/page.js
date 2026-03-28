"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function CertificateDetailPage({ params }) {
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    api
      .getCertificate(params.certificateId)
      .then((response) => {
        if (!isActive) return;
        setCertificate(response.certificate);
      })
      .catch((err) => {
        if (!isActive) return;
        setError(err.message || "Could not load this certificate.");
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [params.certificateId]);

  if (loading) {
    return <div className="shell pb-20">Loading certificate...</div>;
  }

  if (!certificate) {
    return (
      <div className="shell pb-20">
        <div className="glass-card p-6 text-sm text-error">
          {error || "Certificate not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="shell pb-20">
      <div className="glass-card p-8">
        <div className="eyebrow">Certificate Detail</div>
        <h1 className="mt-4 font-display text-4xl font-semibold">
          {certificate.courseId?.title}
        </h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-surface/60 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-muted">Student</div>
            <div className="mt-2 text-lg font-semibold">{certificate.userId?.name}</div>
          </div>
          <div className="rounded-3xl border border-line bg-surface/60 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-muted">Issued</div>
            <div className="mt-2 text-lg font-semibold">{formatDate(certificate.issuedDate)}</div>
          </div>
        </div>
        <a
          href={api.assetUrl(certificate.certificateUrl)}
          target="_blank"
          rel="noreferrer"
          className="button-primary mt-6"
        >
          Open Certificate PDF
        </a>
      </div>
    </div>
  );
}
