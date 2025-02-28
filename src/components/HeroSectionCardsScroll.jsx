import { useRef, useState } from "react";
import PropTypes from "prop-types";

const HeroSectionCardsScroll = ({ cards }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set fixed number of dots to 4 and map them evenly to card indices.
  const numDots = 4;
  const dotMapping = Array.from({ length: numDots }, (_, i) =>
    Math.round((i / (numDots - 1)) * (cards.length - 1))
  );

  // Scroll to the card corresponding to the dot (using the mapping)
  const scrollToIndex = (cardIndex) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: cardIndex * cardWidth,
        behavior: "smooth",
      });
      setCurrentIndex(cardIndex);
    }
  };

  // Update the current index based on scroll position
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
      // If the scroll position is at (or nearly at) the end, set to last index.
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setCurrentIndex(cards.length - 1);
      } else {
        // Otherwise, calculate the index normally.
        const index = Math.floor((scrollLeft + clientWidth / 2) / clientWidth);
        setCurrentIndex(index);
      }
    }
  };

  // Determine the active dot based on currentIndex and dotMapping thresholds.
  const getActiveDot = () => {
    let activeDot = 0;
    // Iterate through dotMapping to calculate boundaries between dot regions.
    for (let i = 0; i < dotMapping.length - 1; i++) {
      const boundary = (dotMapping[i] + dotMapping[i + 1]) / 2;
      if (currentIndex < boundary) {
        activeDot = i;
        break;
      } else {
        activeDot = i + 1;
      }
    }
    return activeDot;
  };

  const activeDot = getActiveDot();

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
      <div className="flex justify-center mt-4 mb-8 [@media(min-height:730px)]:!mb-14 [@media(min-height:780px)]:!mb-20 space-x-2">
        {Array.from({ length: numDots }).map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => scrollToIndex(dotMapping[dotIndex])}
            className={`w-2 h-2 rounded-full ${
              activeDot === dotIndex ? "bg-blue-500" : "bg-gray-300"
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
