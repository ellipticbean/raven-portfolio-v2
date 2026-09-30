"use client";

import { FormEvent, useState } from "react";

const projectTypes = [
  "Discord Bot",
  "Website",
  "Web Tool",
  "Automation",
  "API / Integration",
  "Bug Fix / Existing Project",
  "Something Else",
];

const budgets = [
  "Under $50",
  "$50–$100",
  "$100–$250",
  "$250–$500",
  "$500+",
  "Not sure yet",
];

const timelines = [
  "As soon as possible",
  "1–2 weeks",
  "2–4 weeks",
  "1–2 months",
  "Flexible",
];

export default function ProjectInquiryForm() {
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[5]);
  const [timeline, setTimeline] = useState(timelines[4]);
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Project Inquiry — ${projectType}`
    );

    const body = encodeURIComponent(
      [
        "Hi Raven,",
        "",
        "I'm interested in discussing a project.",
        "",
        `Project type: ${projectType}`,
        `Budget: ${budget}`,
        `Timeline: ${timeline}`,
        "",
        "Project details:",
        description.trim() || "No additional details provided.",
        "",
        "Thanks!",
      ].join("\n")
    );

    window.location.href =
      `mailto:ravenberries@proton.me?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Project Type
          </span>

          <select
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm text-white outline-none transition focus:border-accent"
          >
            {projectTypes.map((type) => (
              <option
                key={type}
                value={type}
                className="bg-[var(--surface-1)]"
              >
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Budget
          </span>

          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm text-white outline-none transition focus:border-accent"
          >
            {budgets.map((item) => (
              <option
                key={item}
                value={item}
                className="bg-[var(--surface-1)]"
              >
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Timeline
        </span>

        <select
          value={timeline}
          onChange={(event) => setTimeline(event.target.value)}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm text-white outline-none transition focus:border-accent"
        >
          {timelines.map((item) => (
            <option
              key={item}
              value={item}
              className="bg-[var(--surface-1)]"
            >
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Project Details
        </span>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={6}
          placeholder="What do you want to build? Include the main features, what it's for, and anything else that would help me understand the idea."
          className="resize-y rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-[var(--text-muted)] focus:border-accent"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-6 text-[var(--text-muted)]">
          This opens your email app with the project information filled in.
          Nothing is submitted automatically.
        </p>

        <button
          type="submit"
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(108,140,255,0.18)] transition hover:bg-accent-bright"
        >
          Create Inquiry Email
        </button>
      </div>
    </form>
  );
}