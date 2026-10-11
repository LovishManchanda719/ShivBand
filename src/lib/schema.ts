import { SITE, SITE_URL, AREAS_SERVED } from "./site";
import { SERVICES, type Service, type ServiceFaq } from "./services";

export const BUSINESS_ID = `${SITE_URL}/#business`;

// LocalBusiness: the core entity Google uses for the map pack and brand searches.
// No aggregateRating here on purpose — Google ignores self-published ratings on
// LocalBusiness and hard-coded numbers risk a manual action.
export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EntertainmentBusiness"],
  "@id": BUSINESS_ID,
  name: SITE.name,
  alternateName: SITE.alternateNames,
  description:
    "Shiv Band & Light House is a family-run wedding band in Krishna Nagar, East Delhi, serving Delhi NCR since 1996 with brass band, baraat band, ghodi, flower baggi, rath, dhol wale and chhatri lights.",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: [`${SITE_URL}/images/50.jpg`, `${SITE_URL}/images/107.jpg`, `${SITE_URL}/images/2.jpg`, `${SITE_URL}/images/1.jpg`],
  telephone: SITE.phones[0].tel,
  email: SITE.email,
  foundingDate: String(SITE.foundingYear),
  founder: { "@type": "Person", name: SITE.owner },
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: `${SITE.address.locality}, ${SITE.address.city}`,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
  ],
  contactPoint: SITE.phones.map((p, i) => ({
    "@type": "ContactPoint",
    telephone: p.tel,
    contactType: i === 0 ? "customer service" : "reservations",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "pa"],
  })),
  areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name: `${name}, Delhi NCR` })),
  knowsLanguage: ["en", "hi", "pa"],
  makesOffer: SERVICES.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.h1, url: `${SITE_URL}/services/${s.slug}` },
  })),
  sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube, SITE.mapsUrl],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE.name,
  alternateName: ["Shiv Band", "Shiv Band and Light House"],
  inLanguage: "en-IN",
  publisher: { "@id": BUSINESS_ID },
});

export const serviceSchema = (s: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/${s.slug}#service`,
  name: s.h1,
  serviceType: s.name,
  description: s.metaDescription,
  url: `${SITE_URL}/services/${s.slug}`,
  image: s.images.length ? s.images.map((i) => (i.src.startsWith("http") ? i.src : `${SITE_URL}${i.src}`)) : `${SITE_URL}/opengraph-image`,
  provider: { "@id": BUSINESS_ID },
  areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name: `${name}, Delhi NCR` })),
});

export const faqSchema = (faqs: ServiceFaq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const HOME_FAQS: ServiceFaq[] = [
  {
    q: "Where is Shiv Band & Light House located?",
    a: "Our shop is at D-96, Parwana Road, New Govindpura (near Laxmi Dairy), Krishna Nagar, New Delhi 110051. We are open every day from 10 AM to 9 PM.",
  },
  {
    q: "Which is a good wedding band near me in East Delhi?",
    a: "Shiv Band & Light House has led baraats from Krishna Nagar since 1996 and covers Geeta Colony, Preet Vihar, Laxmi Nagar, Shahdara and the rest of Delhi NCR with brass band, ghodi, baggi, dhol wale and chhatri lights.",
  },
  {
    q: "Can I book ghodi, baggi or dhol separately?",
    a: "Yes. Every service can be booked on its own — only a ghodi, only dhol wale, only lights — or combined into a complete baraat package.",
  },
  {
    q: "How do I book Shiv Band?",
    a: "Call or WhatsApp the owner, Manish Kumar, on 98186 26259 or 98186 22259, or send your date and venue through the booking form. No account or login is needed.",
  },
  {
    q: "Do you serve Noida, Ghaziabad and Gurugram?",
    a: "Yes. We are based in East Delhi and regularly travel to venues in Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad.",
  },
];
