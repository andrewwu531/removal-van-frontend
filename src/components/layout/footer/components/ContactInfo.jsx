import { FaPhone, FaEnvelope, FaClock, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const iconMap = {
  phone: FaPhone,
  email: FaEnvelope,
  clock: FaClock,
};

export default function ContactInfo({ contactItems }) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8 space-y-2.5">
      {contactItems.map((item, index) => {
        const Icon = iconMap[item.icon];
        return (
          <p key={index} className="flex items-center">
            <Icon className="mr-5" />
            <span className="-translate-y-[1px]">{item.content}</span>
          </p>
        );
      })}

      {/* Legal Statement Link */}
      <Link
        to="/legal-statement"
        className="flex items-center text-white transition-colors hover:text-gray-300"
        onClick={handleScrollToTop}
      >
        <FaBookmark className="mr-5 w-[1em] h-[1em] text-white" />
        <span className="-translate-y-[1px]">Legal Statement</span>
      </Link>
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
