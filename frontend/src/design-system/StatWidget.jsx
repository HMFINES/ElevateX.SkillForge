import Card from "./Card";

export default function StatWidget({ label, value, icon: Icon, trend, hint }) {
  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {label}
          </div>
          <div className="mt-3 font-display text-4xl font-semibold tracking-tight">
            {value}
          </div>
        </div>
        {Icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/12 text-brand-500">
            <Icon size={18} />
          </div>
        ) : null}
      </div>
      {trend ? <div className="text-sm font-medium text-success">{trend}</div> : null}
      {hint ? <div className="text-sm leading-6 text-muted">{hint}</div> : null}
    </Card>
  );
}
