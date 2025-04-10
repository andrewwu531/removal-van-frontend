import { cookieOptions } from "../constants/cookieOptions";
import PropTypes from "prop-types";

export function CookieContent({ onAccept }) {
  return (
    <div className="container mx-auto px-10 py-4 flex flex-col min-[1339px]:flex-row items-center justify-between">
      <div className="text-gray-700 mb-4 min-[1339px]:mb-0 text-center min-[1339px]:text-left">
        <p className="text-sm min-[1339px]:text-base">
          {cookieOptions.bannerText}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="px-5 py-2.5 text-sm min-[1339px]:text-base text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors"
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
