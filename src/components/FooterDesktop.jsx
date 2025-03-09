import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const FooterDesktop = () => {
  return (
    <footer className="pb-16 text-white bg-gray-800 pt-18">
      <div className="grid w-11/12 grid-cols-3 pb-10 mx-auto justify-items-center">
        {/* Company Info
        <div>
          <h2 className="mb-8 text-xl font-semibold">Welcome Removal</h2>
        </div> */}

        {/* Quick Links */}
        <div>
          <h3 className="mb-8 text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#booking-steps" className="hover:text-indigo-500">
                Home
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Removal Services
              </a>
            </li>
            <li>
              <a href="#booking-form" className="hover:text-indigo-500">
                Book a Spot Now
              </a>
            </li>
            <li>
              <a href="#booking-steps" className="hover:text-indigo-500">
                How Removal Works
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Customer Protection
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-8 text-xl font-semibold">Our Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Residential Removals
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Business Asset Relocations
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Packing & Unpacking
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Equipment Installation
              </a>
            </li>
            <li>
              <a href="#removal-services" className="hover:text-indigo-500">
                Man and a Van Service
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
            <FaEnvelope className="mr-5" /> welcome-removal@outlook.com
          </p>
          <p className="flex items-center">
            <FaClock className="mr-5" /> Mon-Sun: 8am-11pm
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterDesktop;
