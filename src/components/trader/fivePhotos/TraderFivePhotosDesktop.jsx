import PropTypes from "prop-types";
import MainPhoto from "./components/MainPhoto";
import PhotoGrid from "./components/PhotoGrid";
import { TraderPropType } from "../types/trader.types";

export default function TraderPhotos({ trader }) {
  return (
    <div className="grid min-[500px]:grid-cols-2 grid-cols-1 gap-2 p-4 mx-auto max-[500px]:px-10 min-[500px]:max-w-9/14 min-[1171px]:max-w-5/7 min-[1339px]:max-w-4/7 min-[1920px]:max-w-10/14">
      <MainPhoto photo={trader.photo1} altText={`${trader.name} photo 1`} />
      <div className="max-[500px]:hidden">
        <PhotoGrid
          photos={[trader.photo2, trader.photo3, trader.photo4, trader.photo5]}
          traderName={trader.name}
        />
      </div>
    </div>
  );
}

TraderPhotos.propTypes = {
  trader: TraderPropType.isRequired,
};
