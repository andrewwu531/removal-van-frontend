import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const FooterDesktop = () => {
  return (
    <footer className="pb-20 text-white bg-black pt-18">
      <div className="grid w-11/12 grid-cols-3 pb-10 mx-auto justify-items-center">
        {/* Company Info
        <div>
          <h2 className="mb-8 text-xl font-semibold">Welcome Removal</h2>
        </div> */}

        {/* Quick Links */}
        <div>
          <h3 className="mb-8 text-xl font-semibold">Our Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#booking-steps" className="hover:text-indigo-500">
                Home & Business Removal
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                House Renovation
              </a>
            </li>
            <li>
              <a href="#booking-form" className="hover:text-indigo-500">
                Carpet & Flooring
              </a>
            </li>
            <li>
              <a href="#booking-steps" className="hover:text-indigo-500">
                Painting & Decoration
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Damage Repair
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="pt-15">
          <ul className="space-y-2">
            <li>
              <a href="#removal-services" className=" hover:text-indigo-500">
                Electrical & Gas Services
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Locksmith Services
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Solar Panel Installation
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Window & Heating Specialists
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Car Repair & Maintenance
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 ">
          <h3 className="mb-8 text-xl font-semibold">Contact Us</h3>
          <p className="flex items-center">
            <FaPhone className="mr-5" /> 07943 059792
          </p>
          <p className="flex items-center">
            <FaEnvelope className="mr-5" /> trade-specialists@outlook.com
          </p>
          <p className="flex items-center">
            <FaClock className="mr-5" /> Mon-Sun: 9am-9pm
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterDesktop;
