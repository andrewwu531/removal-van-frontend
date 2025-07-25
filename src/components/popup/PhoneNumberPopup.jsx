import React from "react";
import PropTypes from "prop-types";

const PhoneNumberPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePhoneClick = (e) => {
    e.preventDefault();
    const phoneNumber = "07943059792";
    const encodedMessage = encodeURIComponent(defaultMessage);
    window.location.href = `sms:${phoneNumber}?body=${encodedMessage}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-white/30"
      onClick={handleOverlayClick}
    >
      <div className="bg-white min-[200px]:pb-6 min-[375px]:pb-10 min-[390px]:pb-18 min-[500px]:pb-0 px-14 rounded-lg relative w-full h-[calc(100vh)] min-[450px]:w-[450px] min-[450px]:mt-55 min-[450px]:h-[calc(50vh)] text-center shadow-lg flex flex-col justify-center mt-[60px]">
        <button
          onClick={onClose}
          className="absolute text-2xl font-light text-gray-600 min-[350px]:text-3xl top-1 right-3 hover:text-gray-800"
        >
          ×
        </button>

        <h2 className="mb-5 min-[350px]:mb-6 text-xl font-bold text-gray-800 min-[350px]:text-2xl">
          Want to book a removal now?
        </h2>

        <p className="text-base text-gray-600 min-[350px]:text-lg">
          Reach us out at:
        </p>

        <a
          href={`sms:07943059792?body=${encodeURIComponent(defaultMessage)}`}
          onClick={handlePhoneClick}
          className="inline-block py-2.5 mt-2 min-[350px]:mt-3 mb-4 text-md min-[350px]:text-xl font-bold text-white transition-all duration-300 ease-in-out bg-red-500 border-2 rounded-xl hover:scale-105"
        >
          07943 059 792
        </a>

        <p className="mt-1 min-[350px]:mt-2 text-base text-gray-600 min-[350px]:text-lg">
          We'll get back to you as soon as possible!
        </p>

        <button
          onClick={onClose}
          className="mt-4 underline text-sm text-red-500 transition-colors duration-300 min-[350px]:text-base hover:text-red-600"
        >
          View removal services
        </button>
      </div>
    </div>
  );
};

PhoneNumberPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PhoneNumberPopup;
