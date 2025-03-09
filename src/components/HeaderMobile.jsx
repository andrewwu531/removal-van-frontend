const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-gray-200 z-[200] border shadow-gray-100">
      {/* Use a container to keep the content centered */}
      <div className="mx-auto ">
        <div className="flex items-center justify-center mx-auto space-x-2 h-14">
          {/* Left Section: Logo / Brand */}
          <span className="text-lg font-semibold text-gray-950">
            Welcome Removal
          </span>
          {/* Small upward arrow (SVG icon) */}
          <svg
            className="w-6 h-6 text-blue-900"
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
      </div>
    </header>
  );
};

export default Header;
