// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <div className="h-[100px] shadow bg-blue-950">
      <div className="flex items-center justify-between px-4 mx-auto py-7">
        <div className="flex flex-row pt-1">
          <div className="pl-10 pr-5 text-3xl font-medium text-white ">
            Welcome
          </div>
          <div className="pt-3 pl-5 font-medium text-gray-100 text-md">
            Glasgow &nbsp;|&nbsp; Edinburgh &nbsp;|&nbsp; Scotland
          </div>
        </div>
        <nav>
          <ul className="flex px-10 pt-2 space-x-4 text-lg font-medium text-gray-100">
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
