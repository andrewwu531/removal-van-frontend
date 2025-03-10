import { useState, useEffect } from "react";
import HeroSectionDesktop from "./HeroSectionDesktop";
// Remove the mobile import if it's no longer needed
// import HeroSectionMobile from "./HeroSectionMobile";

const HeroSection = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If screenSize is less than 1024, nothing will be rendered.
  const ComponentToRender = screenSize >= 1024 ? HeroSectionDesktop : null;

  return <div>{ComponentToRender && <ComponentToRender />}</div>;
};

export default HeroSection;
