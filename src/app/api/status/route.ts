import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ProjectStatus = {
    slug: string;
    status: "online" | "offline" | "degraded" | "live" | "unknown";
    label: string;
    checkedAt: string;
};

export async function GET() {
    const checkedAt = new Date().toISOString();

    let commissionStatus: ProjectStatus = {
        slug: "creator-commission-manager",
        status: "unknown",
        label: "Unknown",
        checkedAt,
    };

    try {
        const response = await fetch(
            "https://creator-commission-manager-production.up.railway.app/health",
            {
                cache: "no-store",
                signal: AbortSignal.timeout(5000),
            }
        );

        if (response.ok) {
            const health = await response.json();

            if (health.status === "ok") {
                commissionStatus = {
                    slug: "creator-commission-manager",
                    status: "online",
                    label: "Online",
                    checkedAt,
                };
            }
        } else if (response.status === 503) {
            commissionStatus = {
                slug: "creator-commission-manager",
                status: "degraded",
                label: "Starting",
                checkedAt,
            };
        } else {
            commissionStatus = {
                slug: "creator-commission-manager",
                status: "offline",
                label: "Offline",
                checkedAt,
            };
        }
    } catch {
        commissionStatus = {
            slug: "creator-commission-manager",
            status: "offline",
            label: "Offline",
            checkedAt,
        };
    }
    let tf2Status: ProjectStatus = {
        slug: "tf2-random-map-picker",
        status: "unknown",
        label: "Unknown",
        checkedAt,
    };

    try {
        const response = await fetch(
            "https://tf2-map-picker-production.up.railway.app/health",
            {
                cache: "no-store",
                signal: AbortSignal.timeout(5000),
            }
        );

        if (response.ok) {
            const health = await response.json();

            if (health.status === "ok") {
                tf2Status = {
                    slug: "tf2-random-map-picker",
                    status: "online",
                    label: "Online",
                    checkedAt,
                };
            }
        } else if (response.status === 503) {
            tf2Status = {
                slug: "tf2-random-map-picker",
                status: "degraded",
                label: "Starting",
                checkedAt,
            };
        } else {
            tf2Status = {
                slug: "tf2-random-map-picker",
                status: "offline",
                label: "Offline",
                checkedAt,
            };
        }
    } catch {
        tf2Status = {
            slug: "tf2-random-map-picker",
            status: "offline",
            label: "Offline",
            checkedAt,
        };
    }
    let gameNightStatus: ProjectStatus = {
        slug: "game-night-roulette",
        status: "unknown",
        label: "Unknown",
        checkedAt,
    };

    try {
        const response = await fetch(
            "https://game-night-roulette.ellipticbean.workers.dev/",
            {
                cache: "no-store",
                signal: AbortSignal.timeout(5000),
            }
        );

        if (response.ok) {
            gameNightStatus = {
                slug: "game-night-roulette",
                status: "live",
                label: "Live",
                checkedAt,
            };
        } else {
            gameNightStatus = {
                slug: "game-night-roulette",
                status: "offline",
                label: "Offline",
                checkedAt,
            };
        }
    } catch {
        gameNightStatus = {
            slug: "game-night-roulette",
            status: "offline",
            label: "Offline",
            checkedAt,
        };
    }
    const statuses: ProjectStatus[] = [
        commissionStatus,
        tf2Status,
        gameNightStatus,
    ];

    return NextResponse.json({
        checkedAt,
        projects: statuses,
    });
}