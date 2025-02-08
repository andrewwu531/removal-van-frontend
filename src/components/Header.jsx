// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <div className="bg-black shadow">
      <div className="container mx-auto px-4 flex justify-between py-4 items-center">
        <div className="text-lg font-medium text-gray-100 pl-5 pt-1">
          Glasgow | Edinburgh | Scotland
        </div>
        <nav>
          <ul className="flex space-x-4 px-10 text-md font-medium text-gray-100">
            <li>
              <a href="#home" className="hover:text-blue-950">
                Book Removal
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-blue-950">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-950">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Header;
