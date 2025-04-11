import PropTypes from "prop-types";
import { getServiceTitle } from "../constants/serviceDisplayTitles";

export default function ServiceTitle({ currentService }) {
  return (
    <div className="px-2 text-[27px] min-[1339px]:text-3xl font-semibold text-gray-900 mb-6 min-[500px]:mb-7 min-[1339px]:mb-9 min-[1920px]:mb-8">
      {getServiceTitle(currentService)}
    </div>
  );
}

ServiceTitle.propTypes = {
  currentService: PropTypes.string.isRequired,
};
