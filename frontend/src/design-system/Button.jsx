import clsx from "clsx";

export const buttonStyles = ({ variant = "primary", size = "md", className } = {}) =>
  clsx(
    "inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:pointer-events-none disabled:opacity-60",
    {
      "border-2 border-brand-500 bg-brand-500/10 text-brand-500 shadow-cyber hover:bg-brand-500 hover:text-canvas hover:shadow-[0_0_20px_rgba(0,255,65,0.6)]":
        variant === "primary",
      "border-2 border-accent bg-accent/5 text-accent shadow-cyber-pink hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(255,0,60,0.6)]":
        variant === "secondary",
      "border border-white/20 bg-transparent text-muted hover:border-white/50 hover:text-ink":
        variant === "ghost",
      "border-2 border-error bg-error/10 text-error shadow-[4px_4px_0px_rgba(255,0,60,0.8)] hover:bg-error hover:text-white":
        variant === "danger",
    },
    {
      "h-10 px-4 text-xs": size === "sm",
      "h-12 px-6 text-sm": size === "md",
      "h-14 px-8 text-base": size === "lg",
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
