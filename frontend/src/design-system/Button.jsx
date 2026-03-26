import clsx from "clsx";

export const buttonStyles = ({ variant = "primary", size = "md", className } = {}) =>
  clsx(
    "inline-flex items-center justify-center rounded-full font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:pointer-events-none disabled:opacity-60",
    {
      "bg-[linear-gradient(135deg,rgba(var(--brand),1),rgba(var(--accent),1))] text-white shadow-glow hover:-translate-y-0.5 hover:brightness-110":
        variant === "primary",
      "border border-white/10 bg-surface/72 text-ink hover:-translate-y-0.5 hover:border-brand-500/35 hover:bg-surface/90":
        variant === "secondary",
      "bg-transparent text-muted hover:bg-surface/70 hover:text-ink":
        variant === "ghost",
      "bg-error/90 text-white hover:-translate-y-0.5 hover:bg-error":
        variant === "danger",
    },
    {
      "h-10 px-4 text-sm": size === "sm",
      "h-12 px-5 text-sm": size === "md",
      "h-14 px-6 text-base": size === "lg",
    },
    className
  );

export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
