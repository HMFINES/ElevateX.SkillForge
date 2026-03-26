import clsx from "clsx";

export const badgeStyles = ({ variant = "default", className } = {}) =>
  clsx(
    "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
    {
      "border-line bg-surface/80 text-muted": variant === "default",
      "border-brand-500/25 bg-brand-500/12 text-brand-500": variant === "info",
      "border-success/25 bg-success/12 text-success": variant === "success",
      "border-warning/25 bg-warning/12 text-warning": variant === "warning",
    },
    className
  );

export default function Badge({ variant = "default", className, children }) {
  return <span className={badgeStyles({ variant, className })}>{children}</span>;
}
