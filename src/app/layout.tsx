import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://shiv-band.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Shiv Band & Light House | Best Wedding Band, Baraat & Fancy Lighting in Krishna Nagar, Delhi",
    template: "%s | Shiv Band & Light House Delhi",
  },
  description:
    "Shiv Band & Light House (Krishna Nagar & Old Govindpura, New Delhi-110051) — Serving Delhi NCR since 1996. Book royal wedding brass band, Punjabi dhol, ghori, flower baggi, rath chariot entry & vintage fancy lighting. Call Manish Kumar: 098186 26259 / 98186 22259.",
  keywords: [
    "Shiv Band & Light House",
    "Shiv Band and Light House",
    "Shiv Band Light House",
    "Shiv Band Delhi",
    "Shiv Band Krishna Nagar",
    "Shiv Band Old Govindpura",
    "Shiv Band Parwana Road",
    "Shiv Band 9818626259",
    "Shiv Band 9818622259",
    "Manish Kumar Shiv Band",
    "शिव बैंड & लाइट हाउस",
    "शिव बैंड एंड लाइट हाउस कृष्णा नगर दिल्ली",
    "Best Wedding Band in Krishna Nagar Delhi",
    "Wedding Barat Band in East Delhi",
    "Ghori Baggi Rath Chariot Fancy Lighting Delhi",
    "Punjabi Dhol Player Service New Delhi",
  ],
  authors: [{ name: "Shiv Band & Light House - Manish Kumar" }],
  creator: "Shiv Band & Light House",
  publisher: "Shiv Band & Light House",
  applicationName: "Shiv Band & Light House",
  category: "Wedding & Event Services",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Shiv Band & Light House",
    title:
      "Shiv Band & Light House | Royal Wedding Band, Baraat & Fancy Lighting in Delhi",
    description:
      "Serving Delhi NCR since 1996. Live wedding brass band, Punjabi dhol, ghori, flower baggi, rath chariot entry & fancy lighting in Krishna Nagar, Old Govindpura, New Delhi. Call 098186 26259.",
    images: [
      {
        url: "/images/50.jpg",
        width: 1200,
        height: 630,
        alt: "Shiv Band & Light House - Wedding Brass Band & Fancy Lighting in Krishna Nagar, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shiv Band & Light House | Best Wedding Band & Fancy Lighting in Delhi",
    description:
      "Book royal wedding brass band, Punjabi dhol, ghori, flower baggi & fancy lighting in Krishna Nagar, Old Govindpura, Delhi. Call 098186 26259.",
    images: ["/images/50.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Krishna Nagar, Old Govindpura, New Delhi",
    "geo.position": "28.646691;77.282187",
    ICBM: "28.646691, 77.282187",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EntertainmentBusiness", "PerformingGroup"],
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Shiv Band & Light House",
      alternateName: [
        "Shiv Band and Light House",
        "Shiv Band Light House",
        "Shiv Band Krishna Nagar",
        "शिव बैंड & लाइट हाउस",
      ],
      url: SITE_URL,
      logo: `${SITE_URL}/images/50.jpg`,
      image: [
        `${SITE_URL}/images/50.jpg`,
        `${SITE_URL}/images/1.jpg`,
        `${SITE_URL}/images/2.jpg`,
        `${SITE_URL}/images/3.jpg`,
      ],
      description:
        "Shiv Band & Light House has been serving Delhi since 1996, offering wedding band, baraat brass band, Punjabi dhol, ghori, crystal fancy lighting, flower baggi, royal chariot (rath) entry, and wedding decoration services in Krishna Nagar, Old Govindpura, New Delhi.",
      foundingDate: "1996",
      founder: {
        "@type": "Person",
        name: "Manish Kumar",
      },
      telephone: "+91-9818626259",
      email: "kumarmanish141980@gmail.com",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "D-96 / C-40, Parwana Rd, Brijpuri Extension, Old Govindpura, near Laxmi Dairy, Krishna Nagar",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110051",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.646691,
        longitude: 77.282187,
      },
      hasMap: "https://maps.google.com/?q=28.646691,77.282187",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9818626259",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi", "pa"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-9818622259",
          contactType: "reservations",
          areaServed: "IN",
          availableLanguage: ["en", "hi", "pa"],
        },
      ],
      areaServed: [
        { "@type": "City", name: "New Delhi" },
        { "@type": "Place", name: "Krishna Nagar, Delhi" },
        { "@type": "Place", name: "Old Govindpura, Delhi" },
        { "@type": "Place", name: "Preet Vihar, Delhi" },
        { "@type": "Place", name: "Delhi NCR" },
      ],
      sameAs: [
        "https://www.instagram.com/shiv_band_and_light_house/",
        "https://www.facebook.com/shivband.lighthouse",
        "https://www.youtube.com/@manishmanchanda4089/videos",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "40",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Shiv Band & Light House",
      alternateName: ["Shiv Band and Light House", "Shiv Band Delhi"],
      publisher: {
        "@id": `${SITE_URL}/#localbusiness`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

