import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { WindowListProvider } from "./lib/WindowListContext";

// Inter — sturdy, geometric sans for headings and UI. Solid and legible.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Source Serif 4 — readable serif used for body copy in editorial sections,
// reinforcing the "attention to detail" craftsmanship feel.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ed's Window Installations — Craftsmanship You Can See Through",
  description:
    "Detail-obsessed window installation. We take our time, we work hard, and we get it right the first time. Request a no-pressure quote.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-slate-900">
        <WindowListProvider>{children}</WindowListProvider>
      </body>
    </html>
  );
}
