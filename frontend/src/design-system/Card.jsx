import clsx from "clsx";

export const cardStyles = ({ padding = "md", hover = false, className } = {}) =>
  clsx(
    "border border-white/10 bg-surface/90 shadow-cyber relative overflow-hidden",
    {
      "p-4": padding === "sm",
      "p-6": padding === "md",
      "p-8": padding === "lg",
      "transition duration-300 hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-[0_0_25px_rgba(0,255,65,0.2)]":
        hover,
    },
    className
  );

export default function Card({
  as: Component = "div",
  padding = "md",
  hover = false,
  className,
  children,
  ...props
}) {
  return (
    <Component className={cardStyles({ padding, hover, className })} {...props}>
      {children}
    </Component>
  );
}
