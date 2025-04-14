import { serviceMetadata } from "../constants/serviceMetadata";
import logo from "../../../assets/logo.png";

export const getServiceMetadata = (service, location = "") => {
  const baseMetadata = serviceMetadata[service];
  if (!baseMetadata) return null;

  const locationSuffix = location ? ` in ${location}` : "";
  const companyName = "Trade Specialists"; // Replace with your actual company name
  const websiteUrl = "https://trade-specialists.com";

  return {
    ...baseMetadata,
    title: location
      ? `${baseMetadata.title}${locationSuffix}`
      : baseMetadata.title,
    schema: {
      "@context": "https://schema.org",
      ...baseMetadata.schema,
      name: `${service} Services${locationSuffix}`,
      provider: {
        "@type": "LocalBusiness",
        name: companyName,
        address: {
          "@type": "PostalAddress",
          addressCountry: "GB",
          // Add more specific address details
          addressRegion: "Scotland", // Update as needed
          addressLocality: location || "Scotland", // Update as needed
        },
        telephone: "7943059792", // Add your business phone
        url: websiteUrl,
        image: logo,
        priceRange: "£", // Add your price range
        // aggregateRating: {
        //   "@type": "AggregateRating",
        //   ratingValue: "4.8", // Update with your actual rating
        //   reviewCount: "100", // Update with your actual review count
        // },
      },
      //   areaServed: {
      //     "@type": "GeoCircle",
      //     geoMidpoint: {
      //       "@type": "GeoCoordinates",
      //       latitude: "51.5074", // Update for your service area
      //       longitude: "-0.1278", // Update for your service area
      //     },
      //     geoRadius: "50 mi", // Update for your service radius
      //   },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: websiteUrl,
        servicePhone: "7943059792",
      },
    },
  };
};
