import Link from "next/link";
import { buttonStyles } from "@/design-system/Button";

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-canvas/80">
      <div className="shell py-10">
        <div className="grid gap-8 rounded-[32px] border border-white/10 bg-surface/72 p-8 shadow-glass lg:grid-cols-[1.35fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <div className="eyebrow">ElevateX</div>
            <h3 className="font-display text-3xl font-semibold tracking-tight">
              A premium learning platform for skills, proof-of-work, and placement-ready growth.
            </h3>
            <p className="max-w-md text-sm leading-7 text-muted">
              ElevateX blends futuristic UI, AI-guided learning, student-first
              dashboards, and verifiable certificates into one modern EdTech
              experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup" className={buttonStyles({ size: "sm" })}>
                Join Now
              </Link>
              <Link
                href="/verify"
                className={buttonStyles({ variant: "secondary", size: "sm" })}
              >
                Verify Certificate
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Explore
            </div>
            <Link href="/" className="block text-sm text-muted hover:text-ink">
              Home
            </Link>
            <Link href="/#courses" className="block text-sm text-muted hover:text-ink">
              Courses
            </Link>
            <Link href="/#about" className="block text-sm text-muted hover:text-ink">
              About
            </Link>
            <Link href="/#contact" className="block text-sm text-muted hover:text-ink">
              Contact
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Platform
            </div>
            <Link href="/certificates" className="block text-sm text-muted hover:text-ink">
              Certificates
            </Link>
            <Link href="/#pricing" className="block text-sm text-muted hover:text-ink">
              Pricing
            </Link>
            <Link href="/#faq" className="block text-sm text-muted hover:text-ink">
              FAQ
            </Link>
            <Link href="/auth/login" className="block text-sm text-muted hover:text-ink">
              Login
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Contact
            </div>
            <a
              href="mailto:wakodeaharshal@gmail.com"
              className="block text-sm text-muted hover:text-ink"
            >
              wakodeaharshal@gmail.com
            </a>
            <p className="text-sm text-muted">Founder-led by Harshal Wakode</p>
            <p className="text-sm text-muted">AI Engineer & AI Automation Specialist</p>
            <p className="text-sm text-muted">
              Built for students, beginners, and ambitious learners in India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
