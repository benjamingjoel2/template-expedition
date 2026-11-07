import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { brand, colors, fonts, reel, ui } from "@/site.config";
import { introScript } from "@/components/intro";
import { Header } from "@/components/header";
import { MobileBar } from "@/components/mobile-bar";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const title = `${brand.name}: ${brand.destination} adventure travel. ${brand.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title,
  description: brand.description,
  applicationName: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: brand.description,
    url: "/",
    siteName: brand.name,
    locale: brand.locale.replace("-", "_"),
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description: brand.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: colors.ink,
};

const fontHref = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fonts.sans).replace(/%20/g, "+")}:${fonts.googleQuery}&display=swap`;

const themeVars = {
  "--c-accent": colors.accent,
  "--c-accent-deep": colors.accentDeep,
  "--c-highlight": colors.highlight,
  "--c-highlight-tint": colors.highlightTint,
  "--c-focus": colors.focus,
  "--c-ink": colors.ink,
  "--c-ink-soft": colors.inkSoft,
  "--c-paper": colors.paper,
  "--c-sand": colors.sand,
  "--c-stone": colors.stone,
  "--c-tint": colors.tint,
  "--font-brand": `"${fonts.sans}", ${fonts.fallback}`,
} as CSSProperties;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={brand.locale} style={themeVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript(reel.enabled) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={fontHref} />
      </head>
      <body className="min-h-dvh">
        <MotionProvider>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
          >
            {ui.skipToContent}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
        </MotionProvider>
      </body>
    </html>
  );
}
