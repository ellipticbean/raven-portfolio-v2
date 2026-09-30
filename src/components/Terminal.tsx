"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
};

const helpCommands = [
  ["help", "Show available commands"],
  ["about", "Learn about Raven"],
  ["projects", "List projects"],
  ["skills", "Show technologies used"],
  ["status", "Check project status"],
  ["contact", "Show contact information"],
  ["clear", "Clear terminal history"],
];

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const technologies = useMemo(
    () =>
      Array.from(
        new Set(projects.flatMap((project) => project.tech))
      ).sort(),
    []
  );

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) {
      return;
    }

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let output: React.ReactNode;

    switch (command) {
      case "help":
        output = (
          <div className="space-y-2">
            {helpCommands.map(([name, description]) => (
              <div
                key={name}
                className="grid grid-cols-[90px_1fr] gap-4"
              >
                <span className="text-accent">{name}</span>
                <span className="text-[var(--text-muted)]">
                  {description}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "about":
        output = (
          <p className="max-w-2xl leading-7 text-[var(--text-secondary)]">
            Raven is a developer building Discord bots, web tools,
            automations, and software experiments designed around useful,
            oddly specific problems.
          </p>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-accent hover:text-accent-bright"
                >
                  {project.name}
                </Link>

                <span className="ml-3 text-[var(--text-muted)]">
                  {project.type}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="flex max-w-2xl flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[var(--text-secondary)]"
              >
                {technology}
              </span>
            ))}
          </div>
        );
        break;

      case "status":
        output = (
          <div className="space-y-2">
            <p className="text-[var(--text-secondary)]">
              Live status is available in the Project Status panel.
            </p>

            <a
              href="#top"
              className="inline-block text-accent hover:text-accent-bright"
            >
              Jump to live status ↑
            </a>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-2">
            <p className="text-[var(--text-secondary)]">
              Email:
            </p>

            <a
              href="mailto:ravenberries@proton.me"
              className="text-accent hover:text-accent-bright"
            >
              ravenberries@proton.me
            </a>
          </div>
        );
        break;

      default:
        output = (
          <p className="text-[var(--danger)]">
            Command not found:{" "}
            <span className="text-white">{command}</span>
            <br />
            <span className="text-[var(--text-muted)]">
              Type &quot;help&quot; to see available commands.
            </span>
          </p>
        );
    }

    setHistory((current) => [
      ...current,
      {
        command: rawCommand,
        output,
      },
    ]);

    setInput("");

    requestAnimationFrame(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <section
      id="terminal"
      className="page-container border-t border-[var(--border)] py-28"
    >
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
            Terminal
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Explore another way.
          </h2>
        </div>

        <p className="max-w-xl text-base leading-8 text-[var(--text-secondary)]">
          Prefer commands? Explore the portfolio through a small interactive
          terminal. Type{" "}
          <span className="mono text-accent">help</span> to get started.
        </p>
      </div>

      <div className="glass-panel accent-glow overflow-hidden rounded-[var(--radius-xl)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)] opacity-70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--warning)] opacity-70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)] opacity-70" />
          </div>

          <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            raven@portfolio:~
          </span>
        </div>

        <div
          ref={terminalRef}
          className="mono h-[430px] overflow-y-auto p-5 text-xs sm:p-6 sm:text-sm"
        >
          <div className="mb-6 space-y-2 text-[var(--text-muted)]">
            <p>Raven Portfolio Terminal v1.0</p>
            <p>
              Type{" "}
              <span className="text-accent">help</span>{" "}
              to list available commands.
            </p>
          </div>

          <div className="space-y-7">
            {history.map((entry, index) => (
              <div key={`${entry.command}-${index}`}>
                <div className="mb-3 flex gap-2">
                  <span className="text-success">raven@portfolio</span>
                  <span className="text-[var(--text-muted)]">:</span>
                  <span className="text-accent">~</span>
                  <span className="text-white">$</span>
                  <span className="text-white">
                    {entry.command}
                  </span>
                </div>

                <div className="pl-0">
                  {entry.output}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-7 flex items-center gap-2"
          >
            <span className="text-success">
              raven@portfolio
            </span>

            <span className="text-[var(--text-muted)]">
              :
            </span>

            <span className="text-accent">
              ~
            </span>

            <span className="text-white">
              $
            </span>

            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command"
              className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-[var(--text-muted)]"
              placeholder="type a command..."
            />
          </form>
        </div>
      </div>
    </section>
  );
}