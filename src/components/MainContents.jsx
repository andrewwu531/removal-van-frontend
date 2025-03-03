import { useState, useEffect } from "react";
import MainContentsDesktop from "./MainContentsDesktop";
import MainContentsMobile from "./MainContentsMobile";

const MainContents = () => {
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
    ComponentToRender = MainContentsMobile; // Mobile view
  } else {
    ComponentToRender = MainContentsDesktop; // Full Desktop view
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default MainContents;
