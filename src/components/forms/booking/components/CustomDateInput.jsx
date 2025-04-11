import React from "react";
import PropTypes from "prop-types";

const CustomDateInput = React.forwardRef(({ value, onClick, id }, ref) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </div>
    <input
      type="text"
      id={id}
      name="datePicker"
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      className="block w-full p-3.5 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none pl-10 text-[15px] placeholder:text-[15px]"
      placeholder="DD/MM/YYYY"
      aria-label="Date picker"
    />
  </div>
));

CustomDateInput.displayName = "CustomDateInput";

CustomDateInput.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CustomDateInput;
