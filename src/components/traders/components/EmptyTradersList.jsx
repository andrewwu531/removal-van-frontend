export default function EmptyTradersList() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 text-center pb-35">
      <div className="mb-5 text-2xl font-semibold text-gray-700">
        No providers available yet
      </div>
      <div className="text-lg text-gray-600">
        We are working hard on finding providers within this location.
      </div>
      <div className="mt-2 text-gray-500">
        Please find provider in a different location or check back later.
      </div>
    </div>
  );
}
