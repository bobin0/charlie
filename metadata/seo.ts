import type { Metadata } from "next";

export const SITE = {
  name: "Charlie Night Club",
  tagline: "The Night Starts Here",
  description:
    "Charlie is an ultra-premium nightlife destination — world-class DJs, VIP bottle service, signature cocktails and a cinematic, immersive atmosphere. Reserve your night.",
  url: "https://charlie-club.example",
  locale: "en_US",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "nightclub",
    "VIP tables",
    "bottle service",
    "luxury nightlife",
    "DJ events",
    "Charlie Night Club",
    "premium club",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  manifest: "/site.webmanifest",
};

/** schema.org structured data for a nightclub venue. */
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "NightClub",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/og.svg`,
  priceRange: "$$$$",
  servesCuisine: "Cocktails",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Aurora Boulevard",
    addressLocality: "Metropolis",
    addressCountry: "EU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "23:00",
      closes: "06:00",
    },
  ],
  sameAs: [
    "https://instagram.com",
    "https://www.tiktok.com",
    "https://soundcloud.com",
  ],
};
