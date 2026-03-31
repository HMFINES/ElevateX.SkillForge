import clsx from "clsx";

export const badgeStyles = ({ variant = "default", className } = {}) =>
  clsx(
    "inline-flex items-center border px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(0,0,0,0.5)]",
    {
      "border-white/20 bg-surface text-muted": variant === "default",
      "border-brand-500/50 bg-brand-500/10 text-brand-500 shadow-[0_0_10px_rgba(0,255,65,0.2)]": variant === "info",
      "border-success/50 bg-success/10 text-success shadow-[0_0_10px_rgba(0,255,65,0.2)]": variant === "success",
      "border-warning/50 bg-warning/10 text-warning shadow-[0_0_10px_rgba(255,215,0,0.2)]": variant === "warning",
    },
    className
  );

export default function Badge({ variant = "default", className, children }) {
  return <span className={badgeStyles({ variant, className })}>{children}</span>;
}
