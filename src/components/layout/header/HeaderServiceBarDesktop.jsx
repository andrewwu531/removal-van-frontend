import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { serviceIcons } from "./constants/serviceIcons";
import ServiceButton from "./components/ServiceButton";
import { useState } from "react";

export default function HeaderServiceBarDesktop({
  currentService,
  onServiceSelect,
}) {
  const [hoveredService, setHoveredService] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isTraderDetailsPage = location.pathname.match(/^\/\d+$/);

  const handleServiceClick = (serviceName) => {
    if (isTraderDetailsPage) {
      navigate("/", { state: { selectedService: serviceName } });
    }
    onServiceSelect(serviceName);
  };

  return (
    <div className="w-full max-[500px]:overflow-hidden max-[500px]:transition-shadow max-[500px]:duration-200 max-[500px]:border-b max-[500px]:border-gray-200 max-[500px]:hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] max-[500px]:pb-1">
      <div className="flex items-center px-6 mt-3 min-[1920px]:mt-2.5 min-[500px]:justify-center max-[500px]:overflow-x-scroll max-[500px]:whitespace-nowrap max-[500px]:w-full max-[500px]:scrollbar-thin max-[500px]:scrollbar-track-transparent max-[500px]:scrollbar-thumb-gray-200 [&::-webkit-scrollbar-thumb]:h-[1px] [&::-webkit-scrollbar]:h-[1px]">
        {serviceIcons.map((service, index) => (
          <ServiceButton
            key={index}
            service={service}
            isActive={currentService === service.name}
            onClick={handleServiceClick}
            onHover={setHoveredService}
            isHovered={hoveredService === service.name}
            anyServiceHovered={hoveredService !== null}
          />
        ))}
      </div>
    </div>
  );
}

HeaderServiceBarDesktop.propTypes = {
  currentService: PropTypes.string,
  onServiceSelect: PropTypes.func.isRequired,
};

HeaderServiceBarDesktop.defaultProps = {
  currentService: "Removal",
};
