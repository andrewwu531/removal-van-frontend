import { useState, useEffect } from "react";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

const Footer = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let ComponentToRender;

  if (screenSize < 950) {
    ComponentToRender = FooterMobile; // Mobile view
  } else {
    ComponentToRender = FooterDesktop; // Full Desktop view
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default Footer;
