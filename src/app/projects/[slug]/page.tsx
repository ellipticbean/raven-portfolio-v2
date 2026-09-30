import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

function StatusDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(102,217,163,0.8)]"
    />
  );
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <header className="page-container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="mono text-sm font-semibold tracking-[0.22em] text-white"
        >
          RAVEN<span className="text-accent">.</span>
        </Link>

        <Link
          href="/#projects"
          className="mono rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-xs text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-white"
        >
          ← Projects
        </Link>
      </header>

      <section className="page-container relative py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-accent opacity-[0.06] blur-[120px]"
        />

        <div className="max-w-4xl">
          <div className="mono flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em]">
            <span className="text-accent">
              {project.type}
            </span>

            <span className="text-[var(--text-muted)]">
              /
            </span>

            <span className="flex items-center gap-2 text-success">
              <StatusDot />
              {project.status}
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            {project.name}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((technology) => (
              <span
                key={technology}
                className="mono rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-xs text-[var(--text-secondary)]"
              >
                {technology}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    index === 0
                      ? "rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(108,140,255,0.2)] transition hover:bg-accent-bright"
                      : "rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-accent hover:text-white"
                  }
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-container border-t border-[var(--border)] py-24">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
              Overview
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              What it does.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
            {project.description}
          </p>
        </div>
      </section>

      <section className="page-container border-t border-[var(--border)] py-24">
        <div className="mb-10">
          <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
            Features
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
            Built into the project.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {project.features.map((feature, index) => (
            <div
              key={feature}
              className="glass-panel flex items-start gap-5 rounded-[var(--radius-md)] p-5"
            >
              <span className="mono mt-0.5 text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-6 text-[var(--text-secondary)]">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-container border-t border-[var(--border)] py-24">
        <div className="glass-panel relative overflow-hidden rounded-[var(--radius-xl)] p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent opacity-10 blur-[90px]"
          />

          <div className="relative">
            <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
              Explore
            </p>

            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Want to see what else I&apos;ve been building?
            </h2>

            <Link
              href="/#projects"
              className="mt-8 inline-flex rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-accent hover:text-white"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <footer className="page-container flex flex-col gap-4 border-t border-[var(--border)] py-8 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Built by Raven.</p>
        <p className="mono">
          PROJECT // {project.slug.toUpperCase()}
        </p>
      </footer>
    </main>
  );
}