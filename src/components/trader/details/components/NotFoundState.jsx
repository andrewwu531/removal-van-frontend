export default function NotFoundState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen col-span-3 py-20 pb-16 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800">Trader Not Found</h1>
      <p className="mt-2 text-gray-600">
        The trader you're looking for could not be found.
      </p>
      <a
        href="/"
        className="px-4 py-2 mt-4 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
      >
        Return to Home
      </a>
    </div>
  );
}
