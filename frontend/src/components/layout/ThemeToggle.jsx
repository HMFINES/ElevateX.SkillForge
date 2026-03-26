"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      type="button"
      onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/82 text-muted transition hover:border-brand-500/30 hover:text-ink"
      aria-label="Toggle theme"
    >
      {activeTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
