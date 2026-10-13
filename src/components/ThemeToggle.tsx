"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "raven-portfolio-theme";
const CHANGE_EVENT = "raven-portfolio-theme-changed";

// The layout's early inline script restores the saved theme before hydration.
// Subscribe to that document state instead of setting React state in an effect.
function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeToTheme(onChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    document.documentElement.dataset.theme =
      event.newValue === "light" ? "light" : "dark";
    onChange();
  }

  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => "dark");

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  const switchingToLight = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={switchingToLight ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === "light"}
      title={switchingToLight ? "Light mode" : "Dark mode"}
      className="mono inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-xs text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
    >
      {switchingToLight ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
        </svg>
      )}

      <span className="hidden sm:inline">
        {switchingToLight ? "Light" : "Dark"}
      </span>
    </button>
  );
}
