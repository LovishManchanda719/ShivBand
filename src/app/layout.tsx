import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost, Tiro_Devanagari_Hindi } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import JsonLd from "@/components/site/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
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

const DEFAULT_TITLE = "Shiv Band & Light House | Best Wedding Band, Baraat Band, Ghodi, Baggi & Dhol Wale in Delhi";
const DEFAULT_DESC =
  "Shiv Band & Light House, Krishna Nagar, Delhi — live wedding band and baraat band, decorated ghodi, flower baggi, dhol wale and chhatri lights across Delhi NCR since 1996. Call 98186 26259.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | Shiv Band & Light House" },
  description: DEFAULT_DESC,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Wedding services",
  keywords: [
    "Shiv Band",
    "Shiv Band and Light House",
    "Shiv Band & Light House",
    "best wedding bands near me",
    "best baraat band near me",
    "ghodi for wedding",
    "baggi for wedding",
    "best dhol wale near me",
    "wedding band in Delhi",
    "band baaja Krishna Nagar",
    "शिव बैंड",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE.name,
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
      <body suppressHydrationWarning>
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <ThemeProvider>
          <AuthProvider>
            <AnalyticsTracker />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
