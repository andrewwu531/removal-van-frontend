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
import { GiBathtub } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { LuHammer } from "react-icons/lu";

export const serviceIcons = [
  {
    name: "Removal",
    IconComponent: TbTruckDelivery,
    iconProps: {
      size: 30,
      className: "text-gray-600 max-[500px]:translate-y-1.5",
    },
    paddingTop: "-pt-1",
    marginX:
      "mr-0.5 min-[500px]:-mr-8 min-[1256px]:-mr-7 min-[1423px]:-mr-6.5 min-[1920px]:-mr-4",
  },
  {
    name: "House Renovation",
    IconComponent: MdOutlineBuild,
    iconProps: {
      size: 26,
      className: "text-gray-600 max-[500px]:translate-y-1 max-[500px]:scale-95",
    },
    paddingTop: "pt-1",
    marginX:
      "mr-0.5 min-[500px]:-mr-8.5 min-[1256px]:-mr-8 min-[1423px]:-mr-7.5 min-[1920px]:mr-9",
  },
  {
    name: "Painting",
    IconComponent: MdOutlineFormatPaint,
    iconProps: {
      size: 26,
      className:
        "text-gray-600 max-[500px]:translate-y-1 min-[500px]:-translate-y-0.5 max-[500px]:scale-95",
    },
    paddingTop: "pt-1 min-[1256px]:pt-2 min-[1423px]:pt-1",
    marginX:
      "min-[500px]:-mr-9 min-[1256px]:-mr-8.5 min-[1423px]:-mr-7.5 min-[1920px]:-mr-5.5",
  },
  {
    name: "Carpet & Flooring",
    IconComponent: TbRollerSkating,
    iconProps: {
      size: 29,
      className: "text-gray-600 max-[500px]:translate-y-1.5",
    },
    marginX:
      "-mr-1 min-[1256px]:-mr-0.5 min-[1423px]:mr-0.5 min-[1920px]:mr-2.5",
  },
  {
    name: "Bathroom & Kitchen",
    IconComponent: LuHammer,
    iconProps: {
      size: 25,
      className:
        "text-gray-600 max-[500px]:translate-y-1.5 min-[500px]:-translate-y-0.5",
    },
    paddingTop: "pt-2 max-[500px]:pt-1",
    marginX:
      "-mr-1 min-[1256px]:-mr-2.5 min-[1423px]:-mr-1.5 min-[1920px]:mr-0.5",
    whiteSpace: "nowrap",
  },
  {
    name: "Window & Door",
    IconComponent: PiLockKey,
    iconProps: {
      size: 26,
      className:
        "text-gray-700 stroke-4 max-[500px]:translate-y-1.5 max-[500px]:scale-95",
    },
    paddingTop: "pt-1 min-[1256px]:pt-2.5 min-[1423px]:pt-2",
    marginX:
      "-mr-1 min-[500px]:-mr-8 min-[1256px]:-mr-7.5 min-[1423px]:-mr-3 min-[1920px]:-mr-4.5",
  },
  {
    name: "Exterior & Roofing",
    IconComponent: MdOutlineWindow,
    iconProps: {
      size: 26,
      className:
        "text-gray-700 max-[500px]:translate-y-1.5 min-[500px]:-translate-y-0.5 max-[500px]:scale-95",
    },
    paddingTop: "pt-2 max-[500px]:pt-1",
    marginX:
      "-mr-0.5 min-[500px]:-mr-8.5 min-[1423px]:-mr-5.5 min-[1920px]:-mr-6.5",
  },
  {
    name: "Solar Panels",
    IconComponent: MdOutlineWbSunny,
    iconProps: {
      size: 27,
      className:
        "text-gray-800 max-[500px]:translate-y-1.5 min-[500px]:-translate-y-0.5 max-[500px]:scale-90",
    },
    paddingTop: "pt-0.5 min-[1256px]:pt-0 min-[1423px]:pt-2",
    marginX:
      "min-[500px]:-mr-5.5 min-[1256px]:-mr-5 min-[1423px]:-mr-10 min-[1920px]:-mr-2",
  },
  {
    name: "Commercial",
    IconComponent: BiBuildingHouse,
    iconProps: {
      size: 27,
      className:
        "text-gray-700 max-[500px]:translate-y-1.5 min-[500px]:-translate-y-0.5 max-[500px]:scale-90",
    },
    paddingTop: "pt-2 max-[500px]:pt-0.5",
    marginX:
      " min-[500px]:-mr-7.5 min-[1256px]:-mr-8.5 min-[1423px]:-mr-5.5 min-[1920px]:-mr-3.5",
    whiteSpace: "nowrap",
  },
];
