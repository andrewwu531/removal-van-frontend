import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { getServiceMetadata } from "./utils/metadata";

export default function MetaTags({ service, location }) {
  const metadata = getServiceMetadata(service, location);
  const currentUrl = `https://trade-specialists.com/${service
    .toLowerCase()
    .replace(/\s+&\s+/g, "-")
    .replace(/\s+/g, "-")}${
    location ? "/" + location.toLowerCase().replace(/\s+/g, "-") : ""
  }`;

  // Default site-wide metadata
  const defaultMetadata = {
    title:
      "Trade Specialists | Leading provider of professional trade services in Scotland",
    description:
      "Expert contractors for Removal, House Renovation, Painting, Carpet & Flooring, Bathroom & Kitchen, Window & Door, Exterior & Roofing, Solar Panels, and Commercial services. Contact us now at 07943059792!",
    keywords:
      "trade specialists, removal services, house renovation, painting, carpet flooring, bathroom kitchen, window door, exterior roofing, solar panels, commercial services, scotland",
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
      <meta property="og:image" content="/logo.png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content="/logo.png" />

      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
}

MetaTags.propTypes = {
  service: PropTypes.string.isRequired,
  location: PropTypes.string,
};
