import PropTypes from "prop-types";

export default function PhoneMessagingButton({
  phoneNumber = "07943059792",
  className = "",
  children = "07943 059 792",
  serviceType = "removal",
}) {
  const getDefaultMessage = (service) => {
    const serviceMessages = {
      Removal: `Hi Trade Specialists,

I'm planning a house/business removal and I would like to confirm a booking. Here are my details.

• Full Name:
• Email Address:
• Pickup Location:
• Destination Location:
• Preferred Removal Date(s):
• Number of Bedrooms/ Approximate Office Size for Removal:
• Photos of Furniture for Removal:

I am looking forward to your reply.

Thank you`,

      Painting: `Hi Trade Specialists,

I'm interested in painting services and I would like to get a quote. Here are my details.

• Full Name:
• Email Address:
• Property Address:
• Preferred Service Date(s):
• Type of Painting (Interior/Exterior):
• Number of Rooms/Areas:
• Photos of Areas to be Painted:

I am looking forward to your reply.

Thank you`,

      "Carpet & Flooring": `Hi Trade Specialists,

I'm interested in carpet and flooring services and I would like to get a quote. Here are my details.

• Full Name:
• Email Address:
• Property Address:
• Preferred Service Date(s):
• Type of Service (Carpet/Flooring):
• Number of Rooms/Areas:
• Photos of Areas:

I am looking forward to your reply.

Thank you`,

      "Bathroom & Kitchen": `Hi Trade Specialists,

I'm interested in bathroom and kitchen services and I would like to get a quote. Here are my details.

• Full Name:
• Email Address:
• Property Address:
• Preferred Service Date(s):
• Type of Service (Bathroom/Kitchen):
• Number of Rooms:
• Photos of Current Setup:

I am looking forward to your reply.

Thank you`,

      "Window & Door": `Hi Trade Specialists,

I'm interested in window and door services and I would like to get a quote. Here are my details.

• Full Name:
• Email Address:
• Property Address:
• Preferred Service Date(s):
• Type of Service (Windows/Doors):
• Number of Items:
• Photos of Current Windows/Doors:

I am looking forward to your reply.

Thank you`,

      "Exterior & Roofing": `Hi Trade Specialists,

I'm interested in exterior and roofing services and I would like to get a quote. Here are my details.

• Full Name:
• Email Address:
• Property Address:
• Preferred Service Date(s):
• Type of Service (Exterior/Roofing):
• Property Type:
• Photos of Current Condition:

I am looking forward to your reply.

Thank you`,

      "Solar Panels": `Hi Trade Specialists,

I'm interested in solar panel installation and I would like to get a quote. Here are my details.

• Full Name:
• Email Address:
• Property Address:
• Preferred Service Date(s):
• Property Type:
• Current Energy Usage:
• Photos of Roof/Installation Area:

I am looking forward to your reply.

Thank you`,

      "Commercial Maintenance": `Hi Trade Specialists,

I'm interested in commercial maintenance services and I would like to get a quote. Here are my details.

• Full Name:
• Email Address:
• Business Address:
• Preferred Service Date(s):
• Type of Maintenance Required:
• Business Type:
• Photos of Areas Requiring Maintenance:

I am looking forward to your reply.

Thank you`,
    };

    return serviceMessages[service] || serviceMessages["Removal"];
  };

  const handlePhoneClick = (e) => {
    e.preventDefault();
    const defaultMessage = getDefaultMessage(serviceType);
    const encodedMessage = encodeURIComponent(defaultMessage);
    window.location.href = `sms:${phoneNumber}?body=${encodedMessage}`;
  };

  return (
    <a
      href={`sms:${phoneNumber}?body=${encodeURIComponent(getDefaultMessage(serviceType))}`}
      onClick={handlePhoneClick}
      className={`px-5.5 py-2 font-semibold text-white transition-all duration-300 ease-in-out bg-red-500 rounded-xl text-[16px] hover:bg-red-500 hover:scale-105 ${className}`}
    >
      {children}
    </a>
  );
}

PhoneMessagingButton.propTypes = {
  phoneNumber: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  serviceType: PropTypes.string,
};
