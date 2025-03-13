import { useState, useEffect } from "react";
import HeaderSearchBarDesktop from "./components/HeaderSearchBarDesktop";
import HeaderServiceBarDesktop from "./components/HeaderServiceBarDesktop";

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
          <div>mobile</div>
        </>
      ) : (
        <>
          <HeaderSearchBarDesktop />

          <HeaderServiceBarDesktop />
        </>
      )}
    </div>
  );
}

export default App;
