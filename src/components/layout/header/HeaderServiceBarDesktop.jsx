import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { serviceIcons } from "./constants/serviceIcons";
import ServiceButton from "./components/ServiceButton";
import { useState } from "react";

export default function HeaderServiceBarDesktop({
  currentService = "Removal",
  onServiceSelect,
}) {
  const [hoveredService, setHoveredService] = useState(null);
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    // Convert service name to URL format
    const urlServiceName = serviceName
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-");

    // Update URL and trigger service change
    navigate(`/${urlServiceName}`);
    onServiceSelect(serviceName);
  };

  return (
    <div className="w-full max-[500px]:overflow-hidden max-[500px]:transition-shadow max-[500px]:duration-200">
      <div className="flex items-center px-6 mt-2 min-[1920px]:mt-2.5 min-[500px]:justify-center max-[500px]:overflow-x-scroll max-[500px]:whitespace-nowrap max-[500px]:w-full max-[500px]:pb-[0.5px] max-[500px]:border-b max-[500px]:border-gray-200 max-[500px]:scrollbar-none relative">
        {serviceIcons.map((service, index) => (
          <ServiceButton
            key={index}
            service={service}
            isActive={currentService === service.name}
            onClick={() => handleServiceClick(service.name)}
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
