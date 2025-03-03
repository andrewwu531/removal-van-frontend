// src/components/Header.jsx

function HeaderMobile() {
  return (
    <div className="h-[75px] shadow bg-blue-950">
      <div className="flex items-center justify-between px-4 pt-4.5 [@media(max-width:340px)]:!pt-5 mx-auto">
        <div className="flex flex-row pt-1">
          <div className="pl-4 [@media(max-width:340px)]:!pl-3 text-2xl [@media(max-width:340px)]:!text-xl font-medium text-white ">
            Welcome
          </div>
        </div>
        <nav>
          <ul className="flex pt-2 pr-4 [@media(max-width:340px)]:!pr-3 space-x-4 font-medium [@media(max-width:340px)]:text-base text-lg text-gray-100">
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

export default HeaderMobile;
