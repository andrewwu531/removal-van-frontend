export default function PaymentError() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
      <p className="mt-4">
        There was an error processing your payment. Please try again.
      </p>
    </div>
  );
}
