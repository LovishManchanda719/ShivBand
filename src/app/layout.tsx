import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://shiv-band.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Shiv Band & Light House | Best Wedding Band, Ghodi, Buggy, Dhol & Fancy Lighting in Delhi",
    template: "%s | Shiv Band & Light House Delhi",
  },
  description:
    "Shiv Band & Light House (Krishna Nagar & Old Govindpura, New Delhi-110051) — Serving Delhi NCR since 1996. Book the best wedding brass band near me, royal ghodi (ghoddii wala), flower buggy (baggi & rath chariot), Punjabi dhol (ddhol wale) & vintage fancy lighting. Call Manish Kumar: 098186 26259.",
  keywords: [
    "Shiv Band & Light House",
    "Shiv Band and Light House",
    "Shiv Band Light House",
    "Shiv Band",
    "ShiftBand",
    "Shift Band and Light House",
    "ShiftBand Lighthouse",
    "Shiv Band Delhi",
    "Shiv Band Krishna Nagar",
    "Shiv Band Old Govindpura",
    "Shiv Band Parwana Road",
    "Shiv Band 9818626259",
    "Shiv Band 9818622259",
    "Manish Kumar Shiv Band",
    "शिव बैंड & लाइट हाउस",
    "शिव बैंड एंड लाइट हाउस कृष्णा नगर दिल्ली",
    "wedding bands near me",
    "nearest wedding band near me",
    "best wedding band near me",
    "baraat band near me",
    "barat band near me",
    "band baaja near me",
    "nearest buggy near me",
    "best buggy near me",
    "wedding buggy near me",
    "flower baggi near me",
    "best baggi wala near me",
    "wedding rath chariot near me",
    "best ghoddii wala near me",
    "best ghoddii near me",
    "ghodi wala near me",
    "best ghodi near me",
    "ghori wala near me",
    "wedding white horse near me",
    "best ddhol wale near me",
    "dhol wale near me",
    "best dhol player near me",
    "punjabi dhol near me",
    "fancy light house near me",
    "chhatri light wala near me",
    "wedding band in Krishna Nagar Delhi",
    "best baraat band in East Delhi",
  ],
  authors: [{ name: "Shiv Band & Light House - Manish Kumar" }],
  creator: "Shiv Band & Light House",
  publisher: "Shiv Band & Light House",
  applicationName: "Shiv Band & Light House",
  category: "Wedding & Event Services",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Shiv Band & Light House",
    title:
      "Shiv Band & Light House | Best Wedding Band, Ghodi, Buggy, Dhol & Fancy Lighting in Delhi",
    description:
      "Serving Delhi NCR since 1996. Live wedding brass band, Punjabi dhol (ddhol wale), royal ghodi (ghoddii wala), flower buggy (baggi & rath) & fancy lighting in Krishna Nagar, Old Govindpura, New Delhi. Call 098186 26259.",
    images: [
      {
        url: "/images/50.jpg",
        width: 1200,
        height: 630,
        alt: "Shiv Band & Light House - Wedding Brass Band, Ghodi, Buggy, Dhol & Fancy Lighting in Krishna Nagar, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shiv Band & Light House | Best Wedding Band, Ghodi, Buggy & Dhol in Delhi",
    description:
      "Book royal wedding brass band, Punjabi dhol (ddhol wale), ghodi (ghoddii), flower buggy (baggi) & fancy lighting in Krishna Nagar, Delhi. Call 098186 26259.",
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
  verification: {
    google: "yaqyzThHhOLNza_fze_DUgBxV7hd9RdDU989ug4C-Vo",
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
        "ShiftBand",
        "Shift Band and Light House",
        "Shiv Band Krishna Nagar",
        "शिव बैंड & लाइट हाउस",
      ],
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      image: [
        `${SITE_URL}/images/50.jpg`,
        `${SITE_URL}/images/1.jpg`,
        `${SITE_URL}/images/2.jpg`,
        `${SITE_URL}/images/3.jpg`,
      ],
      description:
        "Shiv Band & Light House has been serving Delhi NCR since 1996, offering royal wedding brass band, baraat band, white wedding horse (ghodi / ghori / ghoddii wala), luxury flower buggy (baggi / rath chariot), Punjabi dhol (ddhol wale), crystal chhatri fancy lighting, and wedding decoration services in Krishna Nagar, Old Govindpura, New Delhi.",
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
        { "@type": "Place", name: "Laxmi Nagar, Delhi" },
        { "@type": "Place", name: "Shahdara, Delhi" },
        { "@type": "Place", name: "East Delhi" },
        { "@type": "Place", name: "Noida" },
        { "@type": "Place", name: "Gurgaon" },
        { "@type": "Place", name: "Ghaziabad" },
        { "@type": "Place", name: "Delhi NCR" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wedding Barat, Band, Ghodi, Buggy, Dhol & Lighting Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Royal Wedding Brass Band & Baraat Symphony",
              alternateName: [
                "Nearest Wedding Band Near Me",
                "Best Wedding Band in Delhi",
                "Baraat Band Baaja",
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Royal Groom Ghodi / Ghori / Ghoddii Wala Service",
              alternateName: [
                "Best Ghoddii Wala Near Me",
                "Best Ghoddii Near Me",
                "White Wedding Horse Ghodi",
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Luxury Flower Buggy / Baggi & Bahubali Rath Chariot",
              alternateName: [
                "Nearest Buggy Near Me",
                "Best Buggy Near Me",
                "Wedding Flower Baggi",
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Punjabi Dhol / Ddhol Wale & Nashik Tasha Ensembles",
              alternateName: [
                "Best Ddhol Wale Near Me",
                "Dhol Wale Near Me",
                "Punjabi Wedding Dhol Players",
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Vintage Fancy Light House & Crystal Chhatri Umbrellas",
              alternateName: [
                "Fancy Light House Near Me",
                "Baraat Chhatri Lights",
                "Wedding Illumination",
              ],
            },
          },
        ],
      },
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
      alternateName: [
        "Shiv Band and Light House",
        "ShiftBand",
        "Shiv Band Delhi",
      ],
      publisher: {
        "@id": `${SITE_URL}/#localbusiness`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Which is the best wedding band, ghoddii wala, and buggy service near me in Delhi NCR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shiv Band & Light House (D-96 / C-40, Parwana Road, Old Govindpura, Krishna Nagar, New Delhi-110051) has served 1,000+ weddings since 1996. Whether you search for the nearest wedding band near me, best ghoddii wala near me (ghodi/ghori), best buggy near me (flower baggi/rath), or best ddhol wale near me (Punjabi dhol), we deliver complete royal baraat services across Delhi NCR.",
          },
        },
        {
          "@type": "Question",
          name: "How do I book Shiv Band & Light House (or ShiftBand) for a wedding baraat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Book online at https://shiv-band.vercel.app/contact or call/WhatsApp owner Manish Kumar directly at +91 98186 26259 or +91 98186 22259. Our shop is open daily from 9:00 AM to 9:00 PM at Parwana Road, Old Govindpura, Krishna Nagar, Delhi-110051.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide separate bookings for Ghodi (Ghoddii), Flower Buggy (Baggi), or Punjabi Dhol (Ddhol Wale)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! You can book individual services—such as Punjabi dhol players (ddhol wale), a royal white wedding horse (ghodi / ghori / ghoddii), a decorated flower buggy (baggi / rath chariot), or fancy chhatri lighting—or combine them into an all-in-one baraat package.",
          },
        },
      ],
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
          <AuthProvider>
            <AnalyticsTracker />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
