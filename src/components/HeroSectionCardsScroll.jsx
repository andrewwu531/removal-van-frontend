import { useRef, useState } from "react";
import PropTypes from "prop-types";

const HeroSectionCardsScroll = ({ cards }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll to the card at the specified index
  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // Update the current index based on scroll position
  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(
        containerRef.current.scrollLeft / containerRef.current.clientWidth
      );
      setCurrentIndex(index);
    }
  };

  return (
    <div>
      {/* Carousel container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex px-8 [@media(min-width:350px)]:!px-12 [@media(min-width:400px)]:!px-13  overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex-none w-full px-2 snap-center"
            style={{ minWidth: "100%" }}
          >
            <a href="#booking" className="block">
              <div className="relative overflow-hidden transition duration-500 transform rounded-md shadow cursor-pointer h-42 [@media(min-height:600px)]:!h-45 [@media(min-height:730px)]:!h-48 [@media(min-height:800px)]:!h-50  hover:scale-102">
                <img
                  src={card.image}
                  alt={card.text}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 z-10 flex items-end justify-end">
                  <div className="px-4 py-2 rounded bg-gray-950 bg-opacity-80">
                    <p className="font-medium tracking-wide text-gray-100 text-md">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center mt-4 mb-8 [@media(min-height:730px)]:!mb-14  [@media(min-height:780px)]:!mb-20 space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

HeroSectionCardsScroll.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HeroSectionCardsScroll;
