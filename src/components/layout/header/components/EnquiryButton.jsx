import PropTypes from "prop-types";

export default function EnquiryButton({ onClose, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-9 px-9 top-20 right-10 w-90"
    >
      <button
        className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="mb-4 text-xl font-bold text-gray-800">Contact Us</h2>
      <p className="mb-5 text-gray-600">
        For general enquiries, please contact us by text messaging at:
      </p>
      <div className="mb-5 text-xl font-semibold text-center text-red-400">
        (+44) 7700 1010 47
      </div>
      <p className="text-sm text-left text-gray-500">
        * Text messaging is the fastest way to confirm your booking.
      </p>
    </div>
  );
}

EnquiryButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  cardRef: PropTypes.object.isRequired,
};
