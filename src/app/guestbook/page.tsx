import type { Metadata } from "next";
import Link from "next/link";
import Guestbook from "@/components/Guestbook";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a little note in Raven's corner of the internet.",
};

export default function GuestbookPage() {
  return (
    <main className="page-container min-h-screen py-8 sm:py-12">
      <header className="retro-guestbook-topbar">
        <Link href="/" className="mono retro-guestbook-back">← back to raven.exe</Link>
        <span className="mono retro-guestbook-stamp">GUESTBOOK.TXT</span>
      </header>

      <section className="retro-guestbook-window">
        <div className="retro-guestbook-titlebar mono">
          <span>guestbook.exe — visitors welcome!</span>
          <span aria-hidden="true">□ ─ ×</span>
        </div>
        <div className="retro-guestbook-inner">
          <p className="mono retro-guestbook-kicker">YOU FOUND THE GUESTBOOK ✦</p>
          <h1>Leave a little hello.</h1>
          <p className="retro-guestbook-intro">
            A tiny corner of the old web. Say hi, tell me what you&apos;re making,
            or leave a recommendation for my next rabbit hole. Please be kind.
          </p>

          <div className="retro-guestbook-notice">
            <span aria-hidden="true">✎</span>
            <p>Keep it friendly. Messages are public, so don&apos;t include private information.</p>
          </div>

          <Guestbook />
          <p className="mono retro-guestbook-footer">MADE WITH CARE, NOT A CORPORATE CMS ♥</p>
        </div>
      </section>
    </main>
  );
}
