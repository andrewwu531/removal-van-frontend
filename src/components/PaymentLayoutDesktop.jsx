import PropTypes from "prop-types";

import CustomerReviewsDesktop from "./CustomerReviewsDesktop";

const PaymentLayout = ({ children }) => (
  <div className="max-w-screen-xl mx-auto mt-10 mb-32">
    <div className="relative flex items-center py-10 text-white bg-indigo-600 rounded-lg mb-1q px-11">
      <h1 className="text-3xl font-semibold">Book Removal Appointment</h1>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="flex justify-center col-span-2 pt-16">{children}</div>
      <div className="hidden lg:block">
        <CustomerReviewsDesktop />
      </div>
    </div>
  </div>
);

PaymentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaymentLayout;
