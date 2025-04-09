import PropTypes from "prop-types";
import MainPhoto from "./components/MainPhoto";
import PhotoGrid from "./components/PhotoGrid";
import { TraderPropType } from "../types/trader.types";

export default function TraderPhotos({ trader }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 mx-auto max-w-5/7 min-[1423px]:max-w-9/14 min-[1920px]:max-w-5/7">
      <MainPhoto photo={trader.photo1} altText={`${trader.name} photo 1`} />
      <PhotoGrid
        photos={[trader.photo2, trader.photo3, trader.photo4, trader.photo5]}
        traderName={trader.name}
      />
    </div>
  );
}

TraderPhotos.propTypes = {
  trader: TraderPropType.isRequired,
};
