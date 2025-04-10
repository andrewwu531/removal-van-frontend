import HeaderSearchBarDesktop from "./header/HeaderSearchBarDesktop";
import HeaderServiceBarDesktop from "./header/HeaderServiceBarDesktop";
import PropTypes from "prop-types";
import FooterDesktop from "./footer/FooterDesktop";
import CookieBanner from "./cookie/CookieBanner";

export default function Layout({
  children,
  showFooter = true,
  currentService,
  currentLocation,
  onSearch,
  onServiceSelect,
  isLoading,
}) {
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
      {children}
      {showFooter && !isLoading && <FooterDesktop />}
      <CookieBanner />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFooter: PropTypes.bool,
  currentService: PropTypes.string.isRequired,
  currentLocation: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onServiceSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
