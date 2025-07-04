import { useState, useEffect } from "react";
import HeaderSearchBarDesktop from "./header/HeaderSearchBarDesktop";
import HeaderServiceBarDesktop from "./header/HeaderServiceBarDesktop";
import PropTypes from "prop-types";
import FooterDesktop from "./footer/FooterDesktop";
import CookieBanner from "./cookie/CookieBanner";

export default function Layout({
  children,
  showFooter = true,
  currentService = "",
  currentLocation = "",
  onSearch = () => {},
  onServiceSelect = () => {},
  isCookiePopupOpen,
  onCookiePopupClose,
  isLoading = false,
}) {
  const [showFooterContent, setShowFooterContent] = useState(false);

  // 100ms timeout for footer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooterContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white z-100">
        <HeaderSearchBarDesktop
          onSearch={onSearch}
          currentService={currentService}
          currentLocation={currentLocation}
        />
        <HeaderServiceBarDesktop
          currentService={currentService}
          onServiceSelect={onServiceSelect}
        />
      </div>
      <div>{children}</div>
      {showFooter && !isLoading && showFooterContent && <FooterDesktop />}
      <CookieBanner isOpen={isCookiePopupOpen} onClose={onCookiePopupClose} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFooter: PropTypes.bool,
  currentService: PropTypes.string,
  currentLocation: PropTypes.string,
  onSearch: PropTypes.func,
  onServiceSelect: PropTypes.func,
  isCookiePopupOpen: PropTypes.bool,
  onCookiePopupClose: PropTypes.func,
  isLoading: PropTypes.bool,
};
