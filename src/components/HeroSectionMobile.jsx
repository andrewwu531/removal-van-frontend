import React from "react";

const HeroSectionMobile = () => {
  return (
    <div className="container flex flex-col items-start px-6 mx-auto">
      {/* Text Content */}
      <div className="flex flex-col justify-center w-full mt-12">
        <h1 className="pb-2 text-3xl font-bold text-left">
          Home &amp; Busines
        </h1>
        <h1 className="pb-6 text-3xl font-bold text-left">Removal Services</h1>
        <p className="pb-10 text-base">
          A seamless, transparent, and reliable way to book professional removal
          services. Whether you’re moving home furniture or business assets,
          we’re here for you!
        </p>
        <a
          href="#booking"
          className="flex bg-green-600 w-full max-w-[250px] text-gray-50 font-medium text-base py-3 px-4 rounded-md 
                    align-middle justify-center transform transition duration-300 hover:scale-105"
        >
          Book Removal
        </a>
      </div>
    </div>
  );
};

export default HeroSectionMobile;
