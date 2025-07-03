import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NotFoundState from "./components/NotFoundState";
import TraderInfo from "./components/TraderInfo";
import { TraderPropType } from "../types/trader.types";

export default function TraderDetailsCardDesktop({
  trader = null,
  isLoading = false,
}) {
  const [showNoTrader, setShowNoTrader] = useState(false);

  useEffect(() => {
    // Reset the state whenever trader or loading state changes
    setShowNoTrader(false);

    let timer;
    if (!trader && !isLoading) {
      // Only start timer if we're not loading and have no trader
      timer = setTimeout(() => {
        setShowNoTrader(true);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [trader, isLoading]);

  // Show no trader message after 5 seconds if trader is not foun
  if (!trader && showNoTrader) {
    return <NotFoundState />;
  }

  return (
    <div className="col-span-3 pb-20 bg-white rounded-2xl shadow-lg">
      <TraderInfo trader={trader} />
    </div>
  );
}

TraderDetailsCardDesktop.propTypes = {
  trader: TraderPropType,
  isLoading: PropTypes.bool,
};
