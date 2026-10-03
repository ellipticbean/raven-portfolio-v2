"use client";

import { useMemo, useState } from "react";
import { maps, type TF2Map } from "@/data/tf2Maps";

type SeasonFilter = "Any" | "None" | "Halloween" | "Smissmas";
type BetaFilter = "exclude" | "include" | "only";
type Command = "map" | "mapinfo" | "modes" | "recent" | "stats";

function pickRandom(pool: TF2Map[], previousCode?: string) {
    if (pool.length === 0) {
        return null;
    }

    const alternatives =
        pool.length > 1 && previousCode
            ? pool.filter((map) => map.code !== previousCode)
            : pool;

    const source = alternatives.length > 0 ? alternatives : pool;

    return source[Math.floor(Math.random() * source.length)];
}

export default function TF2BotPlayground() {
    const modes = useMemo(
        () =>
            Array.from(new Set(maps.map((map) => map.mode))).sort((a, b) =>
                a.localeCompare(b),
            ),
        [],
    );

    const stats = useMemo(
        () => ({
            total: maps.length,
            standard: maps.filter((map) => !map.beta).length,
            beta: maps.filter((map) => map.beta).length,
            modes: new Set(maps.map((map) => map.mode)).size,
            normal: maps.filter((map) => map.seasonal === "None").length,
            halloween: maps.filter((map) => map.seasonal === "Halloween").length,
            smissmas: maps.filter((map) => map.seasonal === "Smissmas").length,
        }),
        [],
    );
    const modeCounts = useMemo(
        () =>
            modes.map((modeName) => ({
                name: modeName,
                count: maps.filter((map) => map.mode === modeName).length,
            })),
        [modes],
    );
    const [command, setCommand] = useState<Command>("map");
    const [mode, setMode] = useState("Any");
    const [season, setSeason] = useState<SeasonFilter>("Any");
    const [beta, setBeta] = useState<BetaFilter>("exclude");
    const [result, setResult] = useState<TF2Map | null>(null);
    const [poolSize, setPoolSize] = useState(0);
    const [statsRan, setStatsRan] = useState(false);
    const [modesRan, setModesRan] = useState(false);
    const [mapSearch, setMapSearch] = useState("");
    const [mapInfoResult, setMapInfoResult] = useState<TF2Map | null>(null);
    const [mapInfoRan, setMapInfoRan] = useState(false);
    const [recentMaps, setRecentMaps] = useState<TF2Map[]>([]);
    const [recentRan, setRecentRan] = useState(false);
    function rememberMap(map: TF2Map | null) {
        if (!map) {
            return;
        }

        setRecentMaps((current) => [map, ...current].slice(0, 5));
    }
    function buildPool(
        selectedMode = mode,
        selectedSeason = season,
        selectedBeta = beta,
    ) {
        return maps.filter((map) => {
            if (selectedMode !== "Any" && map.mode !== selectedMode) {
                return false;
            }

            if (
                selectedSeason !== "Any" &&
                map.seasonal !== selectedSeason
            ) {
                return false;
            }

            if (selectedBeta === "exclude" && map.beta) {
                return false;
            }

            if (selectedBeta === "only" && !map.beta) {
                return false;
            }

            return true;
        });
    }

    function runCommand() {
        const pool = buildPool();
        const nextMap = pickRandom(pool, result?.code);

        setPoolSize(pool.length);
        setResult(nextMap);
        rememberMap(nextMap);
    }

    function reroll() {
        const pool = buildPool();
        const nextMap = pickRandom(pool, result?.code);

        setPoolSize(pool.length);
        setResult(nextMap);
        rememberMap(nextMap);
    }

    function anotherFromMode() {
        if (!result) {
            return;
        }

        const pool = buildPool(result.mode, season, beta);
        const nextMap = pickRandom(pool, result.code);

        setPoolSize(pool.length);
        setResult(nextMap);
        rememberMap(nextMap);
    }

    function anyMap() {
        const pool = buildPool("Any", "Any", "exclude");
        const nextMap = pickRandom(pool, result?.code);

        setMode("Any");
        setSeason("Any");
        setBeta("exclude");
        setPoolSize(pool.length);
        setResult(nextMap);
        rememberMap(nextMap);
    }

    function runStats() {
        setStatsRan(true);
    }
    function runModes() {
        setModesRan(true);
    }
    function runRecent() {
        setRecentRan(true);
    }
    function runMapInfo() {
        setMapInfoRan(true);

        const search = mapSearch.trim().toLowerCase();

        if (!search) {
            setMapInfoResult(null);
            return;
        }

        const exactMatch = maps.find(
            (map) =>
                map.name.toLowerCase() === search ||
                map.code.toLowerCase() === search,
        );

        if (exactMatch) {
            setMapInfoResult(exactMatch);
            return;
        }

        const partialMatch = maps.find(
            (map) =>
                map.name.toLowerCase().includes(search) ||
                map.code.toLowerCase().includes(search),
        );

        setMapInfoResult(partialMatch ?? null);
    }
    const commandParts = ["/map"];

    if (mode !== "Any") {
        commandParts.push(`mode:${mode}`);
    }

    if (season !== "Any") {
        commandParts.push(`season:${season}`);
    }

    if (beta === "include") {
        commandParts.push("beta:Include");
    }

    if (beta === "only") {
        commandParts.push("beta:Only");
    }

    return (
        <section className="mt-20">
            <div className="mb-8">
                <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
                    Interactive Demo
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                    Try the bot
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                    This playground uses the same TF2 map dataset as the Discord bot.
                    Run several of the bot&apos;s commands directly in the portfolio.
                </p>
            </div>

            <div className="theme-dark-demo overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-1)]">
                <div className="flex flex-wrap gap-2 border-b border-[var(--border)] p-4">
                    <button
                        type="button"
                        onClick={() => setCommand("map")}
                        className={`mono rounded-lg px-4 py-2 text-sm transition ${command === "map"
                            ? "bg-accent text-white"
                            : "border border-[var(--border)] text-[var(--text-secondary)] hover:border-accent hover:text-white"
                            }`}
                    >
                        /map
                    </button>
                    <button
                        type="button"
                        onClick={() => setCommand("modes")}
                        className={`mono rounded-lg px-4 py-2 text-sm transition ${command === "modes"
                            ? "bg-accent text-white"
                            : "border border-[var(--border)] text-[var(--text-secondary)] hover:border-accent hover:text-white"
                            }`}
                    >
                        /modes
                    </button>
                    <button
                        type="button"
                        onClick={() => setCommand("mapinfo")}
                        className={`mono rounded-lg px-4 py-2 text-sm transition ${command === "mapinfo"
                            ? "bg-accent text-white"
                            : "border border-[var(--border)] text-[var(--text-secondary)] hover:border-accent hover:text-white"
                            }`}
                    >
                        /mapinfo
                    </button>
                    <button
                        type="button"
                        onClick={() => setCommand("recent")}
                        className={`mono rounded-lg px-4 py-2 text-sm transition ${command === "recent"
                            ? "bg-accent text-white"
                            : "border border-[var(--border)] text-[var(--text-secondary)] hover:border-accent hover:text-white"
                            }`}
                    >
                        /recent
                    </button>
                    <button
                        type="button"
                        onClick={() => setCommand("stats")}
                        className={`mono rounded-lg px-4 py-2 text-sm transition ${command === "stats"
                            ? "bg-accent text-white"
                            : "border border-[var(--border)] text-[var(--text-secondary)] hover:border-accent hover:text-white"
                            }`}
                    >
                        /stats
                    </button>
                </div>

                <div className="border-b border-[var(--border)] px-5 py-4">
                    <div className="mono text-xs text-[var(--text-muted)]">
                        COMMAND
                    </div>

                    <div className="mono mt-3 overflow-x-auto rounded-lg border border-[var(--border)] bg-[#080a0f] px-4 py-3 text-sm text-accent-bright">
                        {command === "map" ? commandParts.join(" ") : `/${command}`}
                    </div>
                </div>

                {command === "map" ? (
                    <>
                        <div className="grid gap-4 p-5 md:grid-cols-3">
                            <label className="block">
                                <span className="mono mb-2 block text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                                    Mode
                                </span>

                                <select
                                    value={mode}
                                    onChange={(event) => setMode(event.target.value)}
                                    className="w-full rounded-xl border border-[var(--border)] bg-[#0b0e14] px-4 py-3 text-sm text-white outline-none transition focus:border-accent"
                                >
                                    <option value="Any">Any Mode</option>

                                    {modes.map((mapMode) => (
                                        <option key={mapMode} value={mapMode}>
                                            {mapMode}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block">
                                <span className="mono mb-2 block text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                                    Season
                                </span>

                                <select
                                    value={season}
                                    onChange={(event) =>
                                        setSeason(event.target.value as SeasonFilter)
                                    }
                                    className="w-full rounded-xl border border-[var(--border)] bg-[#0b0e14] px-4 py-3 text-sm text-white outline-none transition focus:border-accent"
                                >
                                    <option value="Any">Any Season</option>
                                    <option value="None">Normal</option>
                                    <option value="Halloween">Halloween</option>
                                    <option value="Smissmas">Smissmas</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="mono mb-2 block text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                                    Beta Maps
                                </span>

                                <select
                                    value={beta}
                                    onChange={(event) =>
                                        setBeta(event.target.value as BetaFilter)
                                    }
                                    className="w-full rounded-xl border border-[var(--border)] bg-[#0b0e14] px-4 py-3 text-sm text-white outline-none transition focus:border-accent"
                                >
                                    <option value="exclude">Exclude Beta Maps</option>
                                    <option value="include">Include Beta Maps</option>
                                    <option value="only">Only Beta Maps</option>
                                </select>
                            </label>
                        </div>

                        <div className="border-t border-[var(--border)] px-5 py-4">
                            <button
                                type="button"
                                onClick={runCommand}
                                className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
                            >
                                Run /map
                            </button>
                        </div>
                    </>
                ) : command === "mapinfo" ? (
                    <div className="p-5">
                        <label className="block max-w-xl">
                            <span className="mono mb-2 block text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                                Map name or code
                            </span>

                            <input
                                type="text"
                                value={mapSearch}
                                onChange={(event) => setMapSearch(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        runMapInfo();
                                    }
                                }}
                                placeholder="Dustbowl or cp_dustbowl"
                                className="w-full rounded-xl border border-[var(--border)] bg-[#0b0e14] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[var(--text-muted)] focus:border-accent"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={runMapInfo}
                            className="mt-4 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
                        >
                            Run /mapinfo
                        </button>
                    </div>
                ) : command === "modes" ? (
                    <div className="p-5">
                        <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                            View every supported TF2 game mode and the number of maps currently
                            available for each.
                        </p>

                        <button
                            type="button"
                            onClick={runModes}
                            className="mt-4 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
                        >
                            Run /modes
                        </button>
                    </div>
                ) : command === "recent" ? (
                    <div className="p-5">
                        <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                            View up to the five most recently picked maps from this playground
                            session.
                        </p>

                        <button
                            type="button"
                            onClick={runRecent}
                            className="mt-4 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
                        >
                            Run /recent
                        </button>
                    </div>
                ) : (
                    <div className="p-5">
                        <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                            View statistics calculated from the bot&apos;s current TF2 map
                            database.
                        </p>

                        <button
                            type="button"
                            onClick={runStats}
                            className="mt-4 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
                        >
                            Run /stats
                        </button>
                    </div>
                )}

                <div className="border-t border-[var(--border)] bg-[#0b0d12] p-5">
                    {command === "map" ? (
                        !result ? (
                            <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-center">
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                                        No command run yet
                                    </p>

                                    <p className="mono mt-2 text-xs text-[var(--text-muted)]">
                                        Choose your filters and run /map
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                                        TF2
                                    </div>

                                    <div>
                                        <div className="text-sm font-semibold text-white">
                                            TF2 Random Map Picker
                                        </div>

                                        <div className="mono text-[10px] uppercase tracking-[0.14em] text-success">
                                            Bot
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border-l-4 border-accent bg-[var(--surface-2)] p-5">
                                    <p className="text-lg font-semibold text-white">
                                        🎲 {result.name}
                                    </p>

                                    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                                        <div>
                                            <span className="text-[var(--text-muted)]">
                                                Game mode
                                            </span>
                                            <p className="mt-1 text-[var(--text-secondary)]">
                                                {result.mode}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[var(--text-muted)]">
                                                Map code
                                            </span>
                                            <p className="mono mt-1 text-[var(--text-secondary)]">
                                                {result.code}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[var(--text-muted)]">Season</span>
                                            <p className="mt-1 text-[var(--text-secondary)]">
                                                {result.seasonal === "None"
                                                    ? "Normal"
                                                    : result.seasonal}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[var(--text-muted)]">Beta</span>
                                            <p className="mt-1 text-[var(--text-secondary)]">
                                                {result.beta ? "Yes" : "No"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mono mt-5 text-xs text-[var(--text-muted)]">
                                        Matching map pool: {poolSize}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={reroll}
                                        className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-medium text-white transition hover:border-accent"
                                    >
                                        🔄 Reroll
                                    </button>

                                    <button
                                        type="button"
                                        onClick={anotherFromMode}
                                        className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-medium text-white transition hover:border-accent"
                                    >
                                        🎮 Another From This Mode
                                    </button>

                                    <button
                                        type="button"
                                        onClick={anyMap}
                                        className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-medium text-white transition hover:border-accent"
                                    >
                                        🎲 Any Map
                                    </button>
                                </div>
                            </div>
                        )
                    ) : command === "mapinfo" ? (
                        !mapInfoRan ? (
                            <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-center">
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                                        No command run yet
                                    </p>

                                    <p className="mono mt-2 text-xs text-[var(--text-muted)]">
                                        Search for a map and run /mapinfo
                                    </p>
                                </div>
                            </div>
                        ) : !mapInfoResult ? (
                            <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-center">
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        No matching map found
                                    </p>

                                    <p className="mono mt-2 text-xs text-[var(--text-muted)]">
                                        Try a map name like Dustbowl or a code like cp_dustbowl
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                                        TF2
                                    </div>

                                    <div>
                                        <div className="text-sm font-semibold text-white">
                                            TF2 Random Map Picker
                                        </div>

                                        <div className="mono text-[10px] uppercase tracking-[0.14em] text-success">
                                            Bot
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border-l-4 border-accent bg-[var(--surface-2)] p-5">
                                    <p className="text-lg font-semibold text-white">
                                        🗺️ {mapInfoResult.name}
                                    </p>

                                    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                                        <div>
                                            <span className="text-[var(--text-muted)]">
                                                Game mode
                                            </span>
                                            <p className="mt-1 text-[var(--text-secondary)]">
                                                {mapInfoResult.mode}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[var(--text-muted)]">
                                                Map code
                                            </span>
                                            <p className="mono mt-1 text-[var(--text-secondary)]">
                                                {mapInfoResult.code}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[var(--text-muted)]">
                                                Season
                                            </span>
                                            <p className="mt-1 text-[var(--text-secondary)]">
                                                {mapInfoResult.seasonal === "None"
                                                    ? "Normal"
                                                    : mapInfoResult.seasonal}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[var(--text-muted)]">
                                                Beta
                                            </span>
                                            <p className="mt-1 text-[var(--text-secondary)]">
                                                {mapInfoResult.beta ? "Yes" : "No"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : command === "modes" ? (
                        !modesRan ? (
                            <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-center">
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                                        No command run yet
                                    </p>

                                    <p className="mono mt-2 text-xs text-[var(--text-muted)]">
                                        Run /modes to view supported game modes
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                                        TF2
                                    </div>

                                    <div>
                                        <div className="text-sm font-semibold text-white">
                                            TF2 Random Map Picker
                                        </div>

                                        <div className="mono text-[10px] uppercase tracking-[0.14em] text-success">
                                            Bot
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border-l-4 border-accent bg-[var(--surface-2)] p-5">
                                    <div className="flex flex-wrap items-end justify-between gap-3">
                                        <div>
                                            <p className="text-lg font-semibold text-white">
                                                🎮 Supported Game Modes
                                            </p>

                                            <p className="mt-1 text-sm text-[var(--text-muted)]">
                                                {modeCounts.length} modes in the current map database
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                                        {modeCounts.map((modeItem) => (
                                            <div
                                                key={modeItem.name}
                                                className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-[#0b0d12] px-4 py-3"
                                            >
                                                <span className="text-sm text-[var(--text-secondary)]">
                                                    {modeItem.name}
                                                </span>

                                                <span className="mono shrink-0 text-xs text-accent-bright">
                                                    {modeItem.count} {modeItem.count === 1 ? "map" : "maps"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    ) : command === "recent" ? (
                        !recentRan ? (
                            <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-center">
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                                        No command run yet
                                    </p>

                                    <p className="mono mt-2 text-xs text-[var(--text-muted)]">
                                        Run /recent to view recent map picks
                                    </p>
                                </div>
                            </div>
                        ) : recentMaps.length === 0 ? (
                            <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-center">
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        No recent maps yet
                                    </p>

                                    <p className="mono mt-2 text-xs text-[var(--text-muted)]">
                                        Run /map a few times, then come back to /recent
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                                        TF2
                                    </div>

                                    <div>
                                        <div className="text-sm font-semibold text-white">
                                            TF2 Random Map Picker
                                        </div>

                                        <div className="mono text-[10px] uppercase tracking-[0.14em] text-success">
                                            Bot
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border-l-4 border-accent bg-[var(--surface-2)] p-5">
                                    <p className="text-lg font-semibold text-white">
                                        🕘 Recent Map Picks
                                    </p>

                                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                                        Most recent first
                                    </p>

                                    <div className="mt-5 space-y-2">
                                        {recentMaps.map((map, index) => (
                                            <div
                                                key={`${map.code}-${index}`}
                                                className="flex flex-col gap-1 rounded-lg border border-[var(--border)] bg-[#0b0d12] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div>
                                                    <span className="text-sm font-medium text-white">
                                                        {index + 1}. {map.name}
                                                    </span>

                                                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                                                        {map.mode}
                                                    </p>
                                                </div>

                                                <span className="mono text-xs text-accent-bright">
                                                    {map.code}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    ) : !statsRan ? (
                        <div className="flex min-h-52 items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--text-secondary)]">
                                    No command run yet
                                </p>

                                <p className="mono mt-2 text-xs text-[var(--text-muted)]">
                                    Run /stats to inspect the map database
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                                    TF2
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        TF2 Random Map Picker
                                    </div>

                                    <div className="mono text-[10px] uppercase tracking-[0.14em] text-success">
                                        Bot
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border-l-4 border-accent bg-[var(--surface-2)] p-5">
                                <p className="text-lg font-semibold text-white">
                                    📊 Map Database Statistics
                                </p>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Total Maps
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-white">
                                            {stats.total}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Standard Maps
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-white">
                                            {stats.standard}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Beta Maps
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-white">
                                            {stats.beta}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Game Modes
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-white">
                                            {stats.modes}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Normal
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-white">
                                            {stats.normal}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Halloween
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-white">
                                            {stats.halloween}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Smissmas
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-white">
                                            {stats.smissmas}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}