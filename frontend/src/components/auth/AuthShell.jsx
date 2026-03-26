import Card from "@/design-system/Card";

export default function AuthShell({
  eyebrow,
  title,
  description,
  asideTitle,
  asideCopy,
  highlights = [],
  children,
}) {
  return (
    <div className="shell pb-20">
      <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
        <Card
          padding="lg"
          className="relative overflow-hidden bg-gradient-to-br from-brand-500/12 via-surface/92 to-accent/10"
        >
          <div className="absolute inset-0 noise-mask opacity-60" />
          <div className="relative z-10 space-y-6">
            <div className="eyebrow">{eyebrow}</div>
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {asideTitle}
              </h1>
              <p className="max-w-xl text-base leading-8 text-muted">{asideCopy}</p>
            </div>
            <div className="grid gap-4">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                    {highlight.eyebrow}
                  </div>
                  <div className="mt-3 text-lg font-semibold">{highlight.title}</div>
                  <p className="mt-2 text-sm leading-7 text-muted">{highlight.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card padding="lg" className="self-start">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{description}</p>
          <div className="mt-8">{children}</div>
        </Card>
      </div>
    </div>
  );
}
