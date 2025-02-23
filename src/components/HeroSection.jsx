import React, { useState, useEffect } from "react";
import HeroSectionDesktop from "./HeroSectionDesktop";
import HeroSectionMiniDesktop from "./HeroSectionMiniDesktop";
import HeroSectionMobile from "./HeroSectionMobile";
import Header from "./Header";

const HeroSection = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let ComponentToRender;

  if (screenSize < 768) {
    ComponentToRender = HeroSectionMobile; // Mobile view
  } else if (screenSize < 1280) {
    ComponentToRender = HeroSectionMiniDesktop; // Mini Desktop view
  } else {
    ComponentToRender = HeroSectionDesktop; // Full Desktop view
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default HeroSection;
