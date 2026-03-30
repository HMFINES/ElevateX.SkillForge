"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Award, ExternalLink, LockKeyhole, PlayCircle } from "lucide-react";
import UpgradeButton from "@/components/billing/UpgradeButton";
import LessonChecklist from "@/components/course/LessonChecklist";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/format";

export default function CourseDetailPage({ params }) {
  const { token, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [access, setAccess] = useState({
    granted: true,
    requiresUpgrade: false,
    plan: "free",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const completedLessons = progress?.completedLessons || [];
  const isPremiumLocked = access?.requiresUpgrade;

  const loadCourse = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.getCourse(params.slug, token);
      setCourse(response.course);
      setProgress(response.progress);
      setAccess(
        response.access || {
          granted: true,
          requiresUpgrade: false,
          plan: response.course?.access || "free",
        }
      );
    } catch (err) {
      setCourse(null);
      setProgress(null);
      setError(err.message || "Could not load this course.");
    } finally {
      setLoading(false);
    }
  }, [params.slug, token]);

  useEffect(() => {
    loadCourse().catch(() => {});
  }, [loadCourse]);

  const handleEnroll = async () => {
    if (!course || !token) return;
    setMessage("");

    if (isPremiumLocked) {
      setMessage("Upgrade to Pro before enrolling in this premium course.");
      return;
    }

    try {
      const response = await api.enrollCourse(course._id, token);
      setProgress(response.progress);
      setMessage("Course added to your dashboard.");
    } catch (err) {
      setMessage(err.message || "Could not enroll right now.");
    }
  };

  const handleComplete = async (lessonId) => {
    if (!course || !token) return;
    setMessage("");

    if (isPremiumLocked) {
      setMessage("Upgrade to Pro before tracking lesson progress here.");
      return;
    }

    try {
      const response = await api.completeLesson(course._id, lessonId, token);
      setProgress(response.progress);
      setMessage("Lesson saved to your progress.");
    } catch (err) {
      setMessage(err.message || "Could not save lesson progress.");
    }
  };

  const handleGenerateCertificate = async () => {
    if (!course || !token) return;
    setMessage("");

    if (isPremiumLocked) {
      setMessage("Upgrade to Pro before generating the certificate for this course.");
      return;
    }

    if (course.isExternal) {
      setMessage("External courses do not issue ElevateX certificates.");
      return;
    }

    try {
      const response = await api.generateCertificate(course._id, token);
      setMessage(`Certificate issued: ${response.certificate.certificateId}`);
    } catch (err) {
      setMessage(err.message || "Could not generate the certificate.");
    }
  };

  if (loading) {
    return <div className="shell pb-20">Loading course...</div>;
  }

  if (!course) {
    return (
      <div className="shell pb-20">
        <div className="glass-card p-6 text-sm text-error">
          {error || "Course not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="shell pb-20">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="glass-card overflow-hidden">
            {course.isExternal ? (
              <div className="space-y-6 p-8">
                <div className="eyebrow">{course.provider}</div>
                <h1 className="font-display text-4xl font-semibold">{course.title}</h1>
                <p className="text-base leading-8 text-muted">{course.description}</p>
                <a
                  href={course.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary"
                >
                  Go to Course <ExternalLink className="ml-2" size={16} />
                </a>
              </div>
            ) : (
              <>
                {isPremiumLocked ? (
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-brand-500/16 via-surface/70 to-accent/12 p-8 text-center">
                    <div className="max-w-md space-y-4">
                      <div className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                        Pro course preview
                      </div>
                      <h2 className="font-display text-3xl font-semibold">
                        Unlock the full lesson videos and project systems.
                      </h2>
                      <p className="text-sm leading-7 text-muted">
                        This course is included in ElevateX Pro. Secure checkout activates the full media lessons, progress tracking, and certificate path.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video overflow-hidden">
                    <iframe
                      src={course.videoUrl}
                      title={course.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                <div className="space-y-5 p-8">
                  <div className="flex flex-wrap gap-2">
                    <span className="badge">{course.category}</span>
                    <span className="badge">{course.level}</span>
                    <span className="badge">{course.duration}</span>
                    {course.access === "pro" ? <span className="badge">Pro access</span> : null}
                  </div>
                  <div>
                    <h1 className="font-display text-4xl font-semibold">{course.title}</h1>
                    <p className="mt-3 text-base leading-8 text-muted">{course.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {!course.isExternal ? (
            <div className="glass-card p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted">Lessons</div>
                  <h2 className="mt-2 font-display text-3xl font-semibold">
                    {isPremiumLocked ? "Preview the premium module flow." : "Progress through every module."}
                  </h2>
                </div>
                {isPremiumLocked ? (
                  <div className="max-w-xs">
                    <UpgradeButton label="Unlock this Pro course" size="sm" className="w-full" />
                  </div>
                ) : !progress ? (
                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={!isAuthenticated}
                    className="button-primary"
                  >
                    Enroll <PlayCircle size={16} className="ml-2" />
                  </button>
                ) : null}
              </div>

              <div className="mt-6">
                {isPremiumLocked ? (
                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-brand-500/18 bg-brand-500/8 p-5">
                      <div className="flex items-start gap-3">
                        <LockKeyhole className="mt-1 text-brand-500" size={20} />
                        <div>
                          <div className="font-semibold">Pro upgrade required</div>
                          <p className="mt-2 text-sm leading-7 text-muted">
                            {access?.reason ||
                              "Upgrade your plan to unlock the full lesson videos, hands-on project assets, and certificate path."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <LessonChecklist
                      lessons={course.lessons || []}
                      completedLessons={completedLessons}
                      onComplete={() => {}}
                      locked
                    />
                  </div>
                ) : (
                  <LessonChecklist
                    lessons={course.lessons || []}
                    completedLessons={completedLessons}
                    onComplete={handleComplete}
                    locked={!isAuthenticated}
                  />
                )}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-muted">
              Course status
            </div>
            <div className="mt-4 font-display text-3xl font-semibold">
              {isPremiumLocked ? "Locked" : `${progress?.progressPercent || 0}% complete`}
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-line/60">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${isPremiumLocked ? 14 : progress?.progressPercent || 0}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              {isPremiumLocked
                ? "This track is part of ElevateX Pro and unlocks after secure checkout verification."
                : course.isExternal
                ? "External affiliate courses do not include ElevateX-issued certificates."
                : "Finish the internal course to unlock a verifiable PDF certificate."}
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-muted">
              Certificate
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Award className="mt-1 text-brand-500" size={22} />
              <div>
                <div className="font-semibold">Production-grade issuance flow</div>
                <p className="mt-2 text-sm leading-7 text-muted">
                  ElevateX issues downloadable PDF certificates signed by Harshal Wakode
                  and backed by public verification.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={handleGenerateCertificate}
                disabled={isPremiumLocked || course.isExternal || !progress?.completed || !isAuthenticated}
                className="button-primary w-full"
              >
                Generate Certificate
              </button>
              <Link href="/certificates" className="button-secondary w-full">
                View My Certificates <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            {progress?.completedAt ? (
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
                Completed on {formatDate(progress.completedAt)}
              </p>
            ) : null}
          </div>

          {message ? <div className="glass-card p-4 text-sm text-accent">{message}</div> : null}
        </aside>
      </div>
    </div>
  );
}
