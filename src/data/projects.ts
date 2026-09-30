export type ProjectMetric = {
    label: string;
    value: string;
};
export type ProjectMedia = {
    src: string;
    alt: string;
    caption?: string;
};
export type ProjectSection = {
    title: string;
    description: string;
};

export type Project = {
    slug: string;
    name: string;
    type: string;
    description: string;
    tech: string[];
    status: string;
    summary: string;
    features: string[];

    problem?: string;
    solution?: string;

    metrics?: ProjectMetric[];
    media?: ProjectMedia[];
    technicalHighlights?: ProjectSection[];

    challenges?: ProjectSection[];

    lessons?: string[];

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
        problem:
            "Creators often manage commissions across Discord messages, notes, spreadsheets, and payment conversations. That makes it easy to lose track of request status, deadlines, customer responses, and available commission slots.",

        solution:
            "Creator Commission Manager brings the full commission workflow into Discord. Creators can create queues, collect structured requests, manage each commission through a defined workflow, track deadlines and payment status, keep private notes, and communicate progress without needing a separate management platform.",

        metrics: [
            {
                label: "Slash subcommands",
                value: "18",
            },
            {
                label: "Workflow states",
                value: "8",
            },
            {
                label: "Access modes",
                value: "3",
            },
            {
                label: "Database",
                value: "PostgreSQL",
            },
        ],
        media: [
            {
                src: "/projects/creator-commission-manager/panel.png",
                alt: "Creator Commission Manager public commission panel in Discord",
                caption:
                    "A public commission panel where customers can see availability and submit a new commission request.",
            },
            {
                src: "/projects/creator-commission-manager/request-management.png",
                alt: "Creator Commission Manager request management controls in Discord",
                caption:
                    "A submitted commission request with creator controls for accepting, rejecting, and progressing the workflow.",
            },
            {
                src: "/projects/creator-commission-manager/management-tools.png",
                alt: "Creator Commission Manager deadline payment and notes tools",
                caption:
                    "Creator management tools showing deadline tracking, commission price, payment status, and private notes.",
            },
            {
                src: "/projects/creator-commission-manager/dashboard.png",
                alt: "Creator Commission Manager dashboard in Discord",
                caption:
                    "The commission dashboard provides a quick overview of queues, capacity, active work, payments, deadlines, and priority requests.",
            },
            {
                src: "/projects/creator-commission-manager/completed-workflow.png",
                alt: "Creator Commission Manager delivered commission request",
                caption:
                    "A commission at the delivered stage with its deadline, final price, paid-in-full status, and saved creator notes.",
            },
            {
                src: "/projects/creator-commission-manager/access-controls.png",
                alt: "Creator Commission Manager server access settings",
                caption:
                    "Server-level access controls determine who can use commission management tools.",
            },
        ],
        technicalHighlights: [
            {
                title: "Persistent PostgreSQL architecture",
                description:
                    "Queues, commission requests, creator settings, reminders, public panels, payment state, notes, and server access settings are stored persistently instead of relying on in-memory Discord state.",
            },
            {
                title: "State-driven commission workflow",
                description:
                    "Requests move through defined states including submitted, accepted, in progress, waiting on customer, ready, delivered, completed, and cancelled. Creator and customer actions are restricted based on the current state.",
            },
            {
                title: "Role-aware server access",
                description:
                    "Server owners can allow commission-management commands for everyone, restrict them to the server owner, or grant access to a selected Discord role while keeping customer interactions available.",
            },
            {
                title: "Automated deadline reminders",
                description:
                    "A background reminder system checks commission deadlines, respects creator timezone settings, prevents duplicate reminders, and sends creator notifications at useful deadline intervals.",
            },
            {
                title: "Live deployment health endpoint",
                description:
                    "The Railway deployment exposes a lightweight health endpoint that reports whether the Discord client is ready. My portfolio uses it to display the bot's real deployment status.",
            },
        ],

        challenges: [
            {
                title: "Separating creator and customer permissions",
                description:
                    "Management restrictions needed to protect creator tools without blocking customers from submitting requests, cancelling eligible requests, or confirming completed deliveries.",
            },
            {
                title: "Keeping workflow state consistent",
                description:
                    "Buttons, modals, DMs, reminders, payment data, and queue availability all depend on request state, so transitions had to be validated carefully to prevent contradictory actions.",
            },
            {
                title: "Handling deleted or inaccessible Discord resources",
                description:
                    "Public commission panels can be deleted or lose permissions outside the bot. The panel refresh system distinguishes permanently missing resources from temporary permission problems and cleans up stale database records safely.",
            },
        ],

        lessons: [
            "Designing the database around ownership and lifecycle rules made later permission and cleanup features much easier to add.",
            "Discord permissions need to be treated as part of the application architecture rather than something added after the core features are finished.",
            "State-based workflows are easier to maintain when every action explicitly defines which statuses it accepts and which status it creates.",
            "Operational features such as health checks, cleanup behavior, logging, and deployment safety matter just as much as the visible commands once a bot becomes public.",
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
        problem:
            "Choosing a Team Fortress 2 map can turn into its own argument, especially when players want a specific game mode, seasonal pool, or something different from what was just played.",

        solution:
            "TF2 Random Map Picker turns map selection into a quick Discord command. Players can filter by game mode, season, and beta status, reroll results, request another map from the same mode, inspect map details, and view map-pool statistics without leaving Discord.",

        metrics: [
            {
                label: "Top-level commands",
                value: "7",
            },
            {
                label: "Map filters",
                value: "3",
            },
            {
                label: "Platform",
                value: "Discord",
            },
            {
                label: "Deployment",
                value: "Railway",
            },
        ],
        media: [
            {
                src: "/projects/tf2-random-map-picker/map-result.png",
                alt: "TF2 Random Map Picker random map result in Discord",
                caption:
                    "A standard map roll showing the selected map, active filters, matching map pool, and interactive reroll controls.",
            },
            {
                src: "/projects/tf2-random-map-picker/filtered-map.png",
                alt: "TF2 Random Map Picker filtered Smissmas Payload result",
                caption:
                    "A filtered map roll using Payload, Smissmas, and beta-map settings to narrow the available map pool.",
            },
            {
                src: "/projects/tf2-random-map-picker/interactive-picker.png",
                alt: "TF2 Random Map Picker mention-based interactive picker",
                caption:
                    "Mentioning the bot opens a no-slash interactive picker with quick-roll and filter-selection options.",
            },
            {
                src: "/projects/tf2-random-map-picker/map-info.png",
                alt: "TF2 Random Map Picker map information lookup for Dustbowl",
                caption:
                    "The map information command shows a map's game mode, internal map code, season, and beta status.",
            },
            {
                src: "/projects/tf2-random-map-picker/stats.png",
                alt: "TF2 Random Map Picker database statistics",
                caption:
                    "Database statistics summarize standard maps, beta maps, supported game modes, and seasonal map counts.",
            },
        ],
        technicalHighlights: [
            {
                title: "Structured TF2 map dataset",
                description:
                    "Maps are organized with game mode, season, and beta metadata so command filters can build valid map pools dynamically instead of relying on separate hard-coded command lists.",
            },
            {
                title: "Interactive reroll controls",
                description:
                    "After a map is selected, Discord buttons let users reroll with the same filters, pick another map from the same mode, or clear filters and return to the standard map pool.",
            },
            {
                title: "Slash-command autocomplete",
                description:
                    "Commands such as map information lookup use Discord autocomplete so users can discover valid map names without memorizing the dataset.",
            },
            {
                title: "Server-local recent history",
                description:
                    "The bot keeps a short recent-map history per server to help groups see what was picked recently while keeping the feature lightweight.",
            },
            {
                title: "Live deployment health endpoint",
                description:
                    "The Railway service exposes a lightweight readiness endpoint that my portfolio checks to display the bot's actual live deployment status.",
            },
        ],

        challenges: [
            {
                title: "Keeping map metadata consistent",
                description:
                    "A single map can belong to a special seasonal pool, beta pool, or uncommon game mode, so the dataset and filtering rules need to stay synchronized as supported maps change.",
            },
            {
                title: "Preserving filters across button actions",
                description:
                    "Reroll and same-mode buttons need to remember the original selection context so users get another valid result rather than unexpectedly resetting the search.",
            },
            {
                title: "Balancing useful state with simplicity",
                description:
                    "Recent-map history is useful, but the bot is intentionally lightweight, so that history is kept in memory rather than introducing persistent storage solely for a minor feature.",
            },
        ],

        lessons: [
            "Good data modeling can simplify a large number of user-facing filters and commands.",
            "Interactive Discord components are more useful when they preserve the context of the command that created them.",
            "Autocomplete makes commands with large valid input sets much easier to use.",
            "Not every feature needs persistent storage; the storage strategy should match how important the data is.",
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