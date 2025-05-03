import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { getServiceMetadata } from "./utils/metadata";

export default function MetaTags({ service, location }) {
  // Determine if this is the homepage
  const isHomePage = !service || service === "home" || service === "";

  // Determine if this is the removal page
  const isRemovalPage =
    service &&
    service
      .toLowerCase()
      .replace(/\s+&\s+/g, "-")
      .replace(/\s+/g, "-") === "removal";

  // Set metadata based on page
  let pageTitle, pageDescription, pageKeywords;

  if (isHomePage) {
    pageTitle = "Leading Provider for UK Professional Trade Services";
    pageDescription =
      "Our services include removal, house renovation, painting, carpet & flooring, bathroom & kitchen, window & door, exterior & roofing, solar panels, and commercial services";
    pageKeywords =
      "Removal, House Renovation, Painting, Carpet Flooring, Bathroom Kitchen, Window Door, Exterior Roofing, Solar Panels, Commercial Services, UK, Glasgow, Edinburgh, Scotland";
  } else if (isRemovalPage) {
    pageTitle =
      "Professional Removal Services From £175 | Reliable Home & Business Removal";
    pageDescription =
      "Confirm your removal appointment at (+44) 07943059792. We aim to respond to your enquiry within 5 minutes. Our removal service is available 7 days a week nationwide in the UK.";
    pageKeywords =
      "Removal Services, Man in a Van, UK, Home Removal, Business Removal, Glasgow, Edinburgh, Scotland";
  } else {
    // fallback to service-specific or default
    const metadata = getServiceMetadata(service, location);
    pageTitle =
      metadata?.title || "Leading Provider for UK Professional Trade Services";
    pageDescription =
      metadata?.description ||
      "Our services include removal, house renovation, painting, carpet & flooring, bathroom & kitchen, window & door, exterior & roofing, solar panels, and commercial services";
    pageKeywords =
      metadata?.keywords ||
      "Removal, House Renovation, Painting, Carpet Flooring, Bathroom Kitchen, Window Door, Exterior Roofing, Solar Panels, Commercial Services, UK, Glasgow, Edinburgh, Scotland";
  }

  // Build canonical URL
  const currentUrl = isHomePage
    ? "https://trade-specialists.com/"
    : `https://trade-specialists.com/${service
        .toLowerCase()
        .replace(/\s+&\s+/g, "-")
        .replace(/\s+/g, "-")}${
        location ? "/" + location.toLowerCase().replace(/\s+/g, "-") : ""
      }`;

  // Example for /removal page
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://trade-specialists.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Removal",
        item: "https://trade-specialists.com/removal",
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Trade Specialists",
    image: "https://trade-specialists.com/logo.png",
    telephone: "+44 7700 101047",
    url: "https://trade-specialists.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
      addressRegion: "Scotland",
    },
  };

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
      <meta
        property="og:image"
        content="https://trade-specialists.com/logo.png"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta
        name="twitter:image"
        content="https://trade-specialists.com/logo.png"
      />

      <link rel="canonical" href={currentUrl} />
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessJsonLd)}
      </script>
    </Helmet>
  );
}

MetaTags.propTypes = {
  service: PropTypes.string,
  location: PropTypes.string,
};
