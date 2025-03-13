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

const services = [
  {
    name: "Removal",
    icon: <TbTruckDelivery size={30} className="text-gray-600" />,
  },
  {
    name: "House Renovation",
    icon: <MdOutlineBuild size={26} className="text-gray-600" />,
  },
  {
    name: "Carpet & Flooring",
    icon: <TbRollerSkating size={29} className="text-gray-600 " />,
  },
  {
    name: "Painting",
    icon: <MdOutlineFormatPaint size={25} className="text-gray-600" />,
  },
  {
    name: "Damage Repair",
    icon: <AiOutlineSetting size={25} className="text-gray-800 stroke-4" />,
  },
  {
    name: "Electricity & Gas",
    icon: <HiOutlineLightBulb size={28} className="text-gray-600 stroke-2" />,
  },
  {
    name: "Locksmith",
    icon: <PiLockKey size={25} className="text-gray-700 stroke-4" />,
  },
  {
    name: "Solar Panels",
    icon: <MdOutlineWbSunny size={26} className="text-gray-800" />,
  },
  {
    name: "Window & Heating & Ventilation",
    icon: <MdOutlineWindow size={25} className="text-gray-800" />,
  },
  {
    name: "Car",
    icon: <MdDirectionsCar size={26} className="text-gray-600" />,
  },
];

const ServiceBarDesktop = () => {
  return (
    <div className="flex justify-center py-4 space-x-10 bg-white shadow-md">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer hover:text-black"
        >
          {service.icon}
          <span className="mt-1 text-sm font-medium text-gray-700">
            {service.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ServiceBarDesktop;
