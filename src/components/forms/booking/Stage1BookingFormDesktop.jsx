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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, Date: date });
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
                  customInput={<CustomDateInput />}
                  wrapperClassName="w-full"
                  showPopperArrow={false}
                />
              </div>

              <div className="mb-3">
                <label
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
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='7.5' viewBox='0 0 14 8'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23555' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.65rem center",
                      backgroundSize: "0.65rem auto",
                    }}
                    className="block p-3 pl-4 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded w-35 min-[2560px]:w-40 focus:outline-none appearance-none text-[15px]"
                  >
                    <option>£60</option>
                    <option>£100</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 mt-8 rounded-lg bg-blue-50">
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
