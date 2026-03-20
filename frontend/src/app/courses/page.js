"use client";

import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/course/CourseCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { api } from "@/lib/api";

const categories = ["All", "AI", "Web Dev", "Business", "Freelancing"];

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.getCourses().then((response) => setCourses(response.courses || []));
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

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}
