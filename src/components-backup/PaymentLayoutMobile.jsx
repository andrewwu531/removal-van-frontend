import PropTypes from "prop-types";

const PaymentLayoutMobile = ({ children }) => (
  <div
    id="booking-form"
    className="scroll-mt-[160px] w-5/6 mx-auto mt-10 mb-15"
  >
    <div className="relative flex items-center justify-start mx-auto mb-1 text-white bg-indigo-600 rounded-lg py-7">
      <h1 className="pl-6 text-xl font-semibold">Book Appointment</h1>
    </div>
    <div className="grid grid-cols">
      <div className="flex justify-center col-span-2 pt-8">{children}</div>
    </div>
  </div>
);

PaymentLayoutMobile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaymentLayoutMobile;
