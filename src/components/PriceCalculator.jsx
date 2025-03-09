import { useState, useEffect } from "react";
import PriceCalculatorDesktop from "./PriceCalculatorDesktop";
import PriceCalculatorMobile from "./PriceCalculatorMobile";

const PriceCalculator = () => {
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
    ComponentToRender = PriceCalculatorMobile; // Mobile view
  } else {
    ComponentToRender = PriceCalculatorDesktop; // Full Desktop view
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default PriceCalculator;
