import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import PropTypes from "prop-types";

const iconMap = {
  phone: FaPhone,
  email: FaEnvelope,
  clock: FaClock,
};

export default function ContactInfo({ contactItems }) {
  return (
    <div className="space-y-2">
      {contactItems.map((item, index) => {
        const Icon = iconMap[item.icon];
        return (
          <p key={index} className="flex items-center">
            <Icon className="mr-5" /> {item.content}
          </p>
        );
      })}
    </div>
  );
}

ContactInfo.propTypes = {
  contactItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOf(["phone", "email", "clock"]).isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};
