import { useState } from "react";
import PropTypes from "prop-types";
import { fallbackImages } from "../../traders/constants/fallbackImages";

export default function ImageWithFallback({
  src,
  alt,
  className,
  serviceType = "Removal",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      console.log(
        "Image failed to load, using fallback for service:",
        serviceType
      );
      console.log("Available fallback images:", fallbackImages);
      const fallbackSrc =
        fallbackImages[serviceType] || fallbackImages["Removal"];
      console.log("Using fallback image:", fallbackSrc);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  serviceType: PropTypes.string,
};
