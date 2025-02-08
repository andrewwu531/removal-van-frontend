// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="bg-blue-950 text-gray-50 py-5">
    <div className="container mx-auto flex flex-row justify-between align-middle items-center px-6">
      {/* <div>
        <a href="#home" className="hover:text-white">
          Home
        </a>{" "}
        |{" "}
        <a href="#faq" className="hover:text-white">
          FAQ
        </a>{" "}
        |{" "}
        <a href="#contact" className="hover:text-white">
          Contact Us
        </a>
      </div> */}
      {/* <div>
        <a href="#" className="hover:text-white">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="hover:text-white">
          Terms of Service
        </a>
      </div> */}
      <div>Trusted Home & Business Removal</div>
      <div>© {new Date().getFullYear()}</div>
    </div>
  </footer>
);

export default Footer;
