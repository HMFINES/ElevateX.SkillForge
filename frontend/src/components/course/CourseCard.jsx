import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ExternalLink, Timer } from "lucide-react";
import clsx from "clsx";
import { formatCategoryColor } from "@/lib/format";
import {
  canOptimizeExternalImage,
  passthroughImageLoader,
} from "@/lib/imageLoader";
import Card from "@/design-system/Card";
import Badge from "@/design-system/Badge";
import { buttonStyles } from "@/design-system/Button";

export default function CourseCard({ course }) {
  return (
    <Card as="article" hover className="group flex h-full flex-col overflow-hidden p-0">
      {course.thumbnail ? (
        <div className="relative h-52 overflow-hidden">
          <Image
            loader={passthroughImageLoader}
            unoptimized={!canOptimizeExternalImage(course.thumbnail)}
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="flex h-52 items-end bg-gradient-to-br from-brand-500/18 via-surface/80 to-accent/10 p-6">
          <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">
            {course.category}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={clsx("badge bg-gradient-to-r", formatCategoryColor(course.category))}>
            {course.category}
          </span>
          <Badge>{course.level || "Beginner"}</Badge>
          <Badge variant={course.isExternal ? "warning" : "success"}>
            {course.isExternal ? course.provider : "Certificate Ready"}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold">{course.title}</h3>
          <p className="text-sm leading-7 text-muted">{course.description}</p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <div className="inline-flex items-center gap-2">
              <Timer size={15} />
              {course.duration || "Flexible"}
            </div>
            <div className="inline-flex items-center gap-2">
              <BadgeCheck size={15} className="text-accent" />
              {course.badgeText || (course.isExternal ? "External track" : "Verifiable certificate")}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-muted">{course.isExternal ? "External pathway" : "Structured internal track"}</div>
            {course.isExternal ? (
              <a
                href={course.externalLink}
                target="_blank"
                rel="noreferrer"
                className={buttonStyles({ variant: "secondary", size: "sm" })}
              >
                Explore <ExternalLink size={16} className="ml-2" />
              </a>
            ) : (
              <Link href={`/courses/${course.slug}`} className={buttonStyles({ size: "sm" })}>
                Learn now <ArrowRight size={16} className="ml-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
