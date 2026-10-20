"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Track = {
  name?: string;
  artist?: string;
  album?: string;
  url?: string;
  albumArt?: string;
  nowPlaying?: boolean;
  timestamp?: string | number;
};

type Feed = { tracks?: Track[] };

function timeLabel(timestamp?: string | number) {
  if (!timestamp) return "Last scrobble";
  // Last.fm timestamps are often Unix seconds; ISO strings and millisecond values are also supported.
  const date = typeof timestamp === "number" && timestamp < 10_000_000_000
    ? new Date(timestamp * 1000)
    : new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Last scrobble";
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LastFmStatus() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("https://raven.ellipticbean.workers.dev/api/lastfm", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Last.fm request failed");
      const data = (await response.json()) as Feed;
      if (!Array.isArray(data.tracks) || data.tracks.length === 0) {
        setTrack(null);
        setError(true);
      } else {
        const current = data.tracks.find((item) => item.nowPlaying) ?? data.tracks[0];
        setTrack(current);
        setError(false);
      }
      setUpdatedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Defer the initial request out of the effect body to avoid a synchronous
    // state-update cascade while still fetching as soon as the component mounts.
    const initialRefresh = window.setTimeout(() => void refresh(), 0);
    const interval = window.setInterval(() => void refresh(), 60_000);
    return () => {
      window.clearTimeout(initialRefresh);
      window.clearInterval(interval);
    };
  }, [refresh]);

  const playing = Boolean(track?.nowPlaying);

  return (
    <section aria-label="Listening status" className="retro-music-panel mt-6">
      <div className="retro-music-heading mono">
        <span>♫ LAST.FM / LISTENING LOG</span>
        <span className="retro-music-live">{playing ? "● NOW PLAYING" : "○ RECENT SCROBBLE"}</span>
      </div>
      {loading ? (
        <p className="retro-music-empty">Checking the listening log…</p>
      ) : error || !track ? (
        <div className="retro-music-content">
          <div className="retro-music-art retro-music-art-empty" aria-hidden="true">♫</div>
          <div>
            <p className="retro-music-title">Listening status unavailable</p>
            <p className="retro-music-meta">The Last.fm feed couldn&apos;t be reached. It will retry automatically.</p>
          </div>
        </div>
      ) : (
        <a className="retro-music-content" href={track.url || "https://www.last.fm/user/MintyCorpse"} target="_blank" rel="noreferrer">
          {track.albumArt ? (
            <Image className="retro-music-art" src={track.albumArt} alt="" width={72} height={72} unoptimized />
          ) : (
            <div className="retro-music-art retro-music-art-empty" aria-hidden="true">♫</div>
          )}
          <div className="retro-music-details">
            <p className="retro-music-title">{track.name || "Unknown track"}</p>
            <p className="retro-music-meta">{track.artist || "Unknown artist"}{track.album ? ` · ${track.album}` : ""}</p>
            <p className="retro-music-time">{playing ? "Playing right now" : `Last scrobbled ${timeLabel(track.timestamp)}`}</p>
          </div>
          {playing && <span className="retro-music-bars" aria-label="Currently playing"><i /><i /><i /><i /></span>}
        </a>
      )}
      <p className="retro-music-updated mono">{updatedAt ? `UPDATED ${updatedAt}` : "AUTO-REFRESH: 60 SEC"} · <button type="button" onClick={() => { setLoading(true); void refresh(); }}>refresh</button></p>
    </section>
  );
}
