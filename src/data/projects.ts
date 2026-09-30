export type Project = {
  slug: string;
  name: string;
  type: string;
  description: string;
  tech: string[];
  status: string;
  summary: string;
  features: string[];
  links?: {
    label: string;
    href: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: "creator-commission-manager",
    name: "Creator Commission Manager",
    type: "Discord Bot",
    description:
      "A complete commission workflow system for creators, including queues, requests, deadlines, payment tracking, private notes, and customer interactions.",
    tech: ["TypeScript", "Discord.js", "PostgreSQL"],
    status: "Online",
    summary:
      "A Discord bot built to help artists, crafters, and other creators manage commissions directly inside their server.",
    features: [
      "Commission queues with slot limits",
      "Public request panels",
      "Customer request workflow",
      "Deadline tracking and reminders",
      "Price and payment status tracking",
      "Private creator notes",
      "Queue archiving and restoration",
      "Server-level access controls",
    ],
    links: [
      {
        label: "View Guide",
        href: "https://ellipticbean.github.io/raven-portfolio/creator-commission-manager/",
      },
      {
        label: "Add Bot",
        href: "https://discord.com/oauth2/authorize?client_id=1553533744936259654",
      },
    ],
  },
  {
    slug: "tf2-random-map-picker",
    name: "TF2 Random Map Picker",
    type: "Discord Bot",
    description:
      "A Team Fortress 2 map discovery bot with game-mode filters, seasonal maps, server history, statistics, and map information.",
    tech: ["TypeScript", "Discord.js", "Steam"],
    status: "Online",
    summary:
      "A Discord bot designed to make choosing a Team Fortress 2 map faster and more fun.",
    features: [
      "Random TF2 map selection",
      "Game-mode filtering",
      "Seasonal map filtering",
      "Beta-map controls",
      "Map information lookup",
      "Game-mode statistics",
      "Recent map history",
      "Interactive reroll controls",
    ],
    links: [
      {
        label: "View Guide",
        href: "https://ellipticbean.github.io/raven-portfolio/tf2-map-picker-guide.html",
      },
    ],
  },
  {
    slug: "game-night-roulette",
    name: "Game Night Roulette",
    type: "Web App",
    description:
      "A lightweight tool for turning indecision into a game by randomly choosing what your group should play.",
    tech: ["JavaScript", "Web"],
    status: "Live",
    summary:
      "A small web project built around one simple problem: deciding what to play.",
    features: [
      "Random game selection",
      "Simple browser-based interface",
      "Fast decision-making workflow",
      "Lightweight client-side experience",
    ],
  },
];