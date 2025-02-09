// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="text-gray-200 py-7 bg-blue-950">
    <div className="container flex flex-row items-center justify-between mx-auto align-middle px-7">
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
      <div className="text-lg font-semibold">
        trusted.removal.services@gmail.com
      </div>
      <div className="pr-5 font-semibold text-md">
        © {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
