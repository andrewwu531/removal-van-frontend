import { BsChatFill } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Create a new component for the popup
const FloatingButtonPopup = ({ onClose, cardRef }) => {
  return (
    <div
      ref={cardRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-9 px-9 bottom-8 right-26 w-90"
    >
      <button
        className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="mb-4 text-xl font-bold text-gray-800">Contact Us</h2>
      <p className="mb-5 text-gray-600">
        For general enquiries, please contact us by text at:
      </p>
      <div className="mb-5 text-xl font-semibold text-center text-red-400">
        (+44) 07943 059 792
      </div>
      <p className="text-sm text-left text-gray-500">
        * Texting is the fastest way to confirm your booking.
      </p>
    </div>
  );
};

FloatingButtonPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  cardRef: PropTypes.object.isRequired,
};

const FloatingButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const defaultMessage = `Hi Trade Specialists,

I'm planning a house/business removal and I would like to confirm a booking. Here are my details.


• Full Name:
• Email Address:
• Pickup Location:
• Destination Location:
• Preferred Removal Date(s):
• Number of Bedrooms/ Approximate Office Size for Removal:
• Photos of Furniture for Removal:

I am looking forward to your reply.

Thank you`;

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const handleClick = () => {
    // Check if screen width is less than 600px
    if (window.innerWidth < 600) {
      // Mobile behavior - open SMS app
      const encodedMessage = encodeURIComponent(defaultMessage);
      window.open(`sms:07943059792?body=${encodedMessage}`, "_blank");
    } else {
      // Desktop behavior - show popup
      setShowPopup(true);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="fixed z-50 p-4 text-white transition-all duration-300 ease-in-out transform bg-red-500 rounded-full shadow-lg bottom-5 min-[600px]:bottom-8 right-7 min-[600px]:right-9 hover:bg-red-600 hover:scale-105"
        aria-label="Open messaging app"
      >
        <BsChatFill className="w-6 h-6" />
      </button>
      {showPopup && (
        <FloatingButtonPopup
          onClose={() => setShowPopup(false)}
          cardRef={popupRef}
        />
      )}
    </>
  );
};

export default FloatingButton;
