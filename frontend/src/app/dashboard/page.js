"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function DashboardPage() {
  const { token, user, updateProfile } = useAuth();
  const [data, setData] = useState({ progress: [], certificates: [] });
  const [profileForm, setProfileForm] = useState({
    name: "",
    headline: "",
    bio: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    api
      .getDashboard(token)
      .then(setData)
      .catch(() => setData({ progress: [], certificates: [] }));
  }, [token]);

  useEffect(() => {
    if (!user) return;
    setProfileForm({
      name: user.name || "",
      headline: user.headline || "",
      bio: user.bio || "",
      avatar: user.avatar || "",
    });
  }, [user]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(profileForm);
    setMessage("Profile updated successfully.");
  };

  return (
    <AuthGuard>
      <div className="shell pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="glass-card p-8">
            <div className="eyebrow">Student Dashboard</div>
            <h1 className="mt-4 font-display text-4xl font-semibold">
              Welcome back, {user?.name?.split(" ")[0]}.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
              Your learning momentum, certificate readiness, and course progress live here.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Active courses", data.progress.length],
                [
                  "Completed tracks",
                  data.progress.filter((item) => item.completed).length,
                ],
                ["Certificates", data.certificates.length],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-line bg-surface/60 p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-muted">{label}</div>
                  <div className="mt-3 font-display text-4xl font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-8">
            <div className="text-xs uppercase tracking-[0.22em] text-muted">Profile</div>
            <form onSubmit={handleProfileSubmit} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="input"
                  placeholder="Full name"
                  value={profileForm.name}
                  onChange={(event) =>
                    setProfileForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
                <input
                  className="input"
                  value={user?.email || ""}
                  disabled
                  placeholder="Email"
                />
              </div>
              <input
                className="input"
                placeholder="Headline"
                value={profileForm.headline}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, headline: event.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Avatar URL"
                value={profileForm.avatar}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, avatar: event.target.value }))
                }
              />
              <textarea
                className="input min-h-28"
                placeholder="Short bio"
                value={profileForm.bio}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, bio: event.target.value }))
                }
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-muted">
                  Role: {user?.role} · Founder: Harshal Wakode
                </div>
                <button type="submit" className="button-primary">
                  Save Profile
                </button>
              </div>
            </form>
          </section>
        </div>

        {message ? <div className="mt-6 glass-card p-4 text-sm text-accent">{message}</div> : null}

        <section className="mt-8 glass-card p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-muted">Course Progress</div>
          <div className="mt-6 grid gap-4">
            {data.progress.length ? (
              data.progress.map((entry) => (
                <div key={entry._id} className="rounded-3xl border border-line bg-surface/60 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">
                        {entry.courseId?.title}
                      </h3>
                      <p className="text-sm text-muted">
                        {entry.completed ? "Completed" : "In progress"} ·{" "}
                        {entry.courseId?.category}
                      </p>
                    </div>
                    <div className="text-sm text-muted">{entry.progressPercent}%</div>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-line/60">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${entry.progressPercent}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-line bg-surface/30 p-6 text-sm text-muted">
                You have not enrolled in any courses yet.
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 glass-card p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-muted">Certificates</div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.certificates.length ? (
              data.certificates.map((certificate) => (
                <a
                  key={certificate._id}
                  href={api.assetUrl(certificate.certificateUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-line bg-surface/60 p-5 transition hover:-translate-y-0.5"
                >
                  <div className="font-display text-2xl font-semibold">
                    {certificate.courseId?.title}
                  </div>
                  <div className="mt-2 text-sm text-muted">
                    {certificate.certificateId}
                  </div>
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
                    Issued {formatDate(certificate.issuedDate)}
                  </div>
                </a>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-line bg-surface/30 p-6 text-sm text-muted">
                Complete a course to unlock your first certificate.
              </div>
            )}
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}
