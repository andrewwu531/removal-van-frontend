import React, { useState, useEffect } from "react";
import Header from "./components/Header";

// Mobile Components
import PriceCalculatorMobile from "./components/PriceCalculatorMobile";
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
      <Header />
      {screenSize < 1024 ? (
        <>
          <PriceCalculatorMobile />
          <BookingStepsMobile />
          <HeroSectionMobile />
          <FormMobile />
          <FooterMobile />
          <ChatIconMobile />
        </>
      ) : (
        <>
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
