export const serviceDisplayTitles = {
  Removal: "Removal Services",
  "House Renovation": "Home Renovation",
  "Carpet & Flooring": "Carpet & Flooring",
  Painting: "Painting Services",
  "Damage Repair": "Damage Repair",
  "Electricity & Gas": "Electrical & Gas Services",
  "Lock Smith": "Locksmith",
  "Solar Panels": "Solar Installation",
  "Window & Heating": "Window & HVAC Specialists",
  Car: "Automotive Services",
};

export const getServiceTitle = (service) => {
  return serviceDisplayTitles[service] || `${service} Services`;
};
