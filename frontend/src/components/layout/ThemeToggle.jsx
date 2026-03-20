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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-muted transition hover:text-ink"
      aria-label="Toggle theme"
    >
      {activeTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
