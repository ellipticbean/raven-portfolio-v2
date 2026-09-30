import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Raven | Developer & Builder",
    template: "%s | Raven",
  },
  description:
    "Developer portfolio for Raven, featuring Discord bots, web projects, interactive tools, experiments, and software built to solve oddly specific problems.",
  keywords: [
    "Raven",
    "developer",
    "software developer",
    "web developer",
    "Discord bot developer",
    "TypeScript",
    "Next.js",
    "Discord.js",
    "portfolio",
  ],
  authors: [{ name: "Raven" }],
  creator: "Raven",
  applicationName: "Raven Portfolio",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}