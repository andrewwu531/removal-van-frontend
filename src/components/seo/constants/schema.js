import logo from "../../../assets/logo.png";

// Base organization schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trade Specialists",
  url: "https://trade-specialists.com",
  logo: logo,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "07453 610 625",
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: "English",
  },
};

// Base local business schema
export const localBusinessSchema = {
  "@type": "LocalBusiness",
  name: "Trade Specialists",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressRegion: "Scotland",
  },
  telephone: "07453 610 625",
  url: "https://trade-specialists.com",
  priceRange: "£",
};

// Service schema template
export const serviceSchemaTemplate = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: localBusinessSchema,
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
};

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trade Specialists",
  url: "https://trade-specialists.com",
};
