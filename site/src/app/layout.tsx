import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smooth-corner.jeiwinfrey.com"),
  title: "tailwindcss-smooth-corners",
  description:
    "A Tailwind CSS plugin that upgrades rounded utilities with smooth superellipse corner shapes.",
  openGraph: {
    title: "tailwindcss-smooth-corners",
    description:
      "A Tailwind CSS plugin that upgrades rounded utilities with smooth superellipse corner shapes.",
    url: "https://smooth-corner.jeiwinfrey.com",
    siteName: "smooth-corner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tailwindcss-smooth-corners",
    description:
      "A Tailwind CSS plugin that upgrades rounded utilities with smooth superellipse corner shapes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
