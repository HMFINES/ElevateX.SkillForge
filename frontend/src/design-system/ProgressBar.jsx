import clsx from "clsx";

export default function ProgressBar({
  value = 0,
  max = 100,
  className,
  barClassName,
}) {
  const safeMax = max || 100;
  const percent = Math.max(0, Math.min(100, Math.round((value / safeMax) * 100)));

  return (
    <div className={clsx("h-2.5 overflow-hidden rounded-full bg-white/6", className)}>
      <div
        className={clsx(
          "h-full rounded-full bg-gradient-to-r from-brand-500 via-[#6f8cff] to-accent shadow-[0_0_22px_rgba(79,110,247,0.28)]",
          barClassName
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
