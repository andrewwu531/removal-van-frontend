import PropTypes from "prop-types";

const ConfirmationDetails = ({
  bookingDetails,
  transactionDetails,
  trader,
}) => (
  <div className="space-y-1 text-lg">
    <p>
      <strong>Name:</strong> {bookingDetails.FullName}
    </p>
    <p>
      <strong>Email:</strong> {bookingDetails.Email}
    </p>
    <p>
      <strong>Telephone:</strong> {bookingDetails.Telephone}
    </p>
    <p>
      <strong>Company:</strong> {trader?.name || bookingDetails.TraderName}
    </p>
    <p>
      <strong>Appointment Date:</strong>{" "}
      {bookingDetails.Date
        ? new Date(bookingDetails.Date).toLocaleDateString()
        : "Not specified"}
    </p>
    <p>
      <strong>Order ID:</strong> {transactionDetails.orderId}
    </p>
    <p>
      <strong>Deposit Amount:</strong> £{transactionDetails.amount}
    </p>
  </div>
);

ConfirmationDetails.propTypes = {
  bookingDetails: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Telephone: PropTypes.string.isRequired,
    DepositAmount: PropTypes.string.isRequired,
    Date: PropTypes.string,
    TraderName: PropTypes.string,
  }).isRequired,
  transactionDetails: PropTypes.object.isRequired,
  trader: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConfirmationDetails;
