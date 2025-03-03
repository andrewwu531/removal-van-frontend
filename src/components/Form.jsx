import { useState, useEffect } from "react";
import FormDesktop from "./FormDesktop";
import FormMobile from "./FormMobile";

const Form = () => {
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
    ComponentToRender = FormMobile; // Mobile view
  } else {
    ComponentToRender = FormDesktop; // Full Desktop view
  }

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default Form;
