"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import Skeleton from "@/design-system/Skeleton";

export default function CertificatesPage() {
  const { token } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    let isActive = true;
    setLoading(true);
    setError("");

    api
      .getCertificates(token)
      .then((response) => {
        if (!isActive) return;
        setCertificates(response.certificates || []);
      })
      .catch((err) => {
        if (!isActive) return;
        setError(err.message || "Could not load certificates right now.");
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [token]);

  return (
    <AuthGuard>
      <div className="shell pb-20">
        <div className="section-copy">
          <div className="eyebrow">Certificate Center</div>
          <h1 className="font-display text-5xl font-semibold tracking-tight">
            Download and verify your achievements.
          </h1>
          <p className="text-base leading-8 text-muted">
            Every ElevateX certificate is generated as a PDF, stored securely, and
            publicly verifiable with a unique certificate ID.
          </p>
        </div>

        {error ? <div className="mt-8 glass-card p-4 text-sm text-error">{error}</div> : null}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="glass-card space-y-4 p-6">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-9 w-4/5" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-32" />
                </div>
              ))
            : certificates.map((certificate) => (
                <div key={certificate._id} className="glass-card p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">
                    {certificate.certificateId}
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-semibold">
                    {certificate.courseId?.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Issued on {formatDate(certificate.issuedDate)}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={api.assetUrl(certificate.certificateUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary"
                    >
                      Download PDF
                    </a>
                    <a
                      href={`/verify/${certificate.certificateId}`}
                      className="button-secondary"
                    >
                      Verify Publicly
                    </a>
                  </div>
                </div>
              ))}
        </div>

        {!loading && !error && certificates.length === 0 ? (
          <div className="mt-8 glass-card p-6 text-sm text-muted">
            No certificates have been issued to this account yet.
          </div>
        ) : null}
      </div>
    </AuthGuard>
  );
}
