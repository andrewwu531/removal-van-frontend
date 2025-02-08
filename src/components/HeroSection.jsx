// src/components/HeroSection.jsx
import React from "react";
import home_removal_image from "../assets/home-removal.png";
import business_removal_image from "../assets/business-removal.png";
import booking_form_image from "../assets/booking-form.png";
import contact_us_image from "../assets/contact-us.png";

const HeroSection = () => {
  // Define card data: text labels and corresponding images
  const cards = [
    { text: "Home Removal", image: home_removal_image },
    { text: "Business Removal", image: business_removal_image },
    { text: "Booking Form", image: booking_form_image },
    { text: "Contact Us", image: contact_us_image },
  ];

  return (
    <section id="home" className="text-black bg-blue-500">
      <div className="container mx-auto flex flex-row mt-5 items-start">
        {/* Left Column: Main text content */}
        <div className="w-[38%] ml-20 mt-20 flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-bold pb-2 text-left">
              Home &amp; Business
            </h1>
            <h1 className="text-5xl font-bold pb-10 text-left">
              Removal Services
            </h1>
          </div>
          <p className="text-xl mr-35 pb-30">
            A seamless, transparent, and reliable way to book professional
            removal services. Whether you’re moving home furniture or business
            assets, we’re here for you!
          </p>
          <a
            href="#booking"
            className="flex bg-black w-[40%] text-gray-200 font-medium text-lg py-3 px-4 rounded-md 
                      align-middle justify-center transform transition duration-300 hover:scale-104"
          >
            Book Removal
          </a>
        </div>
        {/* Right Column: 2x2 grid of cards */}
        <div className="w-[62%] mr-20 mt-2">
          <div className="grid grid-cols-2 gap-3.5 p-4">
            {cards.map((card, index) => (
              <a href="#booking" key={index} className="block">
                <div className="h-72 relative rounded-md shadow overflow-hidden cursor-pointer transform transition duration-500 hover:scale-102">
                  {/* Card image */}
                  <img
                    src={card.image}
                    alt={card.text}
                    className="w-full h-full object-cover"
                  />
                  {/* Text overlay: absolutely positioned to overlap the image */}
                  <div className="absolute inset-0 flex items-end justify-end z-10">
                    <div className=" bg-gray-950 bg-opacity-80 px-5 py-2 rounded">
                      <p className="text-lg font-medium text-gray-100 tracking-wide">
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
