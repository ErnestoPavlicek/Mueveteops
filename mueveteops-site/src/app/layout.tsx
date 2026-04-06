import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MueveOps - AI Solutions Agency",
  description:
    "We build automations, AI agents, and content pipelines that plug into your existing tools and start saving your team hours in week one.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        id="root"
        className="h-full font-body bg-[var(--bg)] text-[var(--text-primary)]"
      >
        {children}
      </body>
    </html>
  );
}
