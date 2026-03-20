"use client";

import { CheckCircle2, Circle } from "lucide-react";

export default function LessonChecklist({
  lessons,
  completedLessons,
  onComplete,
  locked,
}) {
  return (
    <div className="space-y-3">
      {lessons.map((lesson) => {
        const done = completedLessons.includes(lesson.lessonId);

        return (
          <div
            key={lesson.lessonId}
            className="flex items-start justify-between gap-4 rounded-3xl border border-line bg-surface/60 p-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {done ? (
                  <CheckCircle2 size={18} className="text-accent" />
                ) : (
                  <Circle size={18} className="text-muted" />
                )}
                {lesson.title}
              </div>
              <p className="text-sm text-muted">{lesson.description}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {lesson.duration || "Lesson"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onComplete(lesson.lessonId)}
              disabled={locked || done}
              className="button-secondary min-w-[146px]"
            >
              {done ? "Completed" : "Mark Complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
