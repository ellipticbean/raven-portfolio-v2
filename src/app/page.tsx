import Image from "next/image";
import Link from "next/link";
import CommandPaletteLauncher from "@/components/CommandPaletteLauncher";
import SkillsExplorer from "@/components/SkillsExplorer";
import ActivityTimeline from "@/components/ActivityTimeline";
import LiveProjectStatus from "@/components/LiveProjectStatus";
import Terminal from "@/components/Terminal";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import ThemeToggle from "@/components/ThemeToggle";
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
      <header className="page-container retro-site-header flex h-20 items-center justify-between">
        <a
          href="#top"
          className="mono retro-brand text-sm font-semibold tracking-[0.22em] text-white"
        >
          RAVEN<span className="text-accent">.</span>
        </a>

        <nav className="portfolio-nav hidden items-center gap-8 text-sm text-[var(--text-secondary)] md:flex">
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <CommandPaletteLauncher />
        </div>
      </header>

      <section id="top" className="page-container py-12 sm:py-16">
        <div className="retro-profile-window overflow-hidden">
          <div className="retro-profile-titlebar mono">
            <span>Raven / profile</span>
            <span aria-hidden="true">□ ─ ×</span>
          </div>
          <div className="retro-profile-grid">
            <div className="retro-avatar-wrap">
              <Image
                src="/avatar.png"
                alt="Illustrated avatar of Raven with brown hair, glasses, and a dark outfit"
                width={320}
                height={320}
                priority
                className="retro-avatar"
              />
              <span className="mono retro-avatar-caption">avatar.png</span>
            </div>

            <div className="retro-profile-copy">
              <p className="mono retro-profile-eyebrow">HELLO, I&apos;M</p>
              <h1>Raven</h1>
              <p className="retro-profile-subtitle">
                coder • crocheter • uhhhh
              </p>
              <p className="retro-profile-bio">
                I build bots, web tools, and small projects for oddly specific
                problems... now that my degree is obsolete :)
              </p>
              <div className="retro-profile-actions">
                <a className="retro-profile-button primary" href="#projects">
                  open projects
                </a>
                <a className="retro-profile-button" href="#contact">
                  get in touch
                </a>
              </div>
            </div>
          </div>
        </div>

        <details className="retro-status-details">
          <summary className="mono">▸ live project status</summary>
          <div className="mt-4 max-w-xl">
            <LiveProjectStatus />
          </div>
        </details>
      </section>

      <section
        id="projects"
        className="page-container border-t border-[var(--border)] py-28"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
              C:\\Users\\Raven\\Projects
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

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.name}
              href={`/projects/${project.slug}`}
              className={`group glass-panel retro-project-card flex min-h-[360px] flex-col rounded-[var(--radius-lg)] p-6 transition duration-300 hover:-translate-y-1 ${project.slug === "scrobble-city" ? "retro-featured-card lg:col-span-2" : ""}`}
            >
              <div className="retro-card-titlebar mono" aria-hidden="true">
                <span>{project.slug === "scrobble-city" ? "★ FEATURED // SCROBBLE_CITY.EXE" : `PROJECT_${String(index + 1).padStart(2, "0")}.EXE`}</span>
                <span>□ ─ ×</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  0{index + 1}
                </span>

                <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-success">
                  <StatusDot />
                  {project.status}
                </span>
              </div>

              {project.media?.[0] && (
                <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-1)]">
                  <Image
                    src={
                      project.slug === "game-night-roulette"
                        ? "/projects/game-night-roulette/result.png"
                        : project.media[0].src
                    }
                    alt={
                      project.slug === "game-night-roulette"
                        ? "Game Night Roulette selected game result"
                        : project.media[0].alt
                    }
                    width={1200}
                    height={675}
                    unoptimized
                    className={`w-full object-cover object-top transition duration-500 group-hover:scale-[1.02] ${project.slug === "scrobble-city" ? "h-60" : "h-40"}`}
                  />
                </div>
              )}

              <div className="mt-6 flex flex-1 flex-col">
                <p className="mono mb-3 text-xs uppercase tracking-[0.14em] text-accent">
                  {project.type}
                </p>

                <h3 className="text-xl font-semibold tracking-[-0.025em] text-white">
                  {project.name}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {project.description}
                </p>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2.5"
                      >
                        <p className="text-sm font-semibold text-white">
                          {metric.value}
                        </p>

                        <p className="mono mt-1 text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

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

                <div className="mt-auto pt-7">
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-5">
                    <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {project.slug === "scrobble-city" ? "Explore the city & case study" : "View case study"}
                    </span>

                    <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
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
              C:\\Users\\Raven\\About
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              A little about me.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-[var(--text-secondary)]">
            <p>
              I spent six years in college studying computer science and
              ended up building novelty bots, small websites, and tools for
              the hobbies I spend most of my time on.
            </p>

            <p>
              Outside of coding, I like crocheting, gaming, and collecting
              old books and magazines. I&apos;m usually bouncing between a few
              projects at once, and this portfolio is where I keep them all.
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
              Contact
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Have a project in mind?
            </h2>

            <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">
              I&apos;m open to building custom Discord bots, websites, web tools,
              and automations. Tell me a little about what you&apos;re looking for
              and we can talk through the details.
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
        <p className="mono">RAVEN.EXE // HANDMADE ON THE INTERNET ✦</p>
      </footer>
    </main>
  );
}