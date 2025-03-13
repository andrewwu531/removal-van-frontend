import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const FooterDesktop = () => {
  return (
    <footer className="pb-16 text-white bg-gray-800 pt-14">
      {/* Contact Information */}
      <div className="flex flex-col justify-center w-2/3 mx-auto space-y-3">
        <h3 className="mb-8 text-xl font-semibold">Contact Us</h3>
        <p className="flex items-center">
          <FaPhone className="mr-5" /> 07943 059792
        </p>
        <p className="flex items-center">
          <FaEnvelope className="mr-5" /> welcome-removal@outlook.com
        </p>
        <p className="flex items-center">
          <FaClock className="mr-5" /> Mon-Sun: 8am-11pm
        </p>
      </div>
    </footer>
  );
};

export default FooterDesktop;
