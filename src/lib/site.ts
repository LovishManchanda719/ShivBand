// Single source of truth for business details (NAP), used by pages, footer and structured data.
// Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is connected.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://shiv-band.vercel.app").replace(/\/$/, "");

export const SITE = {
  name: "Shiv Band & Light House",
  shortName: "Shiv Band",
  alternateNames: [
    "Shiv Band",
    "Shiv Band and Light House",
    "Shiv Band & Light House",
    "Shiv Band Light House",
    "Shiv Band Delhi",
    "Shiv Band Krishna Nagar",
    "शिव बैंड",
    "शिव बैंड एंड लाइट हाउस",
  ],
  hindiName: "शिव बैंड एंड लाइट हाउस",
  foundingYear: 1996,
  owner: "Manish Kumar",
  phones: [
    { display: "+91 98186 26259", tel: "+919818626259" },
    { display: "+91 98186 22259", tel: "+919818622259" },
  ],
  whatsapp: "919818626259",
  email: "kumarmanish141980@gmail.com",
  address: {
    street: "D-96, Parwana Road, New Govindpura", // must match Google & Bing listings exactly
    locality: "Krishna Nagar",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110051",
    country: "IN",
  },
  shortAddress: "Parwana Road, New Govindpura, Krishna Nagar, Delhi 110051",
  geo: { lat: 28.6468128, lng: 77.2845662 }, // exact shop location (confirmed by owner)
  hours: { label: "Open daily, 10:00 AM – 9:00 PM", opens: "10:00", closes: "21:00" }, // keep identical to Google Business Profile
  googlePlaceId: "ChIJK8SuKqH8DDkRolBFpoSGbpY",
  mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJK8SuKqH8DDkRolBFpoSGbpY",
  mapsEmbed: "https://maps.google.com/maps?q=28.6468128,77.2845662&z=17&output=embed",
  // Opens the "write a review" box on the Google Business Profile directly.
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJK8SuKqH8DDkRolBFpoSGbpY",
  googleReviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJK8SuKqH8DDkRolBFpoSGbpY",
  social: {
    instagram: "https://www.instagram.com/shiv_band_and_light_house/",
    facebook: "https://www.facebook.com/shivband.lighthouse",
    youtube: "https://www.youtube.com/@manishmanchanda4089/videos",
  },
  // Swap these two files for higher-resolution shots when available.
  heroImage: { desktop: "/images/hero-wedding.jpg", mobile: "/images/hero-wedding.jpg" },
} as const;

export const yearsServing = () => new Date().getFullYear() - SITE.foundingYear;

export const whatsappLink = (text = "Hello Shiv Band, I would like to know about your wedding services.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const telLink = (i = 0) => `tel:${SITE.phones[i].tel}`;

export const AREAS_SERVED = [
  "Krishna Nagar",
  "New Govindpura",
  "Geeta Colony",
  "Gandhi Nagar",
  "Preet Vihar",
  "Laxmi Nagar",
  "Shahdara",
  "Vivek Vihar",
  "Nirman Vihar",
  "Karkardooma",
  "Anand Vihar",
  "Mayur Vihar",
  "Patparganj",
  "Dilshad Garden",
  "East Delhi",
  "Central Delhi",
  "North Delhi",
  "South Delhi",
  "West Delhi",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Gurugram",
  "Faridabad",
];

export const NOTIFY_EMAIL_DEFAULT = "lovishmanchanda719@gmail.com";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/gallery/photos", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];
