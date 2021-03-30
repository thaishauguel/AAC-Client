import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "../../styles/BidStatus.css";

export class IsActive extends Component {
  state = {
    isFormOpen: false,
    isSubmit: false,
    bidValue: 0,
    currentInput: "",
  };

  componentDidMount() {
    if (this.props.auction.bids.length>0) {
      this.setState({ bidValue: this.props.auction.bids[0].bidValue })
    } else {
      this.setState({bidValue : this.props.auction.initialPrice })
    };
  }

  displayBidForm = () => {
    this.setState({ isFormOpen: !this.state.isFormOpen, isSubmit: false });
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ currentInput: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.setState({ bidValue: this.state.currentInput, isFormOpen: false, isSubmit: true }, () => {
    //   apiHandler
    //     .addABid(this.state.bidValue, this.props.auction._id)
    //     .then(this.setState({ currentInput: this.state.bidValue + 0.01 }))
    //     .catch((err) => console.log(err));
    // });

    if (this.state.currentInput){
      this.setState({ bidValue: this.state.currentInput, isFormOpen: !this.state.isFormOpen, isSubmit: true},  () => {
        apiHandler
          .addABid(this.state.bidValue, this.props.auction._id)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    }
    
  };

  render() {
    const { isFormOpen, isSubmit, bidValue, currentInput } = this.state;

    return (
      <div className="BidStatus active">
        <div className="Auction-on flex">
          <div className="Infos-sale">
            <h5>Current Bid</h5>
            <p className="Price">
              {bidValue}
              <span className="Currency">ETH</span>
            </p>
            <p className="Dollars">$700</p>
          </div>

          <button onClick={this.displayBidForm} className="Btn-bid">
            {!isFormOpen ? "Place a Bid" : "X"}
          </button>
        </div>
        
        {isFormOpen && !isSubmit && (
          <form onSubmit={this.handleSubmit} className="Input-bid flex">
            <input
              required
              type="number"
              id="bidValue"
              name="bidValue"
              min={Number(bidValue) + 0.01}
              step="0.01"
              placeholder="Place your bid"
              onChange={this.handleChange}
              value={currentInput}
            />

            <button className="Btn-bid">Submit</button>
          </form>
        )}
        {!isFormOpen && isSubmit && 
            <h5 style={{marginTop: "20px", color: "#00f035"}}>Thanks for your bid</h5>
        }
      </div>
    );
  }
}

export default IsActive;
