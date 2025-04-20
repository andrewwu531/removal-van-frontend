import PropTypes from "prop-types";

export default function ServicesList({ services }) {
  return (
    <ul className="space-y-2 text-white">
      {services.map((service, index) => (
        <li key={index}>{service.title}</li>
      ))}
    </ul>
  );
}

ServicesList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
