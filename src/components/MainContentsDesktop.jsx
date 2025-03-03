import React from "react";

const MainContentsDesktop = () => {
  return (
    <div className="max-w-2xl p-4 mx-auto text-center bg-teal-200 rounded-lg mt-25 md:p-6">
      <h2 className="mb-2 text-lg font-semibold md:text-xl">
        Contact us for a quote now
      </h2>
      <p className="px-8 mb-4 text-sm text-gray-700 md:text-base">
        We will respond to you with a quote price and ask you to secure a
        booking online with a PayPal deposit payment.
      </p>
      <a href="#" className="font-semibold text-teal-600 hover:underline">
        Book an Appointment
      </a>
    </div>
  );
};

export default MainContentsDesktop;
