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
    <div className="flex items-center justify-center pb-1 mt-3 min-[1920px]:mt-3.5 bg-white shadow-xs">
      {serviceIcons.map((service, index) => (
        <ServiceButton
          key={index}
          service={service}
          isActive={currentService === service.name}
          onClick={handleServiceClick}
        />
      ))}
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
