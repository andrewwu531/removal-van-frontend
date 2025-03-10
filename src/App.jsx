import React, { useState, useEffect } from "react";
import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobilev2 from "./components/HeaderMobilev2";

// Mobile Components
import PriceCalculatorMobile from "./components/PriceCalculatorMobile";

import PriceCalculatorMobilev2 from "./components/PriceCalculatorMobilev2";
import BookingStepsMobile from "./components/BookingStepsMobile";
import HeroSectionMobile from "./components/HeroSectionMobile";
import FormMobile from "./components/FormMobile";
import FooterMobile from "./components/FooterMobile";
import ChatIconMobile from "./components/ChatIconMobile";

// Desktop Components
import BookingStepsDesktop from "./components/BookingStepsDesktop";
import PriceCalculatorDesktop from "./components/PriceCalculatorDesktop";
import HeroSectionDesktop from "./components/HeroSectionDesktop";
import FormDesktop from "./components/FormDesktop";
import FooterDesktop from "./components/FooterDesktop";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {screenSize < 1024 ? (
        <>
          <HeaderMobilev2 />
          <div className="mt-12"></div>
          <PriceCalculatorMobilev2 />
          {/* <PriceCalculatorMobile /> */}

          <BookingStepsMobile />
          {/* <HeroSectionMobile /> */}
          <FormMobile />
          <FooterMobile />
          <ChatIconMobile />
        </>
      ) : (
        <>
          <HeaderDesktop />
          <BookingStepsDesktop />
          <PriceCalculatorDesktop />
          <HeroSectionDesktop />
          <FormDesktop />
          <FooterDesktop />
        </>
      )}
    </div>
  );
}

export default App;
