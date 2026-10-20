import { env } from "cloudflare:workers";

export const runtime = "edge";

type D1Result<T> = { results?: T[]; success?: boolean };
type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  first: <T>() => Promise<T | null>;
  all: <T>() => Promise<D1Result<T>>;
  run: () => Promise<unknown>;
};
type D1Database = { prepare: (query: string) => D1Statement };
type RuntimeBindings = {
  GUESTBOOK_DB: D1Database;
  GUESTBOOK_ADMIN_TOKEN?: string;
};
type EntryRow = { id: number; name: string; message: string; created_at: string };
const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "cache-control": "no-store" } });

function database() {
  const bindings = env as unknown as RuntimeBindings;
  if (!bindings.GUESTBOOK_DB) throw new Error("Guestbook database binding is missing.");
  return { db: bindings.GUESTBOOK_DB, bindings };
}

export async function GET(request: Request) {
  try {
    const { db } = database();
    const result = await db.prepare(
      "SELECT id, name, message, created_at FROM guestbook_entries WHERE moderation_status = 'visible' ORDER BY id DESC LIMIT 50"
    ).all<EntryRow>();
    const alreadyCounted = request.headers.get("cookie")?.split(";").some((part) => part.trim().startsWith("raven_guestbook_seen=")) ?? false;
    if (!alreadyCounted) {
      await db.prepare("UPDATE guestbook_stats SET value = value + 1 WHERE key = 'page_views'").run();
    }
    const count = await db.prepare(
      "SELECT value FROM guestbook_stats WHERE key = 'page_views'"
    ).first<{ value: number }>();
    const response = json({
      entries: (result.results ?? []).map((row) => ({
        id: row.id, name: row.name, message: row.message, createdAt: row.created_at,
      })),
      visitorCount: count?.value ?? 0,
    });
    if (alreadyCounted) return response;
    response.headers.append("set-cookie", "raven_guestbook_seen=1; Path=/; Max-Age=2592000; Secure; SameSite=Lax; HttpOnly");
    return response;
  } catch {
    return json({ error: "Guestbook storage is not configured yet.", entries: [] }, 503);
  }
}

export async function POST(request: Request) {
  try {
    const { db } = database();
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 5000) return json({ error: "That message is too large." }, 413);

    const body = await request.json() as { name?: unknown; message?: unknown; website?: unknown };
    // Honeypot: automated submissions should look successful but are discarded.
    if (typeof body.website === "string" && body.website.trim()) {
      return json({ entry: { id: Date.now(), name: "visitor", message: "", createdAt: new Date().toISOString() } }, 201);
    }
    if (typeof body.name !== "string" || typeof body.message !== "string") {
      return json({ error: "Please enter a name and a message." }, 400);
    }
    const name = body.name.trim().replace(/\s+/g, " ");
    const message = body.message.trim();
    if (name.length < 1 || name.length > 40) return json({ error: "Name must be 1–40 characters." }, 400);
    if (message.length < 1 || message.length > 500) return json({ error: "Message must be 1–500 characters." }, 400);
    if (/https?:\/\/|www\./i.test(message) && (message.match(/https?:\/\/|www\./gi) ?? []).length > 1) {
      return json({ error: "Please keep links to a minimum." }, 400);
    }

    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip + new URL(request.url).hostname));
    const ipHash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const recent = await db.prepare(
      "SELECT id FROM guestbook_entries WHERE ip_hash = ? AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-60 seconds') LIMIT 1"
    ).bind(ipHash).first<{ id: number }>();
    if (recent) return json({ error: "Please wait a minute before signing again." }, 429);

    const inserted = await db.prepare(
      "INSERT INTO guestbook_entries (name, message, ip_hash) VALUES (?, ?, ?) RETURNING id, name, message, created_at"
    ).bind(name, message, ipHash).first<EntryRow>();
    if (!inserted) return json({ error: "Your note could not be saved. Please try again." }, 500);
    return json({ entry: { id: inserted.id, name: inserted.name, message: inserted.message, createdAt: inserted.created_at } }, 201);
  } catch {
    return json({ error: "The guestbook is temporarily unavailable. Please try again later." }, 503);
  }
}

export async function DELETE(request: Request) {
  try {
    const { db, bindings } = database();
    const expected = bindings.GUESTBOOK_ADMIN_TOKEN;
    const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!expected || !supplied || supplied !== expected) return json({ error: "Unauthorized." }, 401);
    const body = await request.json() as { id?: unknown; action?: unknown };
    if (typeof body.id !== "number" || !Number.isInteger(body.id) || body.id < 1) {
      return json({ error: "A valid entry ID is required." }, 400);
    }
    if (body.action === "restore") {
      await db.prepare("UPDATE guestbook_entries SET moderation_status = 'visible' WHERE id = ?").bind(body.id).run();
    } else {
      await db.prepare("UPDATE guestbook_entries SET moderation_status = 'hidden' WHERE id = ?").bind(body.id).run();
    }
    return json({ ok: true });
  } catch {
    return json({ error: "Moderation is temporarily unavailable." }, 503);
  }
}
