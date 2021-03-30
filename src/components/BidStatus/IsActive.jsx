import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "../../styles/BidStatus.css";

export class IsActive extends Component {
  state = {
    isFormOpen: false,
    bidValue: 0,
    currentInput: 0,
  };

  componentDidMount() {
    if (this.props.auction.bids.length>0){this.setState({ bidValue: this.props.auction.bids[0].bidValue })}
    else {this.setState({bidValue : this.props.auction.initialPrice })};
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("hey");
    if (prevState.bidValue !== this.state.bidValue) {
      this.setState({ bidValue: this.state.bidValue });
    }
  }

  displayBidForm = () => {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ currentInput: value }, () =>
      console.log(this.state.bidValue)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.currentInput)
    if (this.state.currentInput){
      this.setState({ bidValue: this.state.currentInput }, () => {
        apiHandler
          .addABid(this.state.bidValue, this.props.auction._id)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    }
    
  };

  render() {
    const { isFormOpen } = this.state;
    const { auction } = this.props;
    return (
      <div className="BidStatus active">
        <div className="Auction-on flex">
          <div className="Infos-sale">
            <h5>Current Bid</h5>
            <p className="Price">
              {this.state.bidValue}
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
              id="bidValue"
              name="bidValue"
              min={Number(this.state.bidValue) + 0.01}
              step="0.01"
              placeholder="Place your bid"
              onChange={this.handleChange}
              value={this.state.currentInput}
            />

            <button className="Btn-bid">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default IsActive;
