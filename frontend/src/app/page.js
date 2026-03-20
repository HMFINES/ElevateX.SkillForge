"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  BrainCircuit,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { api } from "@/lib/api";
import CourseCard from "@/components/course/CourseCard";
import SectionHeading from "@/components/shared/SectionHeading";

const featureCards = [
  {
    title: "Structured internal learning",
    copy: "Build real skills through guided lessons, embedded videos, and trackable milestones.",
    icon: GraduationCap,
  },
  {
    title: "Affiliate course discovery",
    copy: "Curate external recommendations from Coursera, Udemy, and Internshala without losing context.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Progress that compounds",
    copy: "Every lesson completion updates your dashboard and unlocks a stronger sense of momentum.",
    icon: LayoutDashboard,
  },
  {
    title: "PDF certificate engine",
    copy: "Generate branded certificates with student name, issue date, signature, and verification identity.",
    icon: FileCheck2,
  },
];

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    api
      .getFeaturedCourses()
      .then((response) => setFeaturedCourses(response.courses || []))
      .catch(() => setFeaturedCourses([]));
  }, []);

  return (
    <div className="pb-20">
      <section className="shell">
        <div className="hero-gradient glass-card grid gap-10 overflow-hidden px-6 py-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-16">
          <div className="space-y-8">
            <div className="eyebrow">ElevateX by Harshal Wakode</div>
            <div className="space-y-5">
              <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                The EdTech system that turns learning into proof.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                ElevateX is a production-ready AI-powered learning platform where
                students watch courses, track progress, unlock certificates, and
                move from curiosity to concrete outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="button-primary">
                Start for Free <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link href="/courses" className="button-secondary">
                Explore Courses
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Internal + external", "Hybrid course engine"],
                ["Certificates", "PDF generation + verification"],
                ["Google + JWT", "Secure auth flows"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-3xl border border-line bg-surface/65 p-4">
                  <div className="font-display text-2xl font-semibold">{value}</div>
                  <div className="mt-1 text-sm text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card space-y-6 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    Student cockpit
                  </div>
                  <div className="mt-2 font-display text-3xl font-semibold">
                    Learn, progress, certify.
                  </div>
                </div>
                <BrainCircuit className="text-brand-500" size={30} />
              </div>
              <div className="space-y-4">
                {[
                  ["Skill path selected", "AI Foundations with Python", "82% confidence"],
                  ["Dashboard momentum", "4 lessons completed", "Certificate ready at 100%"],
                  ["Verification trust", "Public certificate lookup", "Secure and shareable"],
                ].map(([eyebrow, title, meta]) => (
                  <div key={title} className="rounded-3xl border border-line bg-surface/60 p-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-muted">
                      {eyebrow}
                    </div>
                    <div className="mt-2 text-lg font-semibold">{title}</div>
                    <div className="mt-1 text-sm text-muted">{meta}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: "Founder-led",
                  copy: "Harshal Wakode shapes the product around real learner outcomes.",
                  icon: ShieldCheck,
                },
                {
                  label: "Verification-ready",
                  copy: "Each certificate can be validated publicly by certificate ID.",
                  icon: BadgeCheck,
                },
              ].map((item) => (
                <div key={item.label} className="glass-card p-5">
                  <item.icon className="text-brand-500" size={24} />
                  <div className="mt-4 text-lg font-semibold">{item.label}</div>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-24">
        <SectionHeading
          eyebrow="Why ElevateX"
          title="A real startup-grade architecture for student growth."
          description="This platform is designed like a product company would build it: clean auth, structured learning, progress persistence, certificate verification, and admin control."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card p-6"
            >
              <card.icon className="text-brand-500" size={24} />
              <h3 className="mt-5 font-display text-2xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{card.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="shell mt-24">
        <SectionHeading
          eyebrow="Featured Courses"
          title="Launch with internal depth and external leverage."
          description="ElevateX supports both in-platform learning experiences and curated affiliate pathways."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>

      <section className="shell mt-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Auth system", "JWT-secured sessions with Google OAuth login support."],
            ["Progress engine", "Lesson completion updates the learner dashboard and certificate eligibility."],
            ["Certificate trust", "PDFKit-generated certificates with public verification route."],
          ].map(([title, copy]) => (
            <div key={title} className="glass-card p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-muted">Startup-grade layer</div>
              <div className="mt-3 font-display text-2xl font-semibold">{title}</div>
              <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
