import { useState, useEffect } from "react";
import BookingFormDesktop from "./BookingFormDesktop";
import BookingFormMobile from "./BookingFormMobile";

const BookingForm = () => {
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
    ComponentToRender = BookingFormMobile; // Mobile view
  } else {
    ComponentToRender = BookingFormDesktop; // Full Desktop view
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default BookingForm;
