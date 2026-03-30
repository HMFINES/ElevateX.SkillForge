"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  FileCheck2,
  Filter,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Mail,
  MoveRight,
  Radar,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { api } from "@/lib/api";
import UpgradeButton from "@/components/billing/UpgradeButton";
import CourseCard from "@/components/course/CourseCard";
import SectionHeading from "@/components/shared/SectionHeading";
import Card from "@/design-system/Card";
import Badge from "@/design-system/Badge";
import Skeleton from "@/design-system/Skeleton";
import { buttonStyles } from "@/design-system/Button";
import { fadeUp } from "@/design-system/motion";

const fallbackTracks = [
  {
    _id: "frontend-workflows",
    title: "Frontend + AI Workflows",
    description:
      "Learn modern frontend foundations, ship recruiter-grade projects, and layer AI-assisted workflows into your portfolio.",
    category: "Web Dev",
    level: "Beginner",
    duration: "8 weeks",
    isExternal: false,
    slug: "frontend-ai-workflows",
    badgeText: "Certificate Ready",
  },
  {
    _id: "ai-foundations",
    title: "AI Foundations with Python",
    description:
      "Start with Python, structured learning, and applied AI concepts that connect directly to proof-of-work.",
    category: "AI",
    level: "Beginner",
    duration: "10 weeks",
    isExternal: false,
    slug: "ai-foundations-with-python",
    badgeText: "Certificate Ready",
  },
  {
    _id: "career-launch",
    title: "Career Launch Sprint",
    description:
      "Turn your learning into a tighter resume, visible projects, and a more credible job-ready profile.",
    category: "Career",
    level: "Intermediate",
    duration: "4 weeks",
    isExternal: false,
    slug: "career-launch-sprint",
    badgeText: "Portfolio Sprint",
  },
];

const featureCards = [
  {
    eyebrow: "Premium UI",
    title: "Modern glassmorphism theme",
    copy: "Blue-to-purple gradients, neon CTAs, and clean depth give the platform a premium first impression without feeling cluttered.",
    icon: Sparkles,
  },
  {
    eyebrow: "Student-first UX",
    title: "Clear path from landing to signup",
    copy: "Every section is designed to explain the value quickly and move students toward courses, certificates, and account creation.",
    icon: GraduationCap,
  },
  {
    eyebrow: "Trust layer",
    title: "Proof, progress, and verification",
    copy: "Projects, testimonials, public certificate IDs, and progress visibility help the product feel credible from the first visit.",
    icon: ShieldCheck,
  },
  {
    eyebrow: "Performance",
    title: "Responsive and fast-feeling",
    copy: "The layout is mobile-first, lighter to scan, and structured to keep users engaged across phones, tablets, and desktops.",
    icon: Smartphone,
  },
];

const smartPanels = [
  {
    title: "AI chatbot integration",
    copy: "A guided assistant can recommend the next lesson, answer platform questions, and push learners back into action.",
    icon: Bot,
  },
  {
    title: "Course progress tracker",
    copy: "Visible milestones and proof checkpoints make the dashboard feel like a real growth system instead of a static profile page.",
    icon: Radar,
  },
  {
    title: "Certificate generator preview",
    copy: "Students can see how achievements become verifiable certificates with shareable credibility built in.",
    icon: FileCheck2,
  },
  {
    title: "Login and signup flow",
    copy: "Smooth onboarding, clear auth screens, and an account-first experience support conversions without overwhelming new users.",
    icon: LockKeyhole,
  },
];

const testimonials = [
  {
    quote:
      "The new look feels like a serious product. I understood the value in seconds and wanted to explore the courses immediately.",
    name: "Ananya",
    role: "Final-year CS student",
    outcome: "Joined after seeing the dashboard and certificate flow",
  },
  {
    quote:
      "I liked that it focused on projects and placement readiness, not just videos. That made the platform feel much more practical.",
    name: "Rohit",
    role: "Frontend learner",
    outcome: "Used the roadmap to build a stronger portfolio story",
  },
  {
    quote:
      "The trust section and testimonials made a big difference. It felt modern, clean, and genuinely built for ambitious students.",
    name: "Priya",
    role: "Career switcher",
    outcome: "Signed up to explore the AI-guided path recommendations",
  },
];

const trustCards = [
  {
    title: "Verifiable certificates",
    copy: "Every certificate can be checked publicly with a real ID, which builds more trust than a simple image download.",
    icon: FileCheck2,
  },
  {
    title: "Founder-led quality",
    copy: "The platform direction is product-focused and outcome-driven, with a strong emphasis on student growth and placement readiness.",
    icon: BadgeCheck,
  },
  {
    title: "Built for modern learners",
    copy: "From the design system to the content hierarchy, the site is shaped around today's students, beginners, and career-builders.",
    icon: BriefcaseBusiness,
  },
];

const founderPoints = [
  "Founder-led by Harshal Wakode",
  "AI Engineer and AI Automation Specialist",
  "Focused on students, skill-building, and career acceleration",
  "Building a modern EdTech platform with trust, clarity, and proof-of-work",
];

const pricingPlans = [
  {
    name: "Free Starter",
    price: "0",
    badge: "Best to begin",
    copy: "Perfect for new students who want to explore tracks, learn the basics, and start building momentum.",
    features: [
      "Access to selected free learning tracks",
      "Dashboard preview and progress tracking",
      "Basic certificate eligibility",
      "Email support",
    ],
    cta: "Start Free",
    kind: "link",
    href: "/auth/signup",
    highlight: false,
  },
  {
    name: "Pro Launch",
    price: "999",
    badge: "Most Popular",
    copy: "Designed for serious learners who want deeper guidance, stronger proof-of-work, and faster job-ready execution.",
    features: [
      "Full access to premium tracks",
      "Premium automation and project labs",
      "Priority certificate generation workflow",
      "Placement-focused support and mentorship-ready structure",
    ],
    cta: "Join Pro",
    kind: "upgrade",
    highlight: true,
  },
];

const faqItems = [
  {
    question: "Is ElevateX built only for advanced students?",
    answer:
      "No. The platform is designed for beginners, students, and early-career learners who want a clearer skill-building path and stronger placement outcomes.",
  },
  {
    question: "Will learners be able to track progress and certificates?",
    answer:
      "Yes. The redesign keeps progress tracking, dashboard visibility, and certificate trust as core parts of the product experience.",
  },
  {
    question: "Can the site support both free and paid courses?",
    answer:
      "Yes. The pricing and course sections are designed to support a free entry point with room for premium or mentorship-backed offerings later.",
  },
  {
    question: "Is the new theme responsive across devices?",
    answer:
      "Yes. The layout is built mobile-first and designed to stay usable and visually strong on phones, tablets, and desktop screens.",
  },
];

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    Promise.allSettled([api.getFeaturedCourses(), api.getCourses()])
      .then(([featuredResult, coursesResult]) => {
        const featured =
          featuredResult.status === "fulfilled"
            ? featuredResult.value.courses || []
            : [];
        const courses =
          coursesResult.status === "fulfilled"
            ? coursesResult.value.courses || []
            : [];

        setFeaturedCourses(featured);
        setAllCourses(courses);
      })
      .finally(() => setLoading(false));
  }, []);

  const trackPreview = useMemo(() => {
    if (featuredCourses.length) return featuredCourses;
    if (allCourses.length) return allCourses.slice(0, 6);
    return fallbackTracks;
  }, [allCourses, featuredCourses]);

  const categories = useMemo(
    () => ["All", ...new Set(trackPreview.map((course) => course.category || "General"))],
    [trackPreview]
  );

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [activeCategory, categories]);

  const filteredTracks = useMemo(() => {
    if (activeCategory === "All") return trackPreview;
    return trackPreview.filter((course) => course.category === activeCategory);
  }, [activeCategory, trackPreview]);

  const metrics = useMemo(() => {
    const source = allCourses.length ? allCourses : trackPreview;
    const certificatePaths = source.filter((course) => !course.isExternal).length;
    const partnerPlatforms = new Set(
      source.map((course) => course.provider).filter(Boolean)
    ).size;

    return [
      { label: "Live tracks", value: `${source.length}+` },
      { label: "Certificate-ready paths", value: `${certificatePaths || 1}+` },
      { label: "Partner platforms", value: `${partnerPlatforms || 3}+` },
      { label: "Student-first experience", value: "Mobile" },
    ];
  }, [allCourses, trackPreview]);

  return (
    <div className="pb-24">
      <section className="shell pt-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-gradient section-panel relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12 lg:py-16"
        >
          <div className="absolute inset-0 noise-mask opacity-60" />
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-brand-500/18 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/16 blur-3xl" />

          <div className="relative z-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] xl:gap-10">
            <div className="space-y-8">
              <div className="eyebrow">ElevateX 2.0</div>
              <div className="space-y-5">
                <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[0.94] tracking-tight sm:text-6xl xl:text-[5rem]">
                  Upgrade your skills and get placement-ready with a premium AI-powered learning experience.
                </h1>
                <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
                  ElevateX is built for students, beginners, and learners who want
                  clearer direction, better courses, stronger proof-of-work,
                  verifiable certificates, and a smoother path toward real
                  opportunities.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/auth/signup" className={buttonStyles({ size: "lg" })}>
                  Join Now <ArrowRight size={16} className="ml-2" />
                </Link>
                <a
                  href="#courses"
                  className={buttonStyles({ variant: "secondary", size: "lg" })}
                >
                  Explore Courses
                </a>
                <a
                  href="#about"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  Meet the Founder
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="info">Blue to purple futuristic theme</Badge>
                <Badge variant="success">Dark and light mode ready</Badge>
                <Badge>Razorpay-ready billing</Badge>
                <Badge>Progress + certificates</Badge>
              </div>

              <div className="grid max-w-xl gap-3 sm:grid-cols-2">
                {metrics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-white/8 p-4"
                  >
                    <div className="font-display text-3xl font-semibold">
                      {item.value}
                    </div>
                    <div className="mt-1 text-sm text-muted">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <Card
                padding="lg"
                className="relative overflow-hidden bg-[#0b1024]/94 text-white"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(81,105,255,.26),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(165,104,255,.18),transparent_30%)]" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Student dashboard preview
                      </div>
                      <div className="mt-2 font-display text-3xl font-semibold">
                        Track, build, and level up.
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400">
                      <Layers3 size={22} />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {[
                      ["Active path", "Frontend + AI Workflows", "Milestone 3 unlocks the case-study template."],
                      ["Certificate status", "Ready after final checkpoint", "Public verification and PDF export are part of the trust layer."],
                      ["Placement signal", "Resume bullets auto-suggested", "Translate learning into outcome-focused proof faster."],
                    ].map(([eyebrow, title, copy]) => (
                      <div
                        key={title}
                        className="rounded-[24px] border border-white/10 bg-white/6 p-4"
                      >
                        <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          {eyebrow}
                        </div>
                        <div className="mt-2 text-lg font-semibold">{title}</div>
                        <div className="mt-1 text-sm leading-7 text-slate-300">{copy}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card padding="md" className="bg-surface/72">
                  <Badge variant="info">AI chatbot</Badge>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[18px] bg-brand-500/10 px-4 py-3 text-sm text-ink">
                      What should I build after finishing this track?
                    </div>
                    <div className="rounded-[18px] bg-accent/12 px-4 py-3 text-sm text-ink">
                      Start with a dashboard capstone, then polish your proof page.
                    </div>
                  </div>
                </Card>
                <Card padding="md" className="bg-surface/72">
                  <Badge variant="success">Progress tracker</Badge>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Responsive UI sprint", "82%"],
                      ["Project case study", "64%"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="flex items-center justify-between text-sm">
                          <span>{label}</span>
                          <span className="text-muted">{value}</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-line/60">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,rgba(var(--brand),1),rgba(var(--accent),1))]"
                            style={{ width: value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="shell mt-24">
        <SectionHeading
          eyebrow="Why choose us"
          title="A modern EdTech experience should feel premium, clear, and conversion-ready."
          description="This redesign focuses on the things that make students stay: fast clarity, attractive UI, strong trust signals, and a smoother path into signup."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
            >
              <Card padding="lg" className="h-full">
                <div className="flex items-center justify-between">
                  <Badge variant="info">{card.eyebrow}</Badge>
                  <card.icon className="text-brand-500" size={22} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{card.copy}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="shell mt-24">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <Card padding="lg" className="aurora-card space-y-6">
            <Badge variant="info">Advanced features</Badge>
            <h2 className="font-display text-4xl font-semibold tracking-tight">
              Smart features that make the platform feel next-level.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-muted">
              The experience is designed to feel modern and useful, not noisy.
              That means dashboard previews, AI guidance, progress visibility,
              certificate trust, and clean account flows working together.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {smartPanels.map((panel) => (
                <div
                  key={panel.title}
                  className="rounded-[24px] border border-white/10 bg-surface/60 p-5"
                >
                  <panel.icon className="text-brand-500" size={20} />
                  <div className="mt-4 font-semibold">{panel.title}</div>
                  <p className="mt-2 text-sm leading-7 text-muted">{panel.copy}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg" className="bg-[#0d132d] text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  AI guidance workspace
                </div>
                <div className="mt-2 font-display text-3xl font-semibold">
                  Learn with a hiring lens.
                </div>
              </div>
              <BrainCircuit className="text-brand-400" />
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Recommendation
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Finish the frontend sprint, then ship one recruiter-facing capstone.
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Complete responsive foundations",
                  "Build a live dashboard with a case study",
                  "Generate a certificate and update your resume proof section",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/6 px-4 py-3"
                  >
                    <CheckCircle2 size={16} className="text-accent" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="courses" className="shell mt-24 scroll-mt-28">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Courses"
            title="A cleaner courses section with filters, better cards, and stronger conversion cues."
            description="Students can browse by category, understand the track quickly, and move directly into the learning flow without friction."
          />
          <Link
            href="/courses"
            className={buttonStyles({ variant: "secondary", size: "sm" })}
          >
            Browse full library <MoveRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-[linear-gradient(135deg,rgba(var(--brand),1),rgba(var(--accent),1))] text-white shadow-glow"
                  : "border border-white/10 bg-surface/72 text-muted hover:border-brand-500/30 hover:text-ink"
              }`}
            >
              <Filter size={14} />
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} padding="md" className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </Card>
              ))
            : filteredTracks.map((course) => (
                <motion.div key={course._id || course.slug} {...fadeUp}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
        </div>
      </section>

      <section className="shell mt-24">
        <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
          <Card padding="lg" className="bg-[#0d132d] text-white">
            <Badge variant="success">Certificate showcase</Badge>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight">
              Certificates should look premium and feel trustworthy.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              The redesign highlights certificate credibility with a more polished
              presentation, public verification support, and stronger visual
              proof for students and recruiters.
            </p>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/6 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Certificate preview
              </div>
              <div className="mt-3 font-display text-3xl font-semibold">
                EVX-2026-AI-0042
              </div>
              <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <div>Student: Verified learner</div>
                <div>Track: AI Foundations with Python</div>
                <div>Status: Publicly checkable</div>
                <div>Format: Downloadable PDF</div>
              </div>
            </div>
          </Card>

          <div className="grid gap-5">
            {trustCards.map((card) => (
              <motion.div key={card.title} {...fadeUp}>
                <Card padding="lg" className="h-full">
                  <card.icon className="text-brand-500" size={24} />
                  <h3 className="mt-4 font-display text-2xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{card.copy}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell mt-24">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Card padding="lg" className="aurora-card">
            <Badge variant="success">Testimonials</Badge>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight">
              Social proof helps students trust the platform faster.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Reviews, outcomes, and success-oriented messaging make the redesign
              feel more credible and conversion-focused.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["4.9/5", "Student-first product feel"],
                ["Mobile-ready", "Responsive across devices"],
                ["AI-powered", "Modern smart guidance"],
                ["Trust-ready", "Certificate verification"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-white/10 bg-surface/60 p-5"
                >
                  <div className="flex items-center gap-1 text-warning">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <div className="mt-4 font-display text-3xl font-semibold">{value}</div>
                  <div className="mt-1 text-sm text-muted">{label}</div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.name} {...fadeUp}>
                <Card padding="lg" className="h-full">
                  <div className="text-4xl leading-none text-brand-500">&ldquo;</div>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted">{testimonial.role}</div>
                  </div>
                  <div className="mt-4 rounded-[20px] border border-white/10 bg-surface/60 px-4 py-3 text-sm text-ink">
                    {testimonial.outcome}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="shell mt-24 scroll-mt-28">
        <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
          <Card padding="lg" className="bg-[#0d132d] text-white">
            <Badge variant="info">Founder section</Badge>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight">
              Harshal Wakode is shaping ElevateX as a serious, modern student product.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              This section creates trust around the person behind the platform and
              reinforces the product vision: helping students build skills,
              projects, certificates, and stronger placement outcomes.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-[28px] border border-white/10 bg-white/6 p-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,rgba(var(--brand),1),rgba(var(--accent),1))] font-display text-2xl font-semibold text-white">
                HW
              </div>
              <div>
                <div className="text-xl font-semibold">Harshal Wakode</div>
                <div className="text-sm text-slate-300">
                  AI Engineer and AI Automation Specialist
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-5">
            {founderPoints.map((point) => (
              <motion.div key={point} {...fadeUp}>
                <Card padding="lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-brand-500" />
                    <p className="text-sm leading-7 text-muted">{point}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="shell mt-24 scroll-mt-28">
        <SectionHeading
          eyebrow="Pricing"
          title="Free and paid plans can live inside the same premium experience."
          description="The redesign supports a free entry point for beginners and a stronger paid tier for learners who want deeper guidance and faster execution."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {pricingPlans.map((plan) => (
            <motion.div key={plan.name} {...fadeUp}>
              <Card
                padding="lg"
                className={plan.highlight ? "aurora-card border-brand-500/30" : ""}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge variant={plan.highlight ? "success" : "info"}>{plan.badge}</Badge>
                    <h3 className="mt-5 font-display text-3xl font-semibold">
                      {plan.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-4xl font-semibold">Rs. {plan.price}</div>
                    <div className="text-sm text-muted">
                      {plan.price === "0" ? "to start" : "suggested launch plan"}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-muted">{plan.copy}</p>

                <div className="mt-6 grid gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-ink">
                      <CheckCircle2 size={16} className="text-brand-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.kind === "upgrade" ? (
                  <UpgradeButton
                    label={plan.cta}
                    variant={plan.highlight ? "primary" : "secondary"}
                    size="lg"
                    className="mt-8 w-full"
                    redirectTo="/dashboard"
                  />
                ) : (
                  <Link
                    href={plan.href}
                    className={buttonStyles({
                      variant: plan.highlight ? "primary" : "secondary",
                      size: "lg",
                      className: "mt-8 w-full",
                    })}
                  >
                    {plan.cta}
                  </Link>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="faq" className="shell mt-24 scroll-mt-28">
        <SectionHeading
          eyebrow="FAQ"
          title="Answer the big questions before they become friction."
          description="A clean FAQ section improves trust, reduces hesitation, and helps visitors understand what the product offers."
        />

        <div className="mt-10 grid gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <motion.div key={item.question} {...fadeUp}>
                <Card padding="md">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <div className="font-semibold">{item.question}</div>
                    <ChevronDown
                      size={18}
                      className={`transition ${isOpen ? "rotate-180 text-brand-500" : "text-muted"}`}
                    />
                  </button>
                  {isOpen ? (
                    <p className="mt-4 text-sm leading-7 text-muted">{item.answer}</p>
                  ) : null}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="contact" className="shell mt-24 scroll-mt-28">
        <Card
          padding="lg"
          className="aurora-card relative overflow-hidden"
        >
          <div className="absolute inset-0 noise-mask opacity-50" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-4">
              <div className="eyebrow">Contact</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Want the product to convert better and feel more premium?
              </h2>
              <p className="max-w-2xl text-base leading-8 text-muted">
                The new contact section gives students and collaborators a clear
                next step while reinforcing the brand story and founder trust.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:wakodeharshal@gmail.com"
                  className={buttonStyles({ size: "lg" })}
                >
                  Email Harshal <Mail size={16} className="ml-2" />
                </a>
                <Link
                  href="/auth/signup"
                  className={buttonStyles({ variant: "secondary", size: "lg" })}
                >
                  Create Account
                </Link>
              </div>
            </div>

            <Card padding="lg" className="bg-[#0d132d] text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Quick contact card
              </div>
              <div className="mt-4 font-display text-3xl font-semibold">
                wakodeharshal@gmail.com
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div>Founder-led communication</div>
                <div>Product, partnerships, and collaboration friendly</div>
                <div>Best for students, mentors, and EdTech growth discussions</div>
              </div>
            </Card>
          </div>
        </Card>
      </section>
    </div>
  );
}
