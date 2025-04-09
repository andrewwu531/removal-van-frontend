import PropTypes from "prop-types";

export default function SearchDropdown({ items, selectedValue, onSelect }) {
  return (
    <div className="absolute left-0 z-50 w-full mt-2 bg-white rounded-lg shadow-md">
      {items.map((item) => (
        <div
          key={item}
          className={`p-2 cursor-pointer hover:bg-gray-100 
            ${selectedValue === item ? "bg-gray-50 text-red-500" : ""}`}
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

SearchDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
