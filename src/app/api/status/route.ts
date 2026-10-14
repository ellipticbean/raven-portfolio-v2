
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ProjectStatus = {
    slug: string;
    status: "online" | "offline" | "degraded" | "live" | "unknown";
    label: string;
    checkedAt: string;
};

async function checkHealthProject(
    slug: string,
    url: string,
    checkedAt: string
): Promise<ProjectStatus> {
    try {
        const response = await fetch(url, {
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
        });

        if (response.status === 503) {
            return {
                slug,
                status: "degraded",
                label: "Starting",
                checkedAt,
            };
        }

        if (!response.ok) {
            return {
                slug,
                status: "offline",
                label: "Offline",
                checkedAt,
            };
        }

        const health = (await response.json()) as { status?: string };

        if (health.status === "ok") {
            return {
                slug,
                status: "online",
                label: "Online",
                checkedAt,
            };
        }

        return {
            slug,
            status: "unknown",
            label: "Unknown",
            checkedAt,
        };
    } catch {
        return {
            slug,
            status: "offline",
            label: "Offline",
            checkedAt,
        };
    }
}

async function checkLiveProject(
    slug: string,
    url: string,
    liveLabel: string,
    checkedAt: string
): Promise<ProjectStatus> {
    try {
        const response = await fetch(url, {
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
        });

        return {
            slug,
            status: response.ok ? "live" : "offline",
            label: response.ok ? liveLabel : "Offline",
            checkedAt,
        };
    } catch {
        return {
            slug,
            status: "offline",
            label: "Offline",
            checkedAt,
        };
    }
}

export async function GET() {
    const checkedAt = new Date().toISOString();

    const [
        commissionStatus,
        tf2Status,
        gameNightStatus,
        scrobbleStatus,
    ] = await Promise.all([
        checkHealthProject(
            "creator-commission-manager",
            "https://creator-commission-manager-production.up.railway.app/health",
            checkedAt
        ),
        checkHealthProject(
            "tf2-random-map-picker",
            "https://tf2-map-picker-production.up.railway.app/health",
            checkedAt
        ),
        checkLiveProject(
            "game-night-roulette",
            "https://game-night-roulette.ellipticbean.workers.dev/health",
            "Live",
            checkedAt
        ),
        checkLiveProject(
            "scrobble-city",
            "https://ellipticbean.github.io/scrobble-city/",
            "Live Beta",
            checkedAt
        ),
    ]);

    const statuses: ProjectStatus[] = [
        scrobbleStatus,
        commissionStatus,
        tf2Status,
        gameNightStatus,
    ];

    return NextResponse.json({
        checkedAt,
        projects: statuses,
    });
}
