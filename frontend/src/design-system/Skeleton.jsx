import clsx from "clsx";

export default function Skeleton({ className }) {
  return <div className={clsx("animate-pulse rounded-2xl bg-white/6", className)} />;
}
