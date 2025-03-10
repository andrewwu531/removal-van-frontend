import React, { useRef, useState } from "react";
import home_removal_image from "../assets/home-removal.png";
import business_removal_image from "../assets/business-removal.png";
import booking_form_image from "../assets/booking-form.png";

const HeroSectionMobile = () => {
  // Data for the three photo cards
  const photos = [
    {
      imgSrc: home_removal_image,
      alt: "Photo 1",
      title: "Residential Removal",
      text: "Move home furniture and dispose of unwanted items. We accept same day, short notice & long distance removal services. You can opt for one or two man for the removal service.",
      linkText: "Contact Team",
      linkUrl: "#booking-form",
    },
    {
      imgSrc: business_removal_image,
      alt: "Photo 2",
      title: "Business Asset Relocations",
      text: "Help businesses relocate office equipment and inventory. Our removal service comes with an insurance guarantee to cover for any damages.",
      linkText: "Contact Team",
      linkUrl: "#booking-form",
    },
    {
      imgSrc: booking_form_image,
      alt: "Photo 3",
      title: "Customer Protection",
      text: "Our professional removal team is trained to package and load your furniture and office equipment with care. We use lifting tools, traps, safety blankets and moving boxes while moving your items.",
      linkText: "Contact Team",
      linkUrl: "#booking-form",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Update the index based on the container's scroll position
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    }
  };

  return (
    <section
      id="removal-services"
      className="scroll-mt-[160px] w-11/12 mx-auto mt-10 bg-white text-blue-950"
    >
      <div className="overflow-hidden">
        {/* Scrollable container with no scrollbar */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {photos.map((photo, index) => (
            <div key={index} className="flex-shrink-0 w-full px-4 snap-center">
              <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md">
                {/* Image */}
                <img
                  src={photo.imgSrc}
                  alt={photo.alt}
                  className="object-cover w-full h-40 min-[414px]:h-48 rounded-md"
                />
                {/* Card Content */}
                <div className="px-7 pt-6 pb-5 flex flex-col flex-grow min-h-[260px] min-[414px]:min-h-[230px]">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    {photo.title}
                  </h3>
                  <p className="flex-grow text-base text-gray-600">
                    {photo.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1 transition-colors duration-300 ${
                currentIndex === index ? "bg-indigo-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile;
