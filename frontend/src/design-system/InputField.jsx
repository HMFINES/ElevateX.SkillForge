"use client";

import { useId } from "react";
import clsx from "clsx";

export default function InputField({
  label,
  error,
  helperText,
  textarea = false,
  className,
  inputClassName,
  suffix,
  ...props
}) {
  const generatedId = useId();
  const inputId = props.id || generatedId;
  const Component = textarea ? "textarea" : "input";

  return (
    <label className={clsx("block space-y-2", className)} htmlFor={inputId}>
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          {label}
        </span>
      ) : null}
      <span
        className={clsx(
          "flex items-center gap-3 rounded-[20px] border bg-surface/75 px-4 transition focus-within:border-brand-500/40 focus-within:ring-2 focus-within:ring-brand-500/10",
          error ? "border-error/80" : "border-line"
        )}
      >
        <Component
          id={inputId}
          className={clsx(
            "w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-muted",
            textarea && "min-h-[124px] resize-y",
            inputClassName
          )}
          {...props}
        />
        {suffix}
      </span>
      {error ? <span className="text-sm text-error">{error}</span> : null}
      {!error && helperText ? (
        <span className="text-sm text-muted">{helperText}</span>
      ) : null}
    </label>
  );
}
