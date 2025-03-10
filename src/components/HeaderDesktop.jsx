const Header = () => {
  return (
    <header className="w-full p-2 bg-white z-[200]  ">
      {/* Use a container to keep the content centered */}
      <div className="pt-2 mx-auto">
        <div className="flex items-center justify-between h-16 min-[2560px]:h-24 min-[3840px]:h-40">
          {/* Left Section: Logo / Brand */}
          <div className="flex items-center space-x-3 min-[1920px]:space-x-3.5 min-[2560px]:space-x-5 min-[3840px]:space-x-8">
            <span className="text-xl -mt-1 min-[2560px]:text-3xl min-[3840px]:text-5xl font-semibold text-gray-950 ml-[3rem] min-[1120px]:ml-[4rem] min-[1380px]:ml-[5rem] min-[1920px]:ml-[7rem] min-[3840px]:ml-[10rem]">
              Welcome Removal
            </span>
            {/* Small upward arrow (SVG icon) */}
            <svg
              className="w-4 h-4 min-[1920px]:w-5 min-[1920px]:h-5 min-[2560px]:w-7 min-[2560px]:h-7 min-[3840px]:h-9  min-[3840px]:w-9  text-blue-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V6M5 13l7-7 7 7" />
            </svg>
          </div>
          {/* Middle Section: Navigation Links */}
          <nav className="flex justify-center flex-1 py-5 text-gray-900 space-x-7 min-[1920px]:space-x-9 min-[2560px]:space-x-12 min-[3840px]:space-x-18 text-md min-[1920px]:text-lg min-[2560px]:text-2xl min-[3840px]:text-4xl">
            <a
              href="#removal-services"
              className="transition-colors hover:text-gray-500"
            >
              Removal Services
            </a>
            <a
              href="#booking-form"
              className="transition-colors hover:text-gray-500"
            >
              Book a Spot Now
            </a>
            <a
              href="#booking-steps"
              className="transition-colors hover:text-gray-500"
            >
              How Removal Works
            </a>
            <a
              href="#removal-services"
              className="transition-colors hover:text-gray-500 hidden min-[1256px]:inline"
            >
              Customer Protection
            </a>
          </nav>

          {/* Right Section: Contact Button */}
          <div className="mr-[3rem] min-[1300px]:mr-[4rem] min-[1380px]:mr-[5rem] min-[1920px]:mr-[7rem] min-[3840px]:mr-[10rem]">
            <a
              href="#"
              className="px-7 min-[1920px]:px-9 min-[2560px]:px-14 min-[3840px]:px-20 py-3.5 min-[1920px]:py-4 min-[2560px]:py-5.5 min-[3840px]:py-8 font-medium min-[1920px]:text-lg min-[2560px]:text-2xl min-[3840px]:text-4xl text-white transition-colors bg-indigo-600 rounded-lg min-[2560px]:rounded-xl  min-[3840px]:rounded-2xl hover:bg-indigo-700 hover:text-white"
            >
              Contact 07943059792
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
