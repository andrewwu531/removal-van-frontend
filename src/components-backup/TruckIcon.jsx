import React from "react";
import PropTypes from "prop-types";

const TruckIcon = ({
  width,
  height,
  primaryColor,
  secondaryColor,
  wheelColor,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Truck Trailer */}
    <rect
      x="2"
      y="20"
      width="40"
      height="20"
      rx="3"
      fill={primaryColor}
      stroke="#000"
      strokeWidth="1"
    />
    {/* Truck Cab */}
    <rect
      x="42"
      y="26"
      width="18"
      height="14"
      rx="3"
      fill={secondaryColor}
      stroke="#000"
      strokeWidth="1"
    />
    {/* Front Wheel */}
    <circle
      cx="14"
      cy="44"
      r="4"
      fill={wheelColor}
      stroke="#000"
      strokeWidth="1"
    />
    {/* Rear Wheel */}
    <circle
      cx="34"
      cy="44"
      r="4"
      fill={wheelColor}
      stroke="#000"
      strokeWidth="1"
    />
  </svg>
);

TruckIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  wheelColor: PropTypes.string,
};

TruckIcon.defaultProps = {
  width: 64,
  height: 64,
  primaryColor: "#FFFFFF", // White for the main truck body
  secondaryColor: "#CBD5E1", // Light blue-gray for secondary details
  wheelColor: "#F97316", // Vibrant orange for the wheels
};

export default TruckIcon;
