import React, { Component } from "react";
import "../../styles/BidStatus.css";

export class IsActive extends Component {
  state = {
    isFormOpen: false,
  };

  displayBidForm = () => {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  };

  handleSubmit = () => {};

  render() {
    const { isFormOpen } = this.state;
    const { bids } = this.props;
    return (
      <div className="BidStatus active">
        <div className="Auction-on flex">
          <div className="Infos-sale">
            <h5>Current Bid</h5>
            <p className="Price">
              {bids[0].bidValue}
              <span className="Currency">ETH</span>
            </p>
            <p className="Dollars">$700</p>
          </div>

          <button onClick={this.displayBidForm} className="Btn-bid">
            {!isFormOpen ? "Place a Bid" : "X"}
          </button>
        </div>

        {isFormOpen && (
          <form onSubmit={this.handleSubmit} className="Input-bid flex">
            <input
              type="number"
              name=""
              id="bid"
              min={bids[0].bidValue}
              placeholder="Place your bid"
            />
            <button className="Btn-bid">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default IsActive;
