import Image from "next/image";
import Link from "next/link";
import CommandPaletteLauncher from "@/components/CommandPaletteLauncher";
import SkillsExplorer from "@/components/SkillsExplorer";
import ActivityTimeline from "@/components/ActivityTimeline";
import LiveProjectStatus from "@/components/LiveProjectStatus";
import Terminal from "@/components/Terminal";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import { projects } from "@/data/projects";

function StatusDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(102,217,163,0.8)]"
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="page-container flex h-20 items-center justify-between">
        <a
          href="#top"
          className="mono text-sm font-semibold tracking-[0.22em] text-white"
        >
          RAVEN<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-[var(--text-secondary)] md:flex">
          <a
            href="#projects"
            className="transition-colors hover:text-white"
          >
            Projects
          </a>

          <a
            href="#skills"
            className="transition-colors hover:text-white"
          >
            Skills
          </a>

          <a
            href="#activity"
            className="transition-colors hover:text-white"
          >
            Activity
          </a>
          <a
            href="#terminal"
            className="transition-colors hover:text-white"
          >
            Terminal
          </a>
          <a
            href="#about"
            className="transition-colors hover:text-white"
          >
            About
          </a>

          <a
            href="#contact"
            className="transition-colors hover:text-white"
          >
            Contact
          </a>
        </nav>

        <CommandPaletteLauncher />
      </header>

      <section
        id="top"
        className="page-container relative grid min-h-[calc(100vh-5rem)] items-center gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="relative z-10">
          <div className="mono mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]">
            <StatusDot />
            Currently building
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl">
            I build useful things for{" "}
            <span className="text-accent">oddly specific</span> problems.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            I&apos;m Raven, a developer building Discord bots, web tools,
            automations, and software experiments that turn annoying problems
            into useful products.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(108,140,255,0.22)] transition hover:bg-accent-bright"
            >
              Explore Projects
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-accent hover:text-white"
            >
              Work With Me
            </a>
          </div>

          <div className="mono mt-10 text-xs text-[var(--text-muted)]">
            Press{" "}
            <kbd className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 text-[var(--text-secondary)]">
              Ctrl
            </kbd>{" "}
            +{" "}
            <kbd className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 text-[var(--text-secondary)]">
              K
            </kbd>{" "}
            to explore
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent opacity-10 blur-[100px]" />

          <LiveProjectStatus />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent opacity-[0.035] blur-[130px]"
        />
      </section>

      <section
        id="projects"
        className="page-container border-t border-[var(--border)] py-28"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
              Selected Work
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Things I&apos;ve built.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[var(--text-secondary)]">
            Bots, utilities, experiments, and web projects built around real
            problems and ideas I wanted to explore.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.name}
              href={`/projects/${project.slug}`}
              className="group glass-panel flex min-h-[360px] flex-col rounded-[var(--radius-lg)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  0{index + 1}
                </span>

                {project.media?.[0] && (
                  <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-1)]">
                    <Image
                      src={project.media[0].src}
                      alt={project.media[0].alt}
                      width={1200}
                      height={675}
                      className="h-40 w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-success">
                  <StatusDot />
                  {project.status}
                </span>
              </div>

              <div className="mt-6">
                <p className="mono mb-3 text-xs uppercase tracking-[0.14em] text-accent">
                  {project.type}
                </p>

                <h3 className="text-xl font-semibold tracking-[-0.025em] text-white">
                  {project.name}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="mono rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-2.5 py-1.5 text-[10px] text-[var(--text-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-[var(--border)] pt-5">
                  <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    View case study
                  </span>

                  <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SkillsExplorer />
      <ActivityTimeline />
      <Terminal />
      <section
        id="about"
        className="page-container border-t border-[var(--border)] py-28"
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
              About
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              More builder than buzzwords.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-[var(--text-secondary)]">
            <p>
              I like building software that has a clear reason to exist,
              especially tools that make communities, hobbies, or everyday
              workflows easier.
            </p>

            <p>
              My projects span Discord bots, web development, databases,
              automation, APIs, and small experiments created simply because I
              wanted to know if I could make them work.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="page-container border-t border-[var(--border)] py-28"
      >
        <div className="glass-panel relative overflow-hidden rounded-[var(--radius-xl)] p-8 sm:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent opacity-10 blur-[90px]" />

          <div className="relative max-w-2xl">
            <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
              Work With Me
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Have something oddly specific that needs building?
            </h2>

            <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">
              I&apos;m interested in custom Discord bots, small web tools,
              automations, websites, integrations, and unusual programming
              ideas.
            </p>

            <div className="mt-10">
              <ProjectInquiryForm />
            </div>
            <p className="mt-6 text-sm text-[var(--text-muted)]">
              Prefer a normal email?{" "}
              <a
                href="mailto:ravenberries@proton.me"
                className="text-accent transition hover:text-accent-bright"
              >
                ravenberries@proton.me
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="page-container flex flex-col gap-4 border-t border-[var(--border)] py-8 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Built by Raven.</p>
        <p className="mono">RAVEN // PORTFOLIO V2</p>
      </footer>
    </main>
  );
}