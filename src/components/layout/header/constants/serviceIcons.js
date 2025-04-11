import { TbTruckDelivery, TbRollerSkating } from "react-icons/tb";
import {
  MdOutlineBuild,
  MdOutlineWindow,
  MdOutlineFormatPaint,
  MdDirectionsCar,
  MdOutlineWbSunny,
} from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiLockKey } from "react-icons/pi";

export const serviceIcons = [
  {
    name: "Removal",
    IconComponent: TbTruckDelivery,
    iconProps: { size: 30, className: "text-gray-600" },
    paddingTop: "-pt-1",
    marginX:
      "min-[500px]:-mr-8 min-[1256px]:-mr-7 min-[1423px]:-mr-6 min-[1920px]:-mr-4",
  },
  {
    name: "House Renovation",
    IconComponent: MdOutlineBuild,
    iconProps: { size: 26, className: "text-gray-600" },
    paddingTop: "pt-1",
    marginX:
      "-mr-1 min-[500px]:-mr-2 min-[1256px]:-mr-1.5 min-[1423px]:-mr-0.5 min-[1920px]:mr-1.5",
  },
  {
    name: "Carpet & Flooring",
    IconComponent: TbRollerSkating,
    iconProps: { size: 29, className: "text-gray-600" },
    paddingTop: "pt-0",
    marginX:
      "min-[500px]:-mr-8.5 min-[1256px]:-mr-8 min-[1423px]:-mr-7 min-[1920px]:-mr-5",
  },
  {
    name: "Painting",
    IconComponent: MdOutlineFormatPaint,
    iconProps: { size: 25, className: "text-gray-600" },
    paddingTop: "pt-1 min-[1256px]:pt-2 min-[1423px]:pt-1.5",
    marginX:
      "min-[500px]:-mr-9.5 min-[1256px]:-mr-9 min-[1423px]:-mr-8 min-[1920px]:-mr-6",
  },
  {
    name: "Electricity & Gas",
    IconComponent: HiOutlineLightBulb,
    iconProps: { size: 28, className: "text-gray-600 stroke-2" },
    paddingTop: "pt-0 min-[1256px]:pt-1",
    marginX:
      "min-[500px]:-mr-5 min-[1256px]:-mr-4 min-[1423px]:-mr-3 min-[1920px]:-mr-1",
  },
  {
    name: "Door Installation",
    IconComponent: PiLockKey,
    iconProps: { size: 25, className: "text-gray-700 stroke-4" },
    paddingTop: "pt-1 min-[1256px]:pt-2 min-[1423px]:pt-1.5",
    marginX:
      "min-[500px]:-mr-7 min-[1256px]:-mr-6.5 min-[1423px]:-mr-5.5 min-[1920px]:-mr-3.5",
  },
  {
    name: "Solar Panels",
    IconComponent: MdOutlineWbSunny,
    iconProps: { size: 26, className: "text-gray-800" },
    paddingTop: "pt-1 min-[1256px]:pt-2 min-[1423px]:pt-1.5",
    marginX:
      "min-[500px]:-mr-5 min-[1256px]:-mr-4.5 min-[1423px]:-mr-3.5 min-[1920px]:-mr-1.5",
  },
  {
    name: "Window & Heating",
    IconComponent: MdOutlineWindow,
    iconProps: { size: 25, className: "text-gray-800" },
    paddingTop: "pt-1.5",
    marginX:
      "min-[500px]:-mr-9 min-[1423px]:-mr-8 min-[1920px]:-mr-7 min-[1920px]:-mr-5",
  },
  {
    name: "Car",
    IconComponent: MdDirectionsCar,
    iconProps: { size: 26, className: "text-gray-600" },
    paddingTop: "pt-1.5",
  },
];
