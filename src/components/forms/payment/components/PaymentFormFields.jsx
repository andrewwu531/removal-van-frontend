import PropTypes from "prop-types";

const PaymentFormFields = ({
  cardNumber,
  expiryDate,
  cvv,
  setCardNumber,
  setExpiryDate,
  setCvv,
  formatCardNumber,
  formatExpiryDate,
}) => (
  <>
    <div className="mb-3">
      <label
        htmlFor="cardNumber"
        className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
      >
        Card Number
      </label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        value={cardNumber}
        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        placeholder="1234 5678 9012 3456"
        className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        maxLength="19"
        required
        autoComplete="cc-number"
        aria-label="Card number"
      />
    </div>

    <div className="flex flex-row space-x-4">
      <div className="flex-1 mb-3">
        <label
          htmlFor="expiryDate"
          className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
        >
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
          placeholder="MM/YY"
          className="w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength="5"
          required
          autoComplete="cc-exp"
          aria-label="Card expiry date"
        />
      </div>

      <div className="flex-1 mb-3">
        <label
          htmlFor="cvv"
          className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
        >
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
          placeholder="123"
          className="w-full p-3 mt-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength="4"
          required
          autoComplete="cc-csc"
          aria-label="Card security code"
        />
      </div>
    </div>
  </>
);

PaymentFormFields.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  cvv: PropTypes.string.isRequired,
  setCardNumber: PropTypes.func.isRequired,
  setExpiryDate: PropTypes.func.isRequired,
  setCvv: PropTypes.func.isRequired,
  formatCardNumber: PropTypes.func.isRequired,
  formatExpiryDate: PropTypes.func.isRequired,
};

export default PaymentFormFields;
