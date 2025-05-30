import { BsChatFill } from "react-icons/bs";

const FloatingButton = () => {
  const defaultMessage = `Hi Trade Specialists,

I'm planning a house/business removal and I would like to confirm a booking. Here are my details.


• Full Name:
• Email Address:
• Pickup Location:
• Destination Location:
• Preferred Removal Date(s):
• Number of Bedrooms/ Approximate Office Size for Removal:
• Photos of Furniture for Removal:

I am looking forward to your reply.

Thank you`;

  const handleClick = () => {
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(defaultMessage);
    // Open native SMS app with pre-filled message
    window.open(`sms:07943059792?body=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed z-50 p-4 text-white transition-all duration-300 ease-in-out transform bg-red-500 rounded-full shadow-lg bottom-6 min-[600px]:bottom-8 right-7 min-[600px]:right-9 hover:bg-red-600 hover:scale-105"
      aria-label="Open messaging app"
    >
      <BsChatFill className="w-6 h-6" />
    </button>
  );
};

export default FloatingButton;
