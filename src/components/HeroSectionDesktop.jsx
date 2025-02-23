import React from "react";
import home_removal_image from "../assets/home-removal.png";
import business_removal_image from "../assets/business-removal.png";
import booking_form_image from "../assets/booking-form.png";
import contact_us_image from "../assets/contact-us.png";
import background_image from "../assets/background.png"; // Add your background image

const HeroSectionDesktop = () => {
  // Define card data: text labels and corresponding images
  const cards = [
    { text: "Home Removal", image: home_removal_image },
    { text: "Business Removal", image: business_removal_image },
    { text: "Booking Form", image: booking_form_image },
    { text: "Contact Us", image: contact_us_image },
  ];

  return (
    <section
      id="home"
      className="flex-grow text-blue-950 h-[86vh]"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-row items-start w-full px-4 mx-auto">
        {/* Left Column: Main text content */}
        <div className="w-[38%] ml-20 mt-20 flex flex-col justify-center">
          <div>
            <h1 className="pb-2 text-5xl font-bold text-left">
              Home &amp; Business
            </h1>
            <h1 className="pb-10 text-5xl font-bold text-left">
              Removal Services
            </h1>
          </div>
          <p className="pb-40 text-xl mr-35">
            A seamless, transparent, and reliable way to book professional
            removal services. Whether you’re moving home furniture or business
            assets, we’re here for you!
          </p>
          <a
            href="#booking"
            className="flex bg-green-600 w-[40%] text-gray-50 font-medium text-lg py-3 px-4 rounded-md 
                      align-middle justify-center transform transition duration-300 hover:scale-104"
          >
            Book Removal
          </a>
        </div>
        {/* Right Column: 2x2 grid of cards */}
        <div className="w-[62%] mr-20 mt-8">
          <div className="grid grid-cols-2 gap-3.5 p-4">
            {cards.map((card, index) => (
              <a href="#booking" key={index} className="block">
                <div className="relative h-64 overflow-hidden transition duration-500 transform rounded-md shadow cursor-pointer hover:scale-102">
                  {/* Card image */}
                  <img
                    src={card.image}
                    alt={card.text}
                    className="object-cover w-full h-full"
                  />
                  {/* Text overlay: absolutely positioned to overlap the image */}
                  <div className="absolute inset-0 z-10 flex items-end justify-end">
                    <div className="px-5 py-2 rounded bg-gray-950 bg-opacity-80">
                      <p className="text-lg font-medium tracking-wide text-gray-100">
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

export default HeroSectionDesktop;
