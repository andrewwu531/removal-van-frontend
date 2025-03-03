export default function BookingForm() {
  return (
    <div className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">
        Properties to rent in Glasgow
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search radius
          </label>
          <select className="w-full p-2 mt-1 border border-gray-300 rounded">
            <option>This area only</option>
            <option>+1 mile</option>
            <option>+3 miles</option>
            <option>+5 miles</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property types
          </label>
          <select className="w-full p-2 mt-1 border border-gray-300 rounded">
            <option>Any</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Studio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Added to site
          </label>
          <select className="w-full p-2 mt-1 border border-gray-300 rounded">
            <option>Anytime</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Price range (£)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="No min"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="No max"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            No. of bedrooms
          </label>
          <div className="flex space-x-2">
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>No min</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>No max</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4" id="let-agreed" />
          <label htmlFor="let-agreed" className="text-sm text-gray-700">
            Include Let Agreed properties
          </label>
        </div>

        <div className="col-span-2">
          <button className="w-full py-2 font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600">
            Search properties
          </button>
        </div>
      </div>
    </div>
  );
}
