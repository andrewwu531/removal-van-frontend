import PropTypes from "prop-types";
import SearchDropdown from "./SearchDropdown";

export default function SearchInput({
  inputRef,
  value,
  onChange,
  placeholder,
  showDropdown,
  onFocus,
  dropdownRef,
  items,
  onSelect,
  id,
  name,
}) {
  return (
    <div className="relative flex-1">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        className="w-full p-2 font-sans text-black rounded-full outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {showDropdown && (
        <SearchDropdown
          ref={dropdownRef}
          items={items}
          selectedValue={value}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}

SearchInput.propTypes = {
  inputRef: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  dropdownRef: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
