import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const FooterDesktop = () => {
  return (
    <footer className="pb-16 text-white bg-gray-900 pt-18">
      <div className="grid max-w-screen-xl grid-cols-4 pb-10 mx-auto ">
        {/* Company Info */}
        <div>
          <h2 className="mb-8 text-xl font-semibold">Welcome Removal</h2>
          {/* <p className="mr-32 text-white ">
            Reliable & Affordable Home & Business Removal Services Across the UK
          </p> */}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-8 text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-teal-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
                Removal Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
                Book a Spot Now
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
                Customer Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
                Removal Checklist & Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-8 text-xl font-semibold">Our Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-teal-400">
                Residential Removals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
                Business Asset Relocations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
                Packing & Unpacking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
                Equipment Installation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-400">
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
          {/* <p className="flex items-center">
            <FaMapMarkerAlt className="mr-5" /> 123 Removal Street, London, UK
          </p> */}
          {/* <p className="pt-10 text-right">&copy; {new Date().getFullYear()}</p> */}
          {/* <p>
          <a href="#" className="hover:text-teal-400">
            Privacy Policy
          </a>{" "}
          |
          <a href="#" className="ml-2 hover:text-teal-400">
            Terms & Conditions
          </a>
        </p> */}

          {/* <div className="flex mt-12 space-x-4">
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400">
              <FaLinkedin size={20} />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default FooterDesktop;
