import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { getServiceMetadata } from "./utils/metadata";

export default function MetaTags({ service, location }) {
  const metadata = getServiceMetadata(service, location);
  const currentUrl = `https://trade-specialists.com/${service
    .toLowerCase()
    .replace(/\s+&\s+/g, "-")
    .replace(
      /\s+/g,
      "-"
    )}${location ? "/" + location.toLowerCase().replace(/\s+/g, "-") : ""}`;

  // Default site-wide metadata
  const defaultMetadata = {
    title:
      "Trade Specialists | Leading provider of professional trade services in Scotland",
    description:
      "Expert contractors for removals, renovations, painting, flooring, and more.",
    keywords:
      "removal services, house renovation, painting services, flooring services",
  };

  // Use service-specific metadata if available, otherwise use default
  const pageTitle = metadata?.title || defaultMetadata.title;
  const pageDescription = metadata?.description || defaultMetadata.description;
  const pageKeywords = metadata?.keywords || defaultMetadata.keywords;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Trade Specialists" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(
          metadata?.schema || {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Trade Specialists",
            description: defaultMetadata.description,
            url: "https://trade-specialists.com",
            logo: {
              "@type": "ImageObject",
              url: "https://trade-specialists.com/logo.png",
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "GB",
              addressRegion: "Scotland",
            },
            telephone: "+447943059792",
            email: "contact@trade-specialists.com",
            priceRange: "££",
            areaServed: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: "55.9533",
                longitude: "-3.1883",
              },
              geoRadius: "100 mi",
            },
          }
        )}
      </script>

      {/* Dynamic canonical URL */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
}

MetaTags.propTypes = {
  service: PropTypes.string.isRequired,
  location: PropTypes.string,
};
