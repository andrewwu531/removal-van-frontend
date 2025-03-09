import PropTypes from "prop-types";

import CustomerReviewsDesktop from "./CustomerReviewsDesktop";

const PaymentLayout = ({ children }) => (
  <div className="w-11/12 min-[1423px]:w-5/6 mx-auto mt-10 mb-32">
    <div className="relative flex items-center py-10 min-[2560px]:py-12 text-white bg-indigo-600 rounded-lg mb-1 px-11 min-[1920px]:px-13">
      <h1 className="text-3xl font-semibold">Book Removal Appointment</h1>
    </div>
    <div className="grid grid-cols-3">
      <div className="flex justify-center col-span-2 pt-16">{children}</div>
      <CustomerReviewsDesktop />
    </div>
  </div>
);

PaymentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaymentLayout;
