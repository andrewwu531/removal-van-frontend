import { serviceMetadata } from "../constants/serviceMetadata";
import logo from "../../../assets/logo.png";

export const getServiceMetadata = (service, location = "") => {
  const baseMetadata = serviceMetadata[service];
  if (!baseMetadata) return null;

  const locationSuffix = location ? ` in ${location}` : "";
  const companyName = "Trade Specialists";
  const websiteUrl = "https://trade-specialists.com";

  return {
    ...baseMetadata,
    title: location
      ? `${baseMetadata.title}${locationSuffix}`
      : baseMetadata.title,
    schema: {
      "@context": "https://schema.org",
      ...baseMetadata.schema,
      name: companyName,
      alternateName: "Leading Provider for UK Professional Trade Services",
      description:
        "Our services include removal, house renovation, painting, carpet & flooring, bathroom & kitchen, window & door, exterior & roofing, solar panels, and commercial services",
      provider: {
        "@type": "LocalBusiness",
        name: companyName,
        logo: {
          "@type": "ImageObject",
          url: logo,
        },
        image: logo,
        address: {
          "@type": "PostalAddress",
          addressCountry: "GB",
          addressRegion: "Scotland",
          addressLocality: location || "Scotland",
        },
        telephone: "07700 101047",
        url: websiteUrl,
        priceRange: "£",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Trade Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Removal Services",
              },
            },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "House Renovation",
            //   },
            // },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "Painting",
            //   },
            // },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "Carpet & Flooring",
            //   },
            // },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "Bathroom & Kitchen",
            //   },
            // },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "Window & Door",
            //   },
            // },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "Exterior & Roofing",
            //   },
            // },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "Solar Panels",
            //   },
            // },
            // {
            //   "@type": "Offer",
            //   itemOffered: {
            //     "@type": "Service",
            //     name: "Commercial Services",
            //   },
            // },
          ],
        },
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: websiteUrl,
        servicePhone: "07700 101047",
      },
    },
  };
};
