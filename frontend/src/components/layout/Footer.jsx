import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-canvas/80">
      <div className="shell py-10">
        <div className="glass-card grid gap-8 p-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <div className="eyebrow">ElevateX</div>
            <h3 className="font-display text-2xl font-semibold">
              Career acceleration with real learning systems.
            </h3>
            <p className="max-w-md text-sm leading-7 text-muted">
              Founder-led by Harshal Wakode, ElevateX blends learning, progress,
              certificates, and practical outcomes into one serious EdTech product.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Platform
            </div>
            <Link href="/courses" className="block text-sm text-muted hover:text-ink">
              Browse Courses
            </Link>
            <Link href="/dashboard" className="block text-sm text-muted hover:text-ink">
              Dashboard
            </Link>
            <Link href="/certificates" className="block text-sm text-muted hover:text-ink">
              Certificates
            </Link>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Trust
            </div>
            <Link href="/verify" className="block text-sm text-muted hover:text-ink">
              Verify Certificate
            </Link>
            <Link href="/login" className="block text-sm text-muted hover:text-ink">
              Login
            </Link>
            <Link href="/signup" className="block text-sm text-muted hover:text-ink">
              Signup
            </Link>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
              Contact
            </div>
            <a href="mailto:wakodeaharshal@gmail.com" className="block text-sm text-muted hover:text-ink">
              wakodeaharshal@gmail.com
            </a>
            <p className="text-sm text-muted">Harshal Wakode</p>
            <p className="text-sm text-muted">AI Engineer & AI Automation Specialist</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
