export const serviceDisplayTitles = {
  Removal: "Removal Services",
  "House Renovation": "Home Renovation",
  Painting: "Painting Services",
  "Carpet & Flooring": "Carpet & Flooring",
  "Electricity & Gas": "Electrical & Gas Services",
  "Bathroom & Kitchen": "Bathroom & Kitchen Services",
  "Window & Door": "Window & Door Specialists",
  "Exterior & Roofing": "Exterior & Roofing",
  "Solar Panels": "Solar Installation",
  "Commercial Maintenance": "Commercial Maintenance",
};

export const getServiceTitle = (service) => {
  return serviceDisplayTitles[service] || `${service} Services`;
};
