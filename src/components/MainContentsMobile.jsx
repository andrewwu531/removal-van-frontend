import React from "react";

const MainContentsMobile = () => {
  return (
    <div className="max-w-xl p-4 mx-auto mt-10 text-center rounded-md bg-teal-50 md:p-6">
      <h2 className="mb-2 text-lg font-semibold md:text-xl">
        Sign in to streamline your search
      </h2>
      <p className="mb-4 text-sm text-gray-700 md:text-base">
        Save properties, create alerts and keep track of the enquiries you send
        to agents.
      </p>
      <a href="#" className="font-semibold text-teal-600 hover:underline">
        Sign in or create an account
      </a>
    </div>
  );
};

export default MainContentsMobile;
