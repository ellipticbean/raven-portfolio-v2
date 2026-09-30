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

const siteTitle = "Raven | Developer & Builder";

const siteDescription =
  "Developer portfolio for Raven, featuring Discord bots, web apps, integrations, automation, and software built to solve oddly specific problems.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Raven",
  },

  description: siteDescription,

  applicationName: "Raven Portfolio",

  authors: [
    {
      name: "Raven",
    },
  ],

  creator: "Raven",
  publisher: "Raven",

  category: "technology",

  keywords: [
    "Raven",
    "developer",
    "software developer",
    "web developer",
    "Discord bot developer",
    "Discord bots",
    "web apps",
    "automation",
    "API integration",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Discord.js",
    "PostgreSQL",
    "Cloudflare Workers",
    "Steam API",
    "developer portfolio",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Raven Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Raven developer portfolio featuring Discord bots and web projects",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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