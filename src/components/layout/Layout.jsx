import HeaderSearchBarDesktop from "./header/HeaderSearchBarDesktop";
import HeaderServiceBarDesktop from "./header/HeaderServiceBarDesktop";
import PropTypes from "prop-types";

export default function Layout({
  children,
  currentService,
  currentLocation,
  onSearch,
  onServiceSelect,
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
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  currentService: PropTypes.string,
  currentLocation: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onServiceSelect: PropTypes.func.isRequired,
};
