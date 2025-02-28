// src/components/Header.jsx

function HeaderDesktop() {
  return (
    <div className=" [@media(min-height:1800px)]:!h-[220px] [@media(min-height:1200px)]:!h-[190px] [@media(min-height:950px)]:h-[120px] h-[100px] shadow bg-blue-950">
      <div className="flex items-center justify-between px-4 mx-auto py-7  [@media(min-height:1800px)]:!px-16 [@media(min-height:1200px)]:!px-12  [@media(min-height:1800px)]:!pt-19 [@media(min-height:950px)]:pt-9 [@media(min-height:1200px)]:!pt-16">
        <div className="flex flex-row pt-1">
          <div className="pl-10 [@media(min-height:1200px)]:!pl-14 pr-5 text-3xl  [@media(min-height:1800px)]:!text-6xl [@media(min-height:1200px)]:!text-5xl [@media(min-height:950px)]:text-4xl font-medium text-white">
            Welcome
          </div>
          <div
            className="pt-3  [@media(min-height:1800px)]:!pt-8 [@media(min-height:1200px)]:!pt-6 pl-5  [@media(min-height:1800px)]:!pl-16 
                            [@media(min-height:1200px)]:!pl-12 [@media(min-height:950px)]:pl-8 font-medium text-gray-100 text-md  [@media(min-height:1800px)]:!text-4xl [@media(min-height:1200px)]:!text-3xl [@media(min-height:950px)]:text-xl"
          >
            Glasgow &nbsp;|&nbsp; Edinburgh &nbsp;|&nbsp; Scotland
          </div>
        </div>
        <nav>
          <ul className="flex pr-10 [@media(min-height:1200px)]:!pr-18 [@media(min-height:950px)]:pr-16 pt-2 space-x-4 text-lg [@media(min-height:1200px)]:!text-4xl [@media(min-height:950px)]:text-2xl font-medium text-gray-100">
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

export default HeaderDesktop;
