// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <div className="shadow bg-blue-950">
      <div className="container flex items-center justify-between px-4 mx-auto py-7">
        <div className="flex flex-row">
          <div className="ml-4 mr-5 text-3xl font-medium text-white ">
            Trusted
          </div>
          <div className="pt-1 pl-5 mt-2 text-lg font-medium text-gray-100">
            Glasgow &nbsp;|&nbsp; Edinburgh &nbsp;|&nbsp; Scotland
          </div>
        </div>
        <nav>
          <ul className="flex px-10 mt-2 space-x-4 text-lg font-medium text-gray-100">
            {/* <li>
              <a href="#home" className="hover:text-blue-950">
                Book Removal
              </a>
            </li> */}
            <li>
              <a href="#faq" className="hover:text-blue-950">
                (+44) 07943059792
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Header;
