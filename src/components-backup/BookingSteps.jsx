import { useState, useEffect } from "react";
import BookingStepsDesktop from "./BookingStepsDesktop";
import BookingStepsMobile from "./BookingStepsMobile";

const BookingSteps = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let ComponentToRender;

  if (screenSize < 1024) {
    ComponentToRender = BookingStepsMobile; // Mobile view
  } else {
    ComponentToRender = BookingStepsDesktop; // Full Desktop view
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default BookingSteps;
