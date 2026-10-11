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
      "Shiv Band & Light House | Best Wedding Band in Delhi | Baraat Band, Ghodi, Baggi & Dhol Wale",
    template: "%s | Shiv Band & Light House Delhi",
  },
  description:
    "Shiv Band & Light House (Krishna Nagar & Old Govindpura, New Delhi-110051) — Serving Delhi NCR since 1996. Book the best wedding band & baraat band near me, royal ghodi (ghori wala), flower baggi (rath chariot), Punjabi dhol wale & vintage fancy lighting. Call Manish Kumar: 098186 26259.",
  keywords: [
    "Shiv Band & Light House",
    "Shiv Band and Light House",
    "Shiv Band Light House",
    "Shiv Band",
    "Shiv Band Delhi",
    "Shiv Band Krishna Nagar",
    "Shiv Band Old Govindpura",
    "Shiv Band Parwana Road",
    "Shiv Band Geeta Colony",
    "Shiv Band East Delhi",
    "Shiv Band 9818626259",
    "Shiv Band 9818622259",
    "Manish Kumar Shiv Band",
    "शिव बैंड & लाइट हाउस",
    "शिव बैंड एंड लाइट हाउस कृष्णा नगर दिल्ली",
    "best wedding band near me",
    "nearest wedding band near me",
    "wedding bands near me",
    "best wedding band in Delhi",
    "best baraat band near me",
    "baraat band near me",
    "barat band near me",
    "band baaja near me",
    "nearest baggi near me",
    "best baggi near me",
    "best baggi wala near me",
    "wedding baggi near me",
    "flower baggi near me",
    "wedding rath chariot near me",
    "best ghodi wala near me",
    "best ghodi near me",
    "nearest ghodi near me",
    "ghodi wala near me",
    "ghori wala near me",
    "wedding white horse near me",
    "best dhol wale near me",
    "dhol wale near me",
    "nearest dhol wale near me",
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
      { url: "/favicon.ico", sizes: "192x192", type: "image/png" },
      { url: "/icon", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
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
      "Shiv Band & Light House | Best Wedding Band in Delhi | Baraat Band, Ghodi, Baggi & Dhol Wale",
    description:
      "Serving Delhi NCR since 1996. Live wedding brass band, baraat band, Punjabi dhol wale, royal ghodi (ghori wala), flower baggi (rath chariot) & fancy lighting in Krishna Nagar, Old Govindpura, New Delhi. Call 098186 26259.",
    images: [
      {
        url: "/images/50.jpg",
        width: 1200,
        height: 630,
        alt: "Shiv Band & Light House - Best Wedding Band, Baraat Band, Ghodi, Baggi, Dhol Wale & Fancy Lighting in Krishna Nagar, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shiv Band & Light House | Best Wedding Band, Baraat Band, Ghodi, Baggi & Dhol Wale in Delhi",
    description:
      "Book royal wedding brass band, baraat band, Punjabi dhol wale, ghodi, flower baggi & fancy lighting in Krishna Nagar, Delhi. Call 098186 26259.",
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
        "Shiv Band",
        "Shiv Band Delhi",
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
        "Shiv Band & Light House has been serving Delhi NCR since 1996, offering royal wedding brass band, baraat band, white wedding horse (ghodi / ghori wala), luxury flower baggi (rath chariot), Punjabi dhol wale, crystal chhatri fancy lighting, and wedding decoration services in Krishna Nagar, Old Govindpura, New Delhi.",
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
        { "@type": "Place", name: "Geeta Colony, Delhi" },
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
        name: "Wedding Baraat Band, Ghodi, Baggi, Dhol Wale & Fancy Lighting Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Royal Wedding Brass Band & Baraat Symphony",
              alternateName: [
                "Best Wedding Band Near Me",
                "Nearest Wedding Band Near Me",
                "Best Baraat Band Near Me",
                "Best Wedding Band in Delhi",
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Royal Groom Ghodi / Ghori Wala Service",
              alternateName: [
                "Best Ghodi Wala Near Me",
                "Best Ghodi Near Me",
                "White Wedding Horse Ghodi",
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Luxury Flower Baggi & Bahubali Rath Chariot",
              alternateName: [
                "Nearest Baggi Near Me",
                "Best Baggi Near Me",
                "Wedding Flower Baggi",
              ],
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Punjabi Dhol Wale & Nashik Tasha Ensembles",
              alternateName: [
                "Best Dhol Wale Near Me",
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
        "Shiv Band",
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
          name: "Which is the best wedding band, baraat band, ghodi wala, and baggi service near me in Delhi NCR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shiv Band & Light House (D-96 / C-40, Parwana Road, Old Govindpura, Krishna Nagar, New Delhi-110051) has served 1,000+ weddings since 1996. Whether you search for the best wedding band near me, best baraat band near me, best ghodi wala near me (ghori), best baggi near me (flower baggi & rath), or best dhol wale near me (Punjabi dhol), we deliver complete royal baraat services across Delhi NCR.",
          },
        },
        {
          "@type": "Question",
          name: "How do I book Shiv Band & Light House for a wedding baraat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Book online at https://shiv-band.vercel.app/contact or call/WhatsApp owner Manish Kumar directly at +91 98186 26259 or +91 98186 22259. Our shop is open daily from 9:00 AM to 9:00 PM at Parwana Road, Old Govindpura, Krishna Nagar, Delhi-110051.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide separate bookings for Ghodi, Flower Baggi, or Punjabi Dhol Wale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! You can book individual services—such as Punjabi dhol wale, a royal white wedding horse (ghodi / ghori), a decorated flower baggi (rath chariot), or fancy chhatri lighting—or combine them into an all-in-one baraat package.",
          },
        },
      ],
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shiv Band & Light House",
  alternateName: ["Shiv Band", "Shiv Band and Light House", "shiv-band.vercel.app"],
  url: "https://shiv-band.vercel.app/",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
