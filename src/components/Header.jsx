// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <div className="bg-blue-950 shadow">
      <div className="container mx-auto px-4 flex justify-between py-7 items-center">
        <div className="flex flex-row">
          <div className=" ml-4 text-3xl text-white font-medium mr-5">
            Trusted
          </div>
          <div className="text-lg font-medium text-gray-100 pl-5 pt-1 mt-2">
            Glasgow &nbsp;|&nbsp; Edinburgh &nbsp;|&nbsp; Scotland
          </div>
        </div>
        <nav>
          <ul className="flex space-x-4 px-10 text-lg font-medium text-gray-100 mt-2">
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
