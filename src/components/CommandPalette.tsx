"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

const commands = [
  {
    name: "Projects",
    description: "Explore things I've built",
    shortcut: "P",
    action: () => document.querySelector("#projects")?.scrollIntoView(),
  },
  {
    name: "Skills",
    description: "Explore technologies through real projects",
    shortcut: "S",
    action: () => document.querySelector("#skills")?.scrollIntoView(),
  },
  {
    name: "Activity",
    description: "See recent releases and project updates",
    shortcut: "T",
    action: () => document.querySelector("#activity")?.scrollIntoView(),
  },
  {
    name: "About",
    description: "Learn more about me",
    shortcut: "A",
    action: () => document.querySelector("#about")?.scrollIntoView(),
  },
  {
    name: "Work With Me",
    description: "Custom bots, websites, tools, and automations",
    shortcut: "W",
    action: () => document.querySelector("#contact")?.scrollIntoView(),
  },
  {
    name: "Email Raven",
    description: "ravenberries@proton.me",
    shortcut: "E",
    action: () => {
      window.location.href = "mailto:ravenberries@proton.me";
    },
  },
];

export default function CommandPalette({
  open,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) =>
      `${command.name} ${command.description}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function runCommand(action: () => void) {
    onClose();

    requestAnimationFrame(() => {
      action();
    });
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/65 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="glass-panel accent-glow w-full max-w-2xl overflow-hidden rounded-[var(--radius-lg)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-5">
          <span className="mono text-sm text-accent">›</span>

          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands..."
            className="h-16 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[var(--text-muted)]"
          />

          <kbd className="mono rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 text-[10px] text-[var(--text-muted)]">
            ESC
          </kbd>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command) => (
              <button
                key={command.name}
                type="button"
                onClick={() => runCommand(command.action)}
                className="group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition hover:bg-[var(--surface-hover)]"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {command.name}
                  </p>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {command.description}
                  </p>
                </div>

                <span className="mono ml-6 text-[10px] text-[var(--text-muted)] group-hover:text-accent-bright">
                  {command.shortcut}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                No commands found.
              </p>

              <p className="mono mt-2 text-[10px] text-[var(--text-muted)]">
                Try projects, about, work, or email
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] px-5 py-3">
          <span className="mono text-[10px] text-[var(--text-muted)]">
            RAVEN // COMMAND CENTER
          </span>

          <span className="mono text-[10px] text-[var(--text-muted)]">
            Click a command to run
          </span>
        </div>
      </div>
    </div>
  );
}