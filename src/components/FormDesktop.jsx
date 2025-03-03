import booking_form from "../assets/booking_form.png";

export default function BookingForm() {
  return (
    <div className="flex flex-row items-center max-w-6xl mx-auto mb-20 bg-white rounded-lg shadow-lg">
      {/* Image Section */}
      <div className="w-2/5">
        <img
          src={booking_form} // Make sure to update this with your actual image path
          alt="Booking Form"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <div className="w-3/5 px-20">
        <h2 className="flex justify-center mb-10 text-2xl font-semibold text-black">
          Secure Removal Appointment
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm mt-0.5 font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded"
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm mt-0.5 font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded"
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm mt-0.5 font-medium text-gray-700">
              Telephone Number
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded"
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm mt-0.5 font-medium text-gray-700">
              Availiable Date
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="w-full p-2 border border-gray-600 rounded"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-2 gap-x-5 gap-y-3">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm mt-0.5 font-medium text-gray-700">
              Pickup Location
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded"
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Drop-Off Location
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded"
              />
            </div>
          </div>
        </div>
        <div className="grid w-1/2 grid-cols-2 mt-2 gap-x-5 gap-y-3">
          <div>
            <label className="block mt-0.5 text-sm font-medium text-gray-700">
              Deposit Amount
            </label>
            <select className="w-full p-2 border mt-0.5 border-gray-600 rounded">
              <option>£60</option>
              <option>£100</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center col-span-2">
          {" "}
          <button className="px-10 py-4 mt-16 font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600">
            Pay Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
