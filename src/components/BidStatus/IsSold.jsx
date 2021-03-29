import React from "react";
import "../../styles/BidStatus.css";

function IsSold(props) {
  const { bids } = props;
  return (
    <div className="BidStatus flex">
      <div className="Infos-sale">
        <h5>Sold For</h5>
        <p className="Price">
          {bids[0].bidValue}
          <span className="Currency">ETH</span>
        </p>
        <p className="Dollars">$700</p>
      </div>
      <div className="Infos-owner">
        <h5>Owned by</h5>
        <p>{bids[0].bidder.username}</p>
      </div>
    </div>
  );
}

export default IsSold;
