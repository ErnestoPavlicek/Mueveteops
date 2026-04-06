import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Both Manrope and JetBrains Mono are variable fonts — omitting `weight`
// loads the variable version, giving us every weight from a single file
// with metric-matched fallbacks to prevent layout shift.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "MueveOps — AI Solutions Agency",
  description:
    "We build AI systems that integrate into your business — automations, agents, and creative pipelines that actually ship results.",
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
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body
        id="root"
        className="h-full font-body bg-[var(--bg)] text-[var(--text-primary)]"
      >
        {children}
      </body>
    </html>
  );
}
