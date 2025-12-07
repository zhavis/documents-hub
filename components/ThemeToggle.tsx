"use client";

export default function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}) {
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-600 transition"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
