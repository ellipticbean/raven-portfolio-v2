"use client";

import { FormEvent, useEffect, useState } from "react";

type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Loading the guestbook…");
  const [loading, setLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [sending, setSending] = useState(false);

  async function loadEntries() {
    try {
      const response = await fetch("/api/guestbook", { cache: "no-store" });
      if (!response.ok) throw new Error("Guestbook unavailable");
      const data = (await response.json()) as { entries: GuestbookEntry[]; visitorCount?: number };
      setEntries(data.entries);
      setVisitorCount(typeof data.visitorCount === "number" ? data.visitorCount : null);
      setStatus(data.entries.length ? "Thanks for stopping by!" : "Be the first to sign the guestbook.");
    } catch {
      setStatus("The guestbook is getting its little mailbox installed. Please check back soon.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadEntries(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function submitEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus("Sending your note…");
    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, message, website: (event.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "" }),
      });
      const data = (await response.json()) as { error?: string; entry?: GuestbookEntry };
      if (!response.ok || !data.entry) throw new Error(data.error || "Could not save your note.");
      setEntries((current) => [data.entry!, ...current]);
      setName("");
      setMessage("");
      setStatus("Your note is in the guestbook. Thanks for signing! ♥");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save your note. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="retro-guestbook-layout">
      <form className="retro-guestbook-form" onSubmit={submitEntry}>
        <div className="retro-guestbook-honeypot" aria-hidden="true">
          <label htmlFor="guestbook-website">Leave this field empty</label>
          <input id="guestbook-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="guestbook-name">Your name / nickname</label>
        <input id="guestbook-name" name="name" autoComplete="nickname" maxLength={40}
          value={name} onChange={(event) => setName(event.target.value)}
          placeholder="pixel_pal" required />
        <label htmlFor="guestbook-message">Your message</label>
        <textarea id="guestbook-message" name="message" maxLength={500} rows={5}
          value={message} onChange={(event) => setMessage(event.target.value)}
          placeholder="Hi Raven! I found your site and…" required />
        <div className="retro-guestbook-form-bottom">
          <span className="mono">{message.length}/500 characters</span>
          <button type="submit" disabled={sending || !name.trim() || !message.trim()}>
            {sending ? "sending…" : "✎ sign guestbook"}
          </button>
        </div>
        <p className="retro-guestbook-status" aria-live="polite">{status}</p>
      </form>

      <p className="mono retro-guestbook-counter">VISITOR COUNTER: {visitorCount === null ? "…" : visitorCount.toLocaleString()}</p>
      <section className="retro-guestbook-entries" aria-labelledby="guestbook-entries-heading">
        <div className="retro-guestbook-section-heading">
          <h2 id="guestbook-entries-heading">Notes from visitors</h2>
          <span className="mono">{loading ? "…" : String(entries.length).padStart(2, "0")}</span>
        </div>
        {loading ? <p className="retro-guestbook-empty">Opening the guestbook…</p> :
          entries.length === 0 ? <p className="retro-guestbook-empty">No notes yet. Yours could be the first!</p> :
          <ol className="retro-guestbook-list">
            {entries.map((entry) => (
              <li className="retro-guestbook-entry" key={entry.id}>
                <div className="retro-guestbook-entry-meta">
                  <strong>{entry.name}</strong>
                  <time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleDateString()}</time>
                </div>
                <p>{entry.message}</p>
              </li>
            ))}
          </ol>}
      </section>
    </div>
  );
}
