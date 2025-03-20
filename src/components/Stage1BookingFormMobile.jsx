import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Stage1BookingFormDesktop = ({ bookingDetails, onNextStep }) => {
  const [formData, setFormData] = useState({
    ...bookingDetails,
    Date: bookingDetails.Date ? new Date(bookingDetails.Date) : null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, Date: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep(formData);
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
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
        onClick={onClick}
        ref={ref}
        value={value}
        readOnly
        className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none pl-10"
        placeholder="DD/MM/YYYY"
      />
    </div>
  ));

  // Add display name
  CustomInput.displayName = "CustomInput";

  return (
    <div className="w-5/6 mx-auto mt-12 font-sans">
      <div className="pt-2 min-[2560px]:pt-6 mr-4 bg-white rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-10  text-2xl min-[2560px]:text-3xl font-semibold text-gray-700 ">
            Book Appointment
          </h2>

          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Name
            </label>
            <input
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Email Address
            </label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div className="mb-3 min-[2560px]:mt-1">
            <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
              Telephone
            </label>
            <input
              type="tel"
              name="Telephone"
              value={formData.Telephone}
              onChange={handleChange}
              className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="mb-3 min-[2560px]:mt-1">
              <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
                Date
              </label>
              <DatePicker
                selected={formData.Date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                customInput={<CustomInput />}
                wrapperClassName="w-full"
                showPopperArrow={false}
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium text-gray-700 text-md min-[2560px]:text-lg">
                Deposit Amount
              </label>
              <div className="relative min-[2560px]:text-lg">
                <select
                  name="DepositAmount"
                  value={formData.DepositAmount}
                  onChange={handleChange}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='7.5' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23555' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.65rem center",
                    backgroundSize: "0.65rem auto",
                  }}
                  className="block p-3 pl-4 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded w-35 min-[2560px]:w-40 focus:outline-none appearance-none"
                >
                  <option>£60</option>
                  <option>£100</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-10 text-left">
            <button
              type="submit"
              className="px-11 min-[2560px]:px-14 py-4.5 min-[2560px]:py-6 mt-5 font-semibold text-lg min-[2560px]:text-xl text-white bg-red-500 rounded-4xl  focus:outline-none hover:scale-102"
            >
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Stage1BookingFormDesktop.propTypes = {
  bookingDetails: PropTypes.object.isRequired,
  onNextStep: PropTypes.func.isRequired,
};

export default Stage1BookingFormDesktop;
