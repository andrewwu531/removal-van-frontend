import { TbTruckDelivery } from "react-icons/tb";
import {
  MdOutlineBuild,
  MdOutlineWindow,
  MdOutlineFormatPaint,
  MdDirectionsCar,
  MdOutlineWbSunny,
} from "react-icons/md";
import { TbRollerSkating, TbSolarPanel2 } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiLockKey } from "react-icons/pi";
import { BsSun } from "react-icons/bs";
import { GiMechanicGarage } from "react-icons/gi";
import { AiOutlineSetting } from "react-icons/ai";

import { FaTools } from "react-icons/fa";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const services = [
  {
    name: "Removal",
    icon: <TbTruckDelivery size={30} className="text-gray-600" />,
    paddingTop: "-pt-1",
    marginX: "-mr-8 min-[1256px]:-mr-7 min-[1423px]:-mr-6 min-[1920px]:-mr-4",
  },
  {
    name: "House Renovation",
    icon: <MdOutlineBuild size={26} className="text-gray-600" />,
    paddingTop: "pt-1",
    marginX:
      "-mr-2 min-[1256px]:-mr-1.5 min-[1423px]:-mr-0.5 min-[1920px]:mr-1.5",
  },
  {
    name: "Carpet & Flooring",
    icon: <TbRollerSkating size={29} className="text-gray-600" />,
    paddingTop: "pt-0",
    marginX: "-mr-8.5 min-[1256px]:-mr-8 min-[1423px]:-mr-7 min-[1920px]:-mr-5",
  },
  {
    name: "Painting",
    icon: <MdOutlineFormatPaint size={25} className="text-gray-600" />,
    paddingTop: "pt-1 min-[1256px]:pt-2 min-[1423px]:pt-1.5",
    marginX: "-mr-9.5 min-[1256px]:-mr-9 min-[1423px]:-mr-8 min-[1920px]:-mr-6",
  },
  {
    name: "Electricity & Gas",
    icon: <HiOutlineLightBulb size={28} className="text-gray-600 stroke-2" />,
    paddingTop: "pt-0 min-[1256px]:pt-1",
    marginX: "-mr-5 min-[1256px]:-mr-4 min-[1423px]:-mr-3 min-[1920px]:-mr-1",
  },
  {
    name: "Door Installation",
    icon: <PiLockKey size={25} className="text-gray-700 stroke-4" />,
    paddingTop: "pt-1 min-[1256px]:pt-2 min-[1423px]:pt-1.5",
    marginX:
      "-mr-7 min-[1256px]:-mr-6.5 min-[1423px]:-mr-5.5 min-[1920px]:-mr-3.5",
  },
  {
    name: "Solar Panels",
    icon: <MdOutlineWbSunny size={26} className="text-gray-800" />,
    paddingTop: "pt-1 min-[1256px]:pt-2 min-[1423px]:pt-1.5",
    marginX:
      "-mr-5 min-[1256px]:-mr-4.5 min-[1423px]:-mr-3.5 min-[1920px]:-mr-1.5",
  },
  {
    name: "Window & Heating",
    icon: <MdOutlineWindow size={25} className="text-gray-800" />,
    paddingTop: "pt-1.5",
    marginX: "-mr-9 min-[1423px]:-mr-8 min-[1920px]:-mr-7 min-[1920px]:-mr-5",
  },
  {
    name: "Car",
    icon: <MdDirectionsCar size={26} className="text-gray-600" />,
    paddingTop: "pt-1.5",
  },
];

const ServiceBarDesktop = ({ currentService, onServiceSelect }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isTraderDetailsPage = location.pathname.match(/^\/\d+$/); // Checks if we're on a trader details page

  const handleServiceClick = (serviceName) => {
    if (isTraderDetailsPage) {
      // If we're on a trader details page, navigate to home with the new service
      navigate("/", { state: { selectedService: serviceName } });
    }
    // Always update the current service
    onServiceSelect(serviceName);
  };

  return (
    <div className="flex items-center justify-center pb-1 mt-3 min-[1920px]:mt-3.5 bg-white shadow-xs">
      {services.map((service, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center ml-2 cursor-pointer hover:text-black transition-colors duration-200
            ${service.paddingTop}
            ${service.marginX}
            ${
              currentService === service.name
                ? "text-red-500"
                : "text-gray-700 hover:text-gray-900"
            }
            h-20 w-32 text-center scale-90 min-[1423px]:scale-95 min-[1920px]:scale-100 min-[1920px]:opacity-85`}
          onClick={() => handleServiceClick(service.name)}
        >
          {service.icon}
          <span className="mt-2 min-[1423px]:mt-1.5 min-[1920px]:mt-2 text-sm font-medium line-clamp-2">
            {service.name}
          </span>
        </div>
      ))}
    </div>
  );
};

ServiceBarDesktop.propTypes = {
  currentService: PropTypes.string,
  onServiceSelect: PropTypes.func.isRequired,
};

ServiceBarDesktop.defaultProps = {
  currentService: "Removal",
};

export default ServiceBarDesktop;
