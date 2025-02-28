// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="text-gray-200 py-7 bg-blue-950">
    <div className="container flex flex-row items-center justify-between mx-auto align-middle">
      <div className="font-semibold text-white pl-7  [@media(max-width:330px)]:!pl-6 text-md">
        welcome-removal@outlook.com
      </div>
      <div className="font-semibold pr-7 [@media(max-width:330px)]:!pr-3 text-md">
        © {new Date().getFullYear()}
      </div>
    </div>
  </footer>
);

export default Footer;
