import { cookieOptions } from "../constants/cookieOptions";
import PropTypes from "prop-types";

export function CookieContent({ onAccept }) {
  return (
    <div className="flex items-center px-10 py-4">
      <div className="text-base text-gray-700">
        <p>{cookieOptions.bannerText}</p>
      </div>
      <div className="ml-auto">
        <button
          onClick={onAccept}
          className="px-5 py-2.5 text-base text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors whitespace-nowrap"
        >
          {cookieOptions.acceptButtonText}
        </button>
      </div>
    </div>
  );
}

CookieContent.propTypes = {
  onAccept: PropTypes.func.isRequired,
};
