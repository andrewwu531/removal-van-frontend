import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HeroSectionMobile from "./components/HeroSectionMobile";
import PriceCalculator from "./components/PriceCalculator";
// import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import Form from "./components/Form";
import BookingSteps from "./components/BookingSteps";
import ChatIconMobile from "./components/ChatIconMobile";

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

      {screenSize < 1024 ? <HeroSectionMobile /> : null}
      <BookingSteps />
      <PriceCalculator />
      <HeroSection />
      <Form />
      <Footer />
      {screenSize < 1024 ? <ChatIconMobile /> : null}
    </div>
  );
}

export default App;
