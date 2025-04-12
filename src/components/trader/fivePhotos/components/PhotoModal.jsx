import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ImageWithFallback from "../../../common/image/ImageWithFallback";
import { getImageUrl } from "../utils/imageUtils";

export default function PhotoModal({ photos, traderName, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Overlay with opacity only, no blur
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Photo Gallery Container with custom scrollbar styles */}
      <div className="relative w-full h-[85vh] max-[500px]:w-full max-[500px]:h-full min-[500px]:w-[56%] bg-white min-[500px]:rounded-xl overflow-y-auto no-scrollbar">
        {/* Photos Container */}
        <div className="p-12 pt-13">
          <div className="grid grid-cols-2 gap-2.5 min-[500px]:gap-3">
            {photos.map((photo, index) => (
              <div key={index} className="relative w-full aspect-square">
                <ImageWithFallback
                  src={photo}
                  alt={`${traderName} photo ${index + 1}`}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Bottom Exit Button */}
          <div className="flex justify-center mt-12 min-[500px]:mt-16 mb-4">
            <button
              onClick={onClose}
              className="px-14 py-4 min-[500px]:text-[18px] font-semibold text-white transition-colors bg-red-500 rounded-4xl hover:bg-red-600"
              aria-label="Close gallery"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

PhotoModal.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  traderName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
