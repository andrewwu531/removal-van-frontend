import PropTypes from "prop-types";

const Stage4ConfirmationMobile = ({ bookingDetails, transactionDetails }) => (
  <div className="flex flex-col justify-center w-5/6 mx-auto mb-8 text-center">
    <h3 className="mb-8 text-3xl font-semibold">Payment Successful!</h3>
    <p className="text-lg">
      Your payment of £{transactionDetails.amount} has been processed
      successfully with the order ID: {transactionDetails.captureID}. You will
      receive an email and text confirmation shortly.
    </p>
    <div className="mt-10 text-left">
      <h2 className="text-2xl font-semibold mb-7">Booking Details</h2>
      <div className="space-y-1 text-lg text-left">
        <p>
          <strong>Name:</strong> &nbsp;{bookingDetails.FullName}
        </p>
        <p>
          <strong>Email:</strong> &nbsp;{bookingDetails.Email}
        </p>
        <p>
          <strong>Telephone:</strong> &nbsp;{bookingDetails.Telephone}
        </p>
        <p>
          <strong>Pickup Location:</strong> &nbsp;
          {bookingDetails.PickupLocation}
        </p>
        <p>
          <strong>Dropoff Location:</strong> &nbsp;
          {bookingDetails.DropoffLocation}
        </p>
        <p>
          <strong>Deposit Amount:</strong> &nbsp;{bookingDetails.DepositAmount}
        </p>
      </div>
    </div>
  </div>
);

Stage4ConfirmationMobile.propTypes = {
  bookingDetails: PropTypes.object.isRequired,
  transactionDetails: PropTypes.object.isRequired,
};

export default Stage4ConfirmationMobile;
