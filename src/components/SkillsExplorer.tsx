"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function SkillsExplorer() {
  const technologies = useMemo(() => {
    return Array.from(
      new Set(projects.flatMap((project) => project.tech))
    ).sort();
  }, []);

  const [selectedTechnology, setSelectedTechnology] = useState(
    technologies[0] ?? ""
  );

  const matchingProjects = projects.filter((project) =>
    project.tech.includes(selectedTechnology)
  );

  return (
    <section
      id="skills"
      className="page-container border-t border-[var(--border)] py-28"
    >
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
            Skills Explorer
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Tools I actually use.
          </h2>
        </div>

        <p className="max-w-xl text-base leading-8 text-[var(--text-secondary)]">
          Instead of arbitrary skill ratings, explore the technologies behind
          my actual projects and see where I&apos;ve used each one.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-panel rounded-[var(--radius-lg)] p-4">
          <div className="mb-3 px-3 py-2">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Technologies
            </p>
          </div>

          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
            {technologies.map((technology) => {
              const count = projects.filter((project) =>
                project.tech.includes(technology)
              ).length;

              const active = selectedTechnology === technology;

              return (
                <button
                  key={technology}
                  type="button"
                  onClick={() => setSelectedTechnology(technology)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                    active
                      ? "bg-[var(--accent-soft)] text-white"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-white"
                  }`}
                >
                  <span className="text-sm font-medium">
                    {technology}
                  </span>

                  <span
                    className={`mono text-[10px] ${
                      active
                        ? "text-accent-bright"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-panel overflow-hidden rounded-[var(--radius-lg)]">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Selected Technology
            </p>

            <div className="mt-2 flex items-end justify-between gap-6">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                {selectedTechnology}
              </h3>

              <span className="mono text-[10px] uppercase tracking-[0.14em] text-accent">
                {matchingProjects.length}{" "}
                {matchingProjects.length === 1 ? "project" : "projects"}
              </span>
            </div>
          </div>

          <div className="p-3">
            {matchingProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex items-center justify-between gap-6 rounded-xl px-4 py-5 transition hover:bg-[var(--surface-hover)]"
              >
                <div>
                  <p className="mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {project.type}
                  </p>

                  <h4 className="mt-2 text-base font-medium text-white">
                    {project.name}
                  </h4>

                  <p className="mt-2 max-w-xl text-xs leading-6 text-[var(--text-muted)]">
                    {project.description}
                  </p>
                </div>

                <span className="mono shrink-0 text-sm text-[var(--text-muted)] transition group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}