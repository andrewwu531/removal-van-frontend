// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <div className="bg-blue-900 shadow">
      <div className="container mx-auto px-4 pt-4 flex justify-between items-center">
        <div className="text-xl font-medium text-gray-200 pt-3 pl-3">
          Glasgow | Edinburgh | Scotland
        </div>
        <nav>
          <ul className="flex space-x-4 px-10 font-medium text-gray-200">
            <li>
              <a href="#home" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-blue-600">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-600">
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
