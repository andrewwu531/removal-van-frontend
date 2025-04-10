import PropTypes from "prop-types";

const BookingFormFields = ({ formData, handleChange }) => (
  <>
    <div className="mb-3">
      <label
        htmlFor="fullName"
        className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
      >
        Name
      </label>
      <input
        type="text"
        id="fullName"
        name="FullName"
        value={formData.FullName}
        onChange={handleChange}
        autoComplete="name"
        className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
        required
      />
    </div>
    <div className="mb-3">
      <label
        htmlFor="email"
        className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
      >
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        autoComplete="email"
        className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
        required
      />
    </div>
    <div className="mb-3 min-[2560px]:mt-1">
      <label
        htmlFor="telephone"
        className="block font-medium text-gray-700 text-md min-[2560px]:text-lg"
      >
        Telephone
      </label>
      <input
        type="tel"
        id="telephone"
        name="Telephone"
        value={formData.Telephone}
        onChange={handleChange}
        autoComplete="tel"
        className="block w-full p-3 min-[2560px]:p-4 mt-1 bg-white border border-gray-300 rounded focus:outline-none"
        required
      />
    </div>
  </>
);

BookingFormFields.propTypes = {
  formData: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Telephone: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BookingFormFields;
