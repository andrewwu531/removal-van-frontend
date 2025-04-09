import React from "react";
import PropTypes from "prop-types";

const ImageWithFallback = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = "/fallback-image.png";
  };

  return (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ImageWithFallback;
