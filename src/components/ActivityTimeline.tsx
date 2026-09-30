import Link from "next/link";
import { activity } from "@/data/activity";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function typeLabel(type: string) {
  if (type === "release") return "Release";
  if (type === "project") return "Project";
  return "Update";
}

export default function ActivityTimeline() {
  return (
    <section
      id="activity"
      className="page-container border-t border-[var(--border)] py-28"
    >
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
            Activity
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            What I&apos;ve been building.
          </h2>
        </div>

        <p className="max-w-xl text-base leading-8 text-[var(--text-secondary)]">
          Releases, project milestones, experiments, and meaningful updates
          from across my work.
        </p>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--border)] sm:left-[132px]" />

        <div className="space-y-3">
          {activity.map((item, index) => {
            const content = (
              <div className="glass-panel group rounded-[var(--radius-lg)] p-5 transition duration-300 hover:border-[var(--border-strong)]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mono rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-accent">
                    {typeLabel(item.type)}
                  </span>

                  {item.version && (
                    <span className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {item.version}
                    </span>
                  )}

                  {item.project && (
                    <span className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {item.project}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                  {item.description}
                </p>

                {item.href && (
                  <span className="mono mt-5 inline-flex text-xs text-accent transition group-hover:translate-x-1">
                    View project →
                  </span>
                )}
              </div>
            );

            return (
              <div
                key={`${item.date}-${item.title}`}
                className="relative grid gap-4 pl-8 sm:grid-cols-[110px_1fr] sm:gap-8 sm:pl-0"
              >
                <div className="hidden pt-5 text-right sm:block">
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {formatDate(item.date)}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute left-[3px] top-6 h-[9px] w-[9px] rounded-full border border-accent bg-[var(--background)] shadow-[0_0_14px_rgba(108,140,255,0.35)] sm:left-[128px]"
                />

                <div>
                  <p className="mono mb-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)] sm:hidden">
                    {formatDate(item.date)}
                  </p>

                  {item.href ? (
                    <Link href={item.href}>{content}</Link>
                  ) : (
                    content
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}