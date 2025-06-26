export const serviceDisplayTitles = {
  Removal: "Removal Services",
  Painting: "Painting Services",
  "Carpet & Flooring": "Carpet & Flooring",
  "Bathroom & Kitchen": "Bathroom & Kitchen Services",
  "Window & Door": "Window & Door Specialists",
  "Exterior & Roofing": "Exterior & Roofing",
  "Solar Panels": "Solar Installation",
  "Commercial Maintenance": "Commercial Maintenance",
};

export const serviceTypes = [
  { key: "Removal", label: serviceDisplayTitles["Removal"], icon: "🚚" },
  { key: "Painting", label: serviceDisplayTitles["Painting"], icon: "🎨" },
  {
    key: "Carpet & Flooring",
    label: serviceDisplayTitles["Carpet & Flooring"],
    icon: "🪑",
  },
  {
    key: "Bathroom & Kitchen",
    label: serviceDisplayTitles["Bathroom & Kitchen"],
    icon: "🛁",
  },
  {
    key: "Window & Door",
    label: serviceDisplayTitles["Window & Door"],
    icon: "🚪",
  },
  {
    key: "Exterior & Roofing",
    label: serviceDisplayTitles["Exterior & Roofing"],
    icon: "🏠",
  },
  {
    key: "Solar Panels",
    label: serviceDisplayTitles["Solar Panels"],
    icon: "🔆",
  },
  {
    key: "Commercial Maintenance",
    label: serviceDisplayTitles["Commercial Maintenance"],
    icon: "🏢",
  },
];

export const getServiceTitle = (service) => {
  return serviceDisplayTitles[service] || `${service} Services`;
};
