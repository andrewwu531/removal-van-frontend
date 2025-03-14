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

const services = [
  {
    name: "Removal",
    icon: <TbTruckDelivery size={30} className="text-gray-600" />,
    paddingTop: "-pt-0.5",
    marginX: "-mr-2",
  },
  {
    name: "House Renovation",
    icon: <MdOutlineBuild size={26} className="text-gray-600" />,
    paddingTop: "pt-0.5",
    marginX: "mr-3.5",
  },
  {
    name: "Carpet & Flooring",
    icon: <TbRollerSkating size={29} className="text-gray-600" />,
    paddingTop: "pt-0",
    marginX: "-mr-3.5",
  },
  {
    name: "Painting",
    icon: <MdOutlineFormatPaint size={25} className="text-gray-600" />,
    paddingTop: "pt-1",
    marginX: "-mr-5.5",
  },
  {
    name: "Damage Repair",
    icon: <AiOutlineSetting size={25} className="text-gray-800 stroke-4" />,
    paddingTop: "pt-1",
    marginX: "-mr-0.5",
  },
  {
    name: "Electricity & Gas",
    icon: <HiOutlineLightBulb size={28} className="text-gray-600 stroke-2" />,
    paddingTop: "pt-0",
    marginX: "-mr-4",
  },
  {
    name: "Locksmith",
    icon: <PiLockKey size={25} className="text-gray-700 stroke-4" />,
    paddingTop: "pt-1",
    marginX: "-mr-7",
  },
  {
    name: "Solar Panels",
    icon: <MdOutlineWbSunny size={26} className="text-gray-800" />,
    paddingTop: "pt-1",
    marginX: "-mr-1",
  },
  {
    name: "Window & Heating",
    icon: <MdOutlineWindow size={25} className="text-gray-800" />,
    paddingTop: "pt-1.5",
    marginX: "-mr-5",
  },
  {
    name: "Car",
    icon: <MdDirectionsCar size={26} className="text-gray-600" />,
    paddingTop: "pt-1.5",
  },
];

const ServiceBarDesktop = ({ currentService, onServiceSelect }) => {
  return (
    <div className="flex items-center justify-center pb-2 bg-white shadow-xs">
      {services.map((service, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center cursor-pointer hover:text-black transition-colors duration-200
            ${service.paddingTop}
            ${service.marginX}
            ${
              currentService === service.name
                ? "text-red-500"
                : "text-gray-700 hover:text-gray-900"
            }
            h-20 w-32 text-center`}
          onClick={() => onServiceSelect(service.name)}
        >
          {service.icon}
          <span className="mt-2 text-sm font-medium line-clamp-2">
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
