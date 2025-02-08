// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 py-4">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div>
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
      </div>
      <div>
        <a href="#" className="hover:text-white">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="hover:text-white">
          Terms of Service
        </a>
      </div>
      <div className="mt-2 md:mt-0">
        Trusted Home & Business Removal © {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
