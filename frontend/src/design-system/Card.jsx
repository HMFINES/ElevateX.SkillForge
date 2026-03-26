import clsx from "clsx";

export const cardStyles = ({ padding = "md", hover = false, className } = {}) =>
  clsx(
    "rounded-[30px] border border-white/10 bg-surface/72 shadow-glass backdrop-blur-2xl",
    {
      "p-4": padding === "sm",
      "p-6": padding === "md",
      "p-8": padding === "lg",
      "transition duration-200 hover:-translate-y-1 hover:border-brand-500/25 hover:shadow-glow":
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
