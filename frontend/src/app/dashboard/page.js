"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  Clock3,
  FileBadge2,
  Flame,
  LayoutDashboard,
  Rocket,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import UpgradeButton from "@/components/billing/UpgradeButton";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import Card from "@/design-system/Card";
import Button, { buttonStyles } from "@/design-system/Button";
import ProgressBar from "@/design-system/ProgressBar";
import StatWidget from "@/design-system/StatWidget";
import Badge from "@/design-system/Badge";
import Avatar from "@/design-system/Avatar";
import InputField from "@/design-system/InputField";
import Skeleton from "@/design-system/Skeleton";

export default function DashboardPage() {
  const { token, user, updateProfile } = useAuth();
  const [data, setData] = useState({ progress: [], certificates: [] });
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [profileForm, setProfileForm] = useState({
    name: "",
    headline: "",
    bio: "",
    avatar: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    Promise.allSettled([api.getDashboard(token), api.getFeaturedCourses()])
      .then(([dashboardResult, featuredResult]) => {
        const dashboard =
          dashboardResult.status === "fulfilled"
            ? dashboardResult.value
            : { progress: [], certificates: [] };
        const featured =
          featuredResult.status === "fulfilled"
            ? featuredResult.value.courses || []
            : [];

        setData({
          progress: dashboard.progress || [],
          certificates: dashboard.certificates || [],
        });
        setFeaturedCourses(featured);
      })
      .finally(() => setLoading(false));
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

  const lessonsCompleted = useMemo(
    () =>
      data.progress.reduce(
        (sum, item) => sum + (Array.isArray(item.completedLessons) ? item.completedLessons.length : 0),
        0
      ),
    [data.progress]
  );

  const derivedXp = user?.xp || lessonsCompleted * 120;
  const derivedStreak =
    user?.streak ||
    (lessonsCompleted ? Math.min(14, Math.max(3, data.progress.length * 2)) : 0);

  const activeTracks = data.progress.filter((item) => !item.completed);
  const latestTrack = activeTracks[0] || data.progress[0] || null;
  const nextMilestone = useMemo(() => {
    if (!latestTrack?.courseId?.lessons?.length) {
      return "Explore a track and start your first learning sprint.";
    }

    const remainingLessons =
      latestTrack.courseId.lessons.length - (latestTrack.completedLessons?.length || 0);

    return remainingLessons > 0
      ? `${remainingLessons} lessons left before your next proof milestone.`
      : "You are ready to generate your certificate.";
  }, [latestTrack]);

  const recommendations = useMemo(() => {
    const activeIds = new Set(data.progress.map((item) => item.courseId?._id));
    return featuredCourses.filter((course) => !activeIds.has(course._id)).slice(0, 3);
  }, [data.progress, featuredCourses]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileSaving(true);
    setMessage("");

    try {
      await updateProfile(profileForm);
      setMessage("Profile updated successfully.");
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <AuthGuard>
      <div className="shell pb-20">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card
            padding="lg"
            className="relative overflow-hidden bg-gradient-to-br from-brand-500/14 via-surface/92 to-accent/10"
          >
            <div className="absolute inset-0 noise-mask opacity-50" />
            <div className="relative z-10 space-y-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">Student dashboard</div>
                  <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    Welcome back, {user?.name?.split(" ")[0] || "learner"}.
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
                    Your path, proof, progress, certificates, and next-best actions
                    live here.
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-full border border-line bg-surface/76 px-3 py-2">
                  <Avatar
                    src={user?.avatar}
                    fallback={user?.name?.slice(0, 2)?.toUpperCase() || "SF"}
                  />
                  <div>
                    <div className="text-sm font-semibold">{user?.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
                      {user?.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatWidget
                  label="Focus streak"
                  value={`${derivedStreak}d`}
                  icon={Flame}
                  trend={derivedStreak ? "Momentum is active" : "Start your first learning streak"}
                />
                <StatWidget
                  label="XP points"
                  value={derivedXp}
                  icon={Rocket}
                  hint="Derived from lessons completed and visible progress."
                />
                <StatWidget
                  label="Next milestone"
                  value={latestTrack?.completed ? "Certificate" : "Progress"}
                  icon={BadgeCheck}
                  hint={nextMilestone}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/courses" className={buttonStyles({ size: "sm" })}>
                  Resume course <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link
                  href="/certificates"
                  className={buttonStyles({ variant: "secondary", size: "sm" })}
                >
                  View certificates
                </Link>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  AI guidance
                </div>
                <div className="mt-2 font-display text-3xl font-semibold">
                  Next best action
                </div>
              </div>
              <Bot className="text-brand-500" />
            </div>

            <div className="rounded-[26px] border border-brand-500/18 bg-brand-500/8 p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-muted">
                Current nudge
              </div>
              <div className="mt-3 text-xl font-semibold">
                {latestTrack?.courseId?.title
                  ? `Keep pushing ${latestTrack.courseId.title}.`
                  : "Pick one live track and commit to it this week."}
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">
                {nextMilestone}
              </p>
            </div>

            <div className="grid gap-3">
              {[
                ["Continue where you left off", latestTrack?.courseId?.title || "No active track yet"],
                ["Proof to unlock next", latestTrack?.completed ? "Generate your certificate" : "Finish one more proof checkpoint"],
                ["Career system action", "Open courses or update your profile headline"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[22px] border border-line bg-surface/70 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">{label}</div>
                  <div className="mt-2 text-sm font-medium">{value}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg" className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  Billing plan
                </div>
                <div className="mt-2 font-display text-3xl font-semibold">
                  {user?.plan === "pro" && user?.planStatus === "active"
                    ? "Pro is active"
                    : "Free starter"}
                </div>
              </div>
              <Badge variant={user?.plan === "pro" && user?.planStatus === "active" ? "success" : "info"}>
                {user?.plan === "pro" && user?.planStatus === "active" ? "Premium access" : "Upgrade available"}
              </Badge>
            </div>

            <p className="text-sm leading-7 text-muted">
              {user?.plan === "pro" && user?.planStatus === "active"
                ? "Your account can open premium labs, gated internal tracks, and higher-value proof-of-work systems."
                : "Upgrade once to unlock premium labs, pro-only courses, and stronger guided execution flows."}
            </p>

            {user?.plan === "pro" && user?.planStatus === "active" ? (
              <div className="rounded-[22px] border border-brand-500/18 bg-brand-500/8 p-4 text-sm text-muted">
                {user?.proAccessGrantedAt
                  ? `Pro access activated on ${formatDate(user.proAccessGrantedAt)}.`
                  : "Pro access is attached to your account."}
              </div>
            ) : (
              <UpgradeButton label="Unlock Pro access" className="w-full" />
            )}
          </Card>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <Card padding="lg" className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                Profile + quick links
              </div>
              <LayoutDashboard className="text-brand-500" size={18} />
            </div>

            <div className="grid gap-3">
              {[
                { href: "/courses", label: "Courses", copy: "Browse tracks and continue learning." },
                { href: "/certificates", label: "Certificates", copy: "Download and share certificate proofs." },
                { href: "/verify", label: "Verify", copy: "Open the public verification route." },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[22px] border border-line bg-surface/72 p-4 transition hover:border-brand-500/20"
                >
                  <div className="font-semibold">{link.label}</div>
                  <div className="mt-1 text-sm text-muted">{link.copy}</div>
                </Link>
              ))}
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <InputField
                label="Full name"
                value={profileForm.name}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              <InputField
                label="Headline"
                placeholder="Frontend learner building proof-of-work"
                value={profileForm.headline}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, headline: event.target.value }))
                }
              />
              <InputField
                label="Bio"
                textarea
                placeholder="Tell recruiters and collaborators what you're working toward."
                value={profileForm.bio}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, bio: event.target.value }))
                }
              />
              <InputField
                label="Avatar URL"
                placeholder="https://..."
                value={profileForm.avatar}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, avatar: event.target.value }))
                }
              />
              <Button type="submit" variant="secondary" className="w-full" disabled={profileSaving}>
                {profileSaving ? "Saving..." : "Save profile"}
              </Button>
              {message ? <p className="text-sm text-success">{message}</p> : null}
            </form>
          </Card>

          <div className="space-y-6">
            <Card padding="lg">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    Progress overview
                  </div>
                  <div className="mt-2 font-display text-3xl font-semibold">
                    Continue where you left off
                  </div>
                </div>
                <Badge variant="info">{activeTracks.length} active</Badge>
              </div>

              <div className="mt-6 grid gap-4">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-3 rounded-[24px] border border-line p-5">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-2.5 w-full" />
                    </div>
                  ))
                ) : data.progress.length ? (
                  data.progress.map((entry) => (
                    <div
                      key={entry._id}
                      className="rounded-[24px] border border-line bg-surface/70 p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="font-display text-2xl font-semibold">
                            {entry.courseId?.title}
                          </div>
                          <div className="mt-1 text-sm text-muted">
                            {entry.completed ? "Completed" : "In progress"} ·{" "}
                            {entry.courseId?.category}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-muted">
                          {entry.progressPercent}%
                        </div>
                      </div>
                      <div className="mt-4">
                        <ProgressBar value={entry.progressPercent} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-line bg-surface/30 p-6 text-sm text-muted">
                    You have not enrolled in any tracks yet. Start with a live course
                    and ElevateX will begin tracking your progress here.
                  </div>
                )}
              </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <Card padding="lg" className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                      Certificates earned
                    </div>
                    <div className="mt-2 font-display text-3xl font-semibold">
                      Trust you can share
                    </div>
                  </div>
                  <FileBadge2 className="text-accent" />
                </div>
                <div className="grid gap-4">
                  {loading ? (
                    Array.from({ length: 2 }).map((_, index) => (
                      <Card key={index} padding="md" className="space-y-3">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </Card>
                    ))
                  ) : data.certificates.length ? (
                    data.certificates.map((certificate) => (
                      <a
                        key={certificate._id}
                        href={api.assetUrl(certificate.certificateUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-[24px] border border-line bg-surface/70 p-5 transition hover:border-brand-500/20"
                      >
                        <div className="text-xs uppercase tracking-[0.22em] text-muted">
                          {certificate.certificateId}
                        </div>
                        <div className="mt-2 text-lg font-semibold">
                          {certificate.courseId?.title}
                        </div>
                        <div className="mt-2 text-sm text-muted">
                          Issued {formatDate(certificate.issuedDate)}
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="rounded-[24px] border border-dashed border-line bg-surface/30 p-6 text-sm text-muted">
                      Complete one internal course to unlock your first certificate.
                    </div>
                  )}
                </div>
              </Card>

              <Card padding="lg" className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                      Recommended next
                    </div>
                    <div className="mt-2 font-display text-3xl font-semibold">
                      Keep momentum going
                    </div>
                  </div>
                  <BookOpenCheck className="text-brand-500" />
                </div>
                <div className="grid gap-4">
                  {(recommendations.length ? recommendations : featuredCourses.slice(0, 3)).map(
                    (course) => (
                      <div
                        key={course._id}
                        className="rounded-[24px] border border-line bg-surface/70 p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold">{course.title}</div>
                        <div className="mt-1 text-sm text-muted">
                          {course.category} · {course.duration || "Flexible"}
                        </div>
                      </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge>{course.level || "Beginner"}</Badge>
                            {course.access === "pro" ? <Badge variant="warning">Pro</Badge> : null}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {course.description}
                        </p>
                      </div>
                    )
                  )}
                  {!featuredCourses.length && !loading ? (
                    <div className="rounded-[24px] border border-dashed border-line bg-surface/30 p-6 text-sm text-muted">
                      Recommendations will appear once more courses are available.
                    </div>
                  ) : null}
                </div>
              </Card>
            </div>

            <Card padding="lg">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    label: "Lessons completed",
                    value: lessonsCompleted,
                    icon: BookOpenCheck,
                  },
                  {
                    label: "Certificates earned",
                    value: data.certificates.length,
                    icon: BadgeCheck,
                  },
                  {
                    label: "Latest activity",
                    value: latestTrack?.updatedAt ? formatDate(latestTrack.updatedAt) : "Today",
                    icon: Clock3,
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-line bg-surface/70 p-5">
                    <div className="flex items-center gap-3 text-muted">
                      <item.icon size={18} />
                      <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                        {item.label}
                      </span>
                    </div>
                    <div className="mt-4 font-display text-3xl font-semibold">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
