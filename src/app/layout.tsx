import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost, Tiro_Devanagari_Hindi } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import JsonLd from "@/components/site/JsonLd";
import { Toaster } from "@/components/ui/sonner";
import { localBusinessSchema, siteNavigationSchema, websiteSchema } from "@/lib/schema";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Display serif for headings (the high-contrast "wedding invitation" look),
// a geometric sans for body and letter-spaced labels, and a Devanagari face for Hindi.
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const hindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-hindi",
  display: "swap",
});

const DEFAULT_TITLE = "Shiv Band™ | Best Wedding Brass Band in Delhi NCR · Since 1996";
const DEFAULT_DESC =
  "Shiv Band & Light House (Krishna Nagar, Delhi): Premier wedding brass band, decorated ghodi, flower baggi rath, Punjabi dhol wale & chhatri lights across Delhi NCR since 1996. Call 98186 26259.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | Shiv Band" },
  description: DEFAULT_DESC,
  applicationName: SITE.shortName,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Wedding services",
  keywords: [
    "Shiv Band",
    "Shiv Band Delhi",
    "Shiv Band Krishna Nagar",
    "Shiv Band and Light House",
    "Shiv Band & Light House",
    "Shiv Band contact number",
    "Shiv Band price",
    "Shiv Band reviews",
    "Shiv Band official website",
    "best wedding bands near me",
    "best baraat band near me",
    "wedding band in Delhi",
    "ghodi for wedding",
    "baggi for wedding",
    "best dhol wale near me",
    "band baaja Krishna Nagar",
    "शिव बैंड",
    "शिव बैंड दिल्ली",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE.shortName,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESC },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: "yaqyzThHhOLNza_fze_DUgBxV7hd9RdDU989ug4C-Vo",
    // Bing Webmaster Tools → Add site → "HTML Meta Tag": paste only the content value into this env var.
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Krishna Nagar, New Delhi",
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F4EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${hindi.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon" />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={[localBusinessSchema(), websiteSchema(), siteNavigationSchema()]} />
        <ThemeProvider>
          <AuthProvider>
            <AnalyticsTracker />
            {children}
            <Toaster richColors position="top-right" closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
