import PropTypes from "prop-types";

export default function ServicesList({ services }) {
  return (
    <ul className="space-y-2">
      {services.map((service, index) => (
        <li key={index}>
          <a>{service.title}</a>
        </li>
      ))}
    </ul>
  );
}

ServicesList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
