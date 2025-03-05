import React from "react";
import CustomerReviewsDesktop from "./CustomerReviewsDesktop";

const PaymentLayout = ({ children }) => (
  <div className="max-w-screen-xl mx-auto mt-10 mb-32">
    <div className="relative flex items-center py-10 text-white bg-indigo-600 rounded-lg mb-1q px-11">
      <h1 className="text-3xl font-semibold">Book Removal Appointment</h1>
    </div>
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2">{children}</div>
      <div className="hidden lg:block">
        <CustomerReviewsDesktop />
      </div>
    </div>
  </div>
);

export default PaymentLayout;
