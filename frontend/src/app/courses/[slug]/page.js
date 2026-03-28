"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Award, ExternalLink, PlayCircle } from "lucide-react";
import LessonChecklist from "@/components/course/LessonChecklist";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/format";

export default function CourseDetailPage({ params }) {
  const { token, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const completedLessons = progress?.completedLessons || [];

  const loadCourse = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.getCourse(params.slug, token);
      setCourse(response.course);
      setProgress(response.progress);
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
                <div className="aspect-video overflow-hidden">
                  <iframe
                    src={course.videoUrl}
                    title={course.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-5 p-8">
                  <div className="flex flex-wrap gap-2">
                    <span className="badge">{course.category}</span>
                    <span className="badge">{course.level}</span>
                    <span className="badge">{course.duration}</span>
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
                    Progress through every module.
                  </h2>
                </div>
                {!progress ? (
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
                <LessonChecklist
                  lessons={course.lessons || []}
                  completedLessons={completedLessons}
                  onComplete={handleComplete}
                  locked={!isAuthenticated}
                />
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
              {progress?.progressPercent || 0}% complete
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-line/60">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${progress?.progressPercent || 0}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              {course.isExternal
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
                disabled={course.isExternal || !progress?.completed || !isAuthenticated}
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
