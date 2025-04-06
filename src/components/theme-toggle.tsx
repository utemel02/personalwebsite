"use client"

import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-400 relative inline-flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-stone-600 absolute" />
      <MoonIcon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-amber-200 absolute" />
      <div className="h-5 w-5"></div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
} 