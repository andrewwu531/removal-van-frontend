import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { serviceIcons } from "./constants/serviceIcons";
import ServiceButton from "./components/ServiceButton";

export default function HeaderServiceBarDesktop({
  currentService,
  onServiceSelect,
}) {
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
    <div className="w-full overflow-hidden transition-shadow duration-200 border-b border-gray-200 hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
      <div className="flex items-center px-6 mt-3 -mb-1 min-[1920px]:mt-2.5 min-[500px]:justify-center max-[500px]:overflow-x-scroll max-[500px]:whitespace-nowrap max-[500px]:w-full max-[500px]:scrollbar-thin max-[500px]:scrollbar-track-transparent max-[500px]:scrollbar-thumb-gray-200 [&::-webkit-scrollbar-thumb]:h-[5px] [&::-webkit-scrollbar]:h-[8px]">
        {serviceIcons.map((service, index) => (
          <ServiceButton
            key={index}
            service={service}
            isActive={currentService === service.name}
            onClick={handleServiceClick}
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
