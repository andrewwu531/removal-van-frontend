import PropTypes from "prop-types";

export const TraderPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  main_photo: PropTypes.string.isRequired,
  service_type: PropTypes.string.isRequired,
  from_price: PropTypes.number.isRequired,
  pricing_descriptions: PropTypes.string,
  qualifications: PropTypes.string.isRequired,
  service_descriptions: PropTypes.string.isRequired,
  available_locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  photo1: PropTypes.string,
  photo2: PropTypes.string,
  photo3: PropTypes.string,
  photo4: PropTypes.string,
  photo5: PropTypes.string,
});
