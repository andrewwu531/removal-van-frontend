import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "./components/CustomDateInput";
import BookingFormFields from "./components/BookingFormFields";

const Stage1BookingFormDesktop = ({ onNextStep }) => {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Telephone: "",
    DepositAmount: "60.00",
    Date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const dateString = date ? date.toISOString() : "";
    setFormData({ ...formData, Date: dateString });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    onNextStep(formData);
  };

  return (
    <div className="w-full mx-auto font-sans">
      <div className="px-4 pt-2 min-[2560px]:pt-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="pt-10 mb-10 text-2xl min-[2560px]:text-3xl font-semibold text-gray-700 px-6">
            Book Appointment
          </h2>

          <div className="px-6 pb-16">
            <BookingFormFields
              formData={formData}
              handleChange={handleChange}
            />
            <div className="min-[500px]:flex min-[500px]:flex-row min-[500px]:space-x-4">
              <div className="mb-3 min-[2560px]:mt-1 w-full min-[500px]:w-auto">
                <label
                  htmlFor="bookingDate"
                  className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
                >
                  Date
                </label>
                <DatePicker
                  id="bookingDate"
                  selected={formData.Date ? new Date(formData.Date) : null}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  customInput={<CustomDateInput id="bookingDate" />}
                  wrapperClassName="w-full"
                  showPopperArrow={false}
                  autoComplete="off"
                  aria-labelledby="booking-date-label"
                />
              </div>

              <div className="mb-3 w-1/2 min-[500px]:w-auto">
                <label
                  id="deposit-amount-label"
                  htmlFor="depositAmount"
                  className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
                >
                  Deposit Amount
                </label>
                <div className="relative min-[2560px]:text-lg">
                  <select
                    id="depositAmount"
                    name="DepositAmount"
                    value={formData.DepositAmount}
                    onChange={handleChange}
                    autoComplete="off"
                    aria-labelledby="deposit-amount-label"
                    className="block w-full min-[500px]:w-35 min-[2560px]:w-40 px-4 pr-7 py-3.5 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] appearance-none"
                  >
                    <option value="60.00">£60</option>
                    <option value="100.00">£100</option>
                  </select>
                  <div className="absolute inset-y-0 flex items-center mt-1 pointer-events-none right-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 mt-8 rounded-lg bg-blue-50">
              <p className="px-2 py-1 text-blue-800">
                Before booking an appointment, please contact us by phone or
                text via (+44) 7943 059 792 to confirm availability.
              </p>
            </div>
            <div className="mt-2 text-left">
              <button
                type="submit"
                className="px-11 min-[2560px]:px-14 py-4.5 min-[2560px]:py-6 mt-5 font-semibold text-lg min-[2560px]:text-xl text-white bg-red-500 rounded-4xl focus:outline-none hover:scale-102"
              >
                Next Step
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Stage1BookingFormDesktop.propTypes = {
  onNextStep: PropTypes.func.isRequired,
};

export default Stage1BookingFormDesktop;
