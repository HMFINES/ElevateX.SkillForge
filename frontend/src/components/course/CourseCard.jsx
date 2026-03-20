import Link from "next/link";
import { ExternalLink, PlayCircle } from "lucide-react";
import clsx from "clsx";
import { formatCategoryColor } from "@/lib/format";

export default function CourseCard({ course }) {
  return (
    <article className="glass-card group flex h-full flex-col overflow-hidden">
      {course.thumbnail ? (
        <div className="relative h-52 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 to-transparent" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={clsx("badge bg-gradient-to-r", formatCategoryColor(course.category))}>
            {course.category}
          </span>
          <span className="badge">{course.isExternal ? course.provider : "Internal"}</span>
          {course.badgeText ? <span className="badge">{course.badgeText}</span> : null}
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold">{course.title}</h3>
          <p className="text-sm leading-7 text-muted">{course.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="space-y-1 text-sm text-muted">
            <div>{course.level || "Beginner"}</div>
            <div>{course.duration || "Flexible"}</div>
          </div>
          {course.isExternal ? (
            <a
              href={course.externalLink}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              Explore <ExternalLink size={16} className="ml-2" />
            </a>
          ) : (
            <Link href={`/courses/${course.slug}`} className="button-primary">
              Learn Now <PlayCircle size={16} className="ml-2" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
