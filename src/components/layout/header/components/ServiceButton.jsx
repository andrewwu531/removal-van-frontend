import PropTypes from "prop-types";

export default function ServiceButton({ service, isActive, onClick }) {
  const { IconComponent, iconProps } = service;

  return (
    <div
      className={`flex flex-col items-center justify-center ml-2 cursor-pointer hover:text-black transition-colors duration-200
        ${service.paddingTop}
        ${service.marginX}
        ${isActive ? "text-red-500" : "text-gray-700 hover:text-gray-900"}
        h-20 w-32 text-center scale-90 min-[1423px]:scale-95 min-[1920px]:scale-100 min-[1920px]:opacity-85`}
      onClick={() => onClick(service.name)}
    >
      <IconComponent {...iconProps} />
      <span className="mt-2 min-[1423px]:mt-1.5 min-[1920px]:mt-2 text-sm font-medium line-clamp-2">
        {service.name}
      </span>
    </div>
  );
}

ServiceButton.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    IconComponent: PropTypes.elementType.isRequired,
    iconProps: PropTypes.object.isRequired,
    paddingTop: PropTypes.string,
    marginX: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
