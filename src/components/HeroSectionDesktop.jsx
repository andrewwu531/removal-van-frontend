import React, { useState, useEffect } from "react";
import home_removal_image from "../assets/home-removal.png";
import business_removal_image from "../assets/business-removal.png";
import booking_form_image from "../assets/booking-form.png";
import contact_us_image from "../assets/contact-us.png";
import background_image from "../assets/background.png"; // Add your background image

const HeroSection = () => {
  const cards = [
    { text: "Home Removal", image: home_removal_image },
    { text: "Business Removal", image: business_removal_image },
    { text: "Booking Form", image: booking_form_image },
    { text: "Contact Us", image: contact_us_image },
  ];

  return (
    <section
      id="home"
      className="flex flex-col min-h-[calc(100vh-100px)] py-10 text-blue-950"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-row items-start w-full px-8 mx-auto xl:px-10 2xl:px-12 ">
        {/* Left Column */}
        <div className="w-[40%] xl:w-[38%] 2xl:w-[36%] ml-5 lg:ml-10 xl:ml-12 2xl:ml-18">
          <div className="pt-8 xl:pt-12 2xl:pt-20">
            <h1 className="pb-2 text-4xl font-bold text-left xl:text-4xl 2xl:text-5xl">
              Home &amp; Business
            </h1>
            <h1 className="text-4xl font-bold text-left pb-7 xl:pb-10 xl:text-4xl 2xl:text-5xl">
              Removal Services
            </h1>
          </div>
          <p className="pb-16 text-lg pr-18 lg:pb-20 xl:pb-24 2xl:pb-28 xl:text-xl 2xl:text-2xl xl:pr-20 2xl:pr-24">
            A seamless, transparent, and reliable way to book professional
            removal services. Whether you’re moving home furniture or business
            assets, we’re here for you!
          </p>
          <a
            href="#booking"
            className="flex  bg-green-600 w-[175px] xl:w-[190px] 2xl:w-[200px] text-gray-50 font-medium text-lg xl:text-xl py-3 xl:py-4 rounded-md 
                      align-middle justify-center transform transition duration-300 hover:scale-104"
          >
            Book Removal
          </a>
        </div>

        {/* Right Column */}
        <div className="w-[60%] xl:w-[62%] 2xl:w-[64%] mr-4 lg:mr-6 xl:mr-10 2xl:mr-20 mt-2 xl:mt-4 2xl:mt-14 3xl:mt-10">
          <div className="grid grid-cols-2 gap-2 p-2 xl:gap-3 2xl:gap-4 xl:p-3 2xl:p-4">
            {cards.map((card, index) => (
              <a href="#booking" key={index} className="block">
                <div className="relative h-56 overflow-hidden transition duration-500 transform rounded-md shadow cursor-pointer xl:h-60 2xl:h-64 hover:scale-102">
                  <img
                    src={card.image}
                    alt={card.text}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 z-10 flex items-end justify-end">
                    <div className="px-4 py-2 rounded xl:px-5 2xl:px-6 bg-gray-950 bg-opacity-80">
                      <p className="text-base font-medium tracking-wide text-gray-100 xl:text-lg 2xl:text-xl">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
