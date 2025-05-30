import React, { useState } from "react";
import BookingFormFields from "./components/BookingFormFields";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "./components/CustomDateInput";
import PropTypes from "prop-types";

const Stage1BookingForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Telephone: "",
    DepositAmount: "45.00",
    Date: new Date().toISOString(),
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const defaultMessage = `Hi Trade Specialists,

I’m planning a house/business removal and I would like to confirm a booking. Here are my details.


• Full Name:
• Email Address:
• Pickup Location:
• Destination Location:
• Preferred Removal Date(s):
• Number of Bedrooms/ Approximate Office Size for Removal:
• Photos of Furniture for Removal:

I am looking forward to your reply.

Thank you`;

  const handlePhoneClick = (e) => {
    e.preventDefault();
    const phoneNumber = "07943059792";
    const encodedMessage = encodeURIComponent(defaultMessage);
    window.location.href = `sms:${phoneNumber}?body=${encodedMessage}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, Date: date ? date.toISOString() : "" });
  };
  const validateForm = () =>
    formData.FullName.trim() &&
    formData.Email.match(/^[^\s@]+@[^\s@]+$/) &&
    formData.Telephone.trim() &&
    formData.Date;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsProcessing(true);

    // Optionally, store booking details in backend here
    setIsProcessing(false);
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="px-6 mb-10 text-2xl font-semibold text-gray-700">
        Book Appointment
      </h2>
      <div className="px-6 pb-16">
        <BookingFormFields formData={formData} handleChange={handleChange} />
        <div className="flex flex-row space-x-3 max-[414px]:flex-col max-[414px]:space-x-0 max-[414px]:space-y-3">
          <div className="w-2/3 mb-3 max-[414px]:w-full">
            <label
              htmlFor="bookingDate"
              className="block font-medium text-gray-700 text-md"
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
          <div className="w-1/2 max-[414px]:w-full mb-3">
            <label
              id="deposit-amount-label"
              htmlFor="depositAmount"
              className="block font-medium text-gray-700 text-md"
            >
              Deposit Amount
            </label>
            <div className="relative">
              <select
                id="depositAmount"
                name="DepositAmount"
                value={formData.DepositAmount}
                onChange={handleChange}
                autoComplete="off"
                aria-labelledby="deposit-amount-label"
                className="block w-full pl-4 pr-10 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] appearance-none"
              >
                <option value="45.00">£45</option>
                <option value="80.00">£80</option>
                <option value="1.00">£1 (Test)</option>
              </select>
              <span
                className="absolute inset-y-0 flex items-center text-black pointer-events-none"
                style={{ right: "7px", top: "1px " }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="p-5 mt-8 rounded-lg bg-blue-50">
          <p className="px-2 py-1 text-blue-800">
            Before booking an appointment, please text us at{" "}
            <a
              href={`sms:07943059792?body=${encodeURIComponent(defaultMessage)}`}
              onClick={handlePhoneClick}
              className="text-blue-600 underline hover:text-blue-800"
            >
              (+44) 07943 059 792
            </a>{" "}
            to confirm availability.
          </p>
        </div>
        <div className="mt-2 text-left">
          <button
            type="submit"
            disabled={isProcessing}
            className={`px-11 py-4.5 mt-8 font-semibold text-lg text-white ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:scale-102"
            } rounded-4xl focus:outline-none`}
          >
            {isProcessing ? "Processing..." : "Next Step"}
          </button>
        </div>
      </div>
    </form>
  );
};

Stage1BookingForm.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Stage1BookingForm;
