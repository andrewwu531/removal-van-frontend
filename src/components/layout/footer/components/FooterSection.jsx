import PropTypes from "prop-types";

export default function FooterSection({ title, children, className }) {
  return (
    <div className={className}>
      {title && <h3 className="mb-8 text-xl font-semibold">{title}</h3>}
      {children}
    </div>
  );
}

FooterSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
