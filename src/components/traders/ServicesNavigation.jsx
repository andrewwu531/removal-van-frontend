import { useNavigate } from "react-router-dom";

const ServiceNavigation = () => {
  const navigate = useNavigate();

  // Service data with image mappings
  const services = [
    {
      name: "Removal",
      image: "/images/removal.webp",
      url: "/removal",
    },

    {
      name: "Painting",
      image: "/images/painting.webp",
      url: "/painting",
    },
    {
      name: "Carpet & Flooring",
      image: "/images/carpet-flooring.webp",
      url: "/carpet-flooring",
    },
    {
      name: "Electricity & Gas",
      image: "/images/electricity-gas.webp", // Will need to be added
      url: "/electricity-gas",
    },
    {
      name: "Bathroom & Kitchen",
      image: "/images/bathroom-kitchen.webp",
      url: "/bathroom-kitchen",
    },
    {
      name: "Window & Door",
      image: "/images/window-door.webp", // Will need to be added
      url: "/window-door",
    },
    // {
    //   name: "Exterior & Roofing",
    //   image: "/images/exterior-roofing.webp",
    //   url: "/exterior-roofing",
    // },
  ];

  const handleServiceClick = (serviceUrl) => {
    navigate(serviceUrl);
  };

  return (
    <div className="flex flex-col px-6 pt-48 mx-auto md:px-10 md:pt-48">
      <h1 className="pl-4 mb-6 text-2xl font-semibold text-left text-gray-900 md:pl-6 md:mb-6 md:text-2xl">
        Trending Services
      </h1>
      <div className="grid grid-cols-2 gap-y-6 md:grid-cols-7 md:gap-y-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleServiceClick(service.url)}
          >
            <div className="relative px-2 mb-3">
              <div className="overflow-hidden w-full rounded-2xl border-2 border-gray-200 shadow-md transition-colors duration-200 aspect-square">
                <img
                  src={service.image}
                  alt={service.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3E%3C/tspan%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
            <span className="font-medium text-center text-gray-700 transition-colors duration-200 text-[16px] sm:text-xl md:text-xl lg:text-xl xl:text-lg group-hover:text-blue-600">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceNavigation;
