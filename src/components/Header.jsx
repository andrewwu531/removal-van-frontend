// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <div className="shadow bg-blue-950">
      <div className="container flex items-center justify-between px-4 mx-auto py-7">
        <div className="flex flex-row">
          <div className="mt-1 ml-4 mr-5 text-2xl font-medium text-white ">
            Next Day Removal
          </div>
          <div className="pt-2 pl-3 mt-2 font-medium text-gray-100 text-md">
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
