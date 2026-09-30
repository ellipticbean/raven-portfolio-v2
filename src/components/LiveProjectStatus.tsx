"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

type StatusValue =
  | "online"
  | "offline"
  | "degraded"
  | "live"
  | "unknown";

type StatusItem = {
  slug: string;
  status: StatusValue;
  label: string;
  checkedAt: string;
};

type StatusResponse = {
  checkedAt: string;
  projects: StatusItem[];
};

function statusColor(status: StatusValue) {
  if (status === "online" || status === "live") {
    return "var(--success)";
  }

  if (status === "degraded") {
    return "var(--warning)";
  }

  if (status === "offline") {
    return "var(--danger)";
  }

  return "var(--text-muted)";
}

export default function LiveProjectStatus() {
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadStatuses() {
      try {
        const response = await fetch("/api/status", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load project status");
        }

        const data: StatusResponse = await response.json();

        if (!active) {
          return;
        }

        setStatuses(data.projects);
        setCheckedAt(data.checkedAt);
      } catch {
        if (!active) {
          return;
        }

        setStatuses([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadStatuses();

    const interval = window.setInterval(
      loadStatuses,
      60_000
    );

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="glass-panel accent-glow relative overflow-hidden rounded-[var(--radius-xl)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
        <div>
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            System
          </p>

          <h2 className="mt-1 text-sm font-medium text-white">
            Live Project Status
          </h2>
        </div>

        <span className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {loading ? "Checking..." : "Auto refresh"}
        </span>
      </div>

      <div className="space-y-1 p-3">
        {projects.map((project) => {
          const status = statuses.find(
            (item) => item.slug === project.slug
          );

          const currentStatus =
            status?.status ?? "unknown";

          const label =
            status?.label ??
            (loading ? "Checking" : "Unknown");

          return (
            <div
              key={project.slug}
              className="flex items-center justify-between rounded-xl px-4 py-4 transition hover:bg-[var(--surface-hover)]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: statusColor(currentStatus),
                    boxShadow:
                      currentStatus === "online" ||
                      currentStatus === "live"
                        ? "0 0 12px rgba(102,217,163,0.8)"
                        : undefined,
                  }}
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {project.name}
                  </p>

                  <p className="mono mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {project.type}
                  </p>
                </div>
              </div>

              <span
                className="mono ml-4 text-[10px] uppercase tracking-[0.12em]"
                style={{
                  color: statusColor(currentStatus),
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[var(--border)] bg-[rgba(108,140,255,0.04)] px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Last checked
          </span>

          <span className="mono text-[10px] text-[var(--text-secondary)]">
            {checkedAt
              ? new Date(checkedAt).toLocaleTimeString()
              : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}