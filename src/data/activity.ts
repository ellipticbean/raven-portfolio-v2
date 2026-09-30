export type ActivityItem = {
  date: string;
  type: "release" | "project" | "update";
  title: string;
  description: string;
  project?: string;
  version?: string;
  href?: string;
};

export const activity: ActivityItem[] = [
  {
    date: "2026-09-30",
    type: "project",
    title: "Started building Raven Portfolio v2",
    description:
      "A complete rebuild of my developer portfolio with interactive project pages, command navigation, live project data, and a more advanced developer-focused interface.",
    project: "Raven Portfolio v2",
  },
  {
    date: "2026-09-30",
    type: "release",
    title: "Creator Commission Manager released",
    description:
      "Initial public release of my Discord commission-management bot for artists, crafters, and other creators.",
    project: "Creator Commission Manager",
    version: "v1.0.0",
    href: "/projects/creator-commission-manager",
  },
  {
    date: "2026-09-30",
    type: "update",
    title: "Creator Commission Manager submitted to Top.gg",
    description:
      "Prepared the bot for public discovery with global commands, documentation, privacy and terms pages, and a public installation flow.",
    project: "Creator Commission Manager",
    href: "/projects/creator-commission-manager",
  },
];