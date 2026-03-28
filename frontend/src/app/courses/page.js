"use client";

import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/course/CourseCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { api } from "@/lib/api";
import Skeleton from "@/design-system/Skeleton";

const categories = ["All", "AI", "Web Dev", "Business", "Freelancing"];

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    api
      .getCourses()
      .then((response) => {
        if (!isActive) return;
        setCourses(response.courses || []);
      })
      .catch((err) => {
        if (!isActive) return;
        setError(err.message || "Could not load courses right now.");
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All" ? true : course.category === activeCategory;
      const matchesSearch =
        !search ||
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, courses, search]);

  return (
    <div className="shell pb-20">
      <SectionHeading
        eyebrow="Course System"
        title="Courses designed for outcomes, not content clutter."
        description="Explore ElevateX internal learning experiences plus curated external recommendations from platforms students already trust."
      />

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-brand-500 text-white"
                  : "border border-line bg-surface/70 text-muted hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or description"
          className="input max-w-md"
        />
      </div>

      {error ? <div className="mt-8 glass-card p-4 text-sm text-error">{error}</div> : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass-card overflow-hidden p-0">
                <Skeleton className="h-52 w-full rounded-none" />
                <div className="space-y-4 p-6">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-8 w-4/5" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))
          : filteredCourses.map((course) => <CourseCard key={course._id} course={course} />)}
      </div>

      {!loading && !error && filteredCourses.length === 0 ? (
        <div className="mt-8 glass-card p-6 text-sm text-muted">
          No courses matched your current filters.
        </div>
      ) : null}
    </div>
  );
}
