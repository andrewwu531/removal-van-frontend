// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="text-gray-200 py-7 bg-blue-950">
    <div className="container flex flex-row items-center justify-between mx-auto align-middle px-7">
      <div className="text-lg font-semibold text-white">
        welcome-removal@outlook.com
      </div>
      <div className="pr-5 font-semibold text-md">
        © {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
