import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { getServiceMetadata } from "./utils/metadata";

export default function MetaTags({ service, location }) {
  const metadata = getServiceMetadata(service, location);

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      {/* Open Graph */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(metadata.schema)}
      </script>
      {/* Simplified canonical URL */}
      <link rel="canonical" href="https://trade-specialists.com" />
    </Helmet>
  );
}

MetaTags.propTypes = {
  service: PropTypes.string.isRequired,
  location: PropTypes.string,
};
