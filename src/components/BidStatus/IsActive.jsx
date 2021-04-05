import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "../../styles/BidStatus.css";
import {withUser} from './../Auth/withUser';
import EthToDollars from "./../../controllers/EthToDollars";

export class IsActive extends Component {
  state = {
    isFormOpen: false,
    isSubmit: false,
    bidValue: 0,
    currentInput: "",
    message:"",
    displayMessage : false,
    dollars: null,
    currentHighestBids: null // sum of user's current bid values if they are highest
  };

  componentDidMount() {
    if (this.props.auction.bids.length>0) {
      this.setState({ bidValue: this.props.auction.bids[0].bidValue })
    } else {
      this.setState({bidValue : this.props.auction.initialPrice })
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {auction} = this.props
    const {bidValue} = this.state
    if(prevProps.auction._id !== auction._id) this.setState({displayMessage: false, currentInput: "", isFormOpen: false});

    if(prevProps.auction._id !== auction._id  || prevProps.auction !== auction) {
    // if(prevProps.auction._id !== this.props.auction._id ) {
      if (auction.bids.length>0) {
        this.setState({ bidValue: auction.bids[0].bidValue })
      } else {
        this.setState({bidValue : auction.initialPrice })
      }
    }
    if (prevState.bidValue !== bidValue) {

      EthToDollars(bidValue)
      .then(res => this.setState({dollars: res}))
      .catch(err=> console.log(err));
    }
  }


  displayBidForm = () => {
    if (this.props.context.user){
    this.setState({ isFormOpen: !this.state.isFormOpen, isSubmit: false });}
    else{this.setState({message : "You have to log in to place a bid", displayMessage : !this.state.displayMessage})}
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
      
      // get value of user's current highest bids
      apiHandler.getMyCurrentBids() // get array of all active auctions on which user has already bidded
      .then(res=>{
        let currentHighestBids = 0 
        if (res.length!==0){ // keep auctions where user is last bidder
        currentHighestBids = res.filter(auction=>auction.bids[0].bidder._id===this.props.context.user._id && auction._id!==this.props.auction._id);
        if (currentHighestBids.length===0) {
          currentHighestBids = 0
        } else { // add bid values
          currentHighestBids = currentHighestBids.reduce((acc, el)=>acc+el.bids[0].bidValue, 0)
        }
      } this.setState({currentHighestBids: currentHighestBids}, ()=>{
        if ((this.props.context.user.credit - this.state.currentHighestBids)>=this.state.currentInput) 
        { //user has enough credit
        this.setState({ bidValue: this.state.currentInput, isFormOpen: !this.state.isFormOpen, isSubmit: true},  () => {
          apiHandler
            .addABid(this.state.bidValue, this.props.auction._id)
            .then((res) => {
              console.log(res)
              this.setState({message:"Thanks for your bid", displayMessage: true})})
            .catch((err) => console.log(err));
        });
        } else { //user is trying to bid over their credit
          this.setState({message:"You don't have enough credit for this bid", displayMessage: true})
        }
      })
    })
      .catch(err=>console.log(err))
      
  }
    
  };

  render() {
    const { isFormOpen, isSubmit, bidValue, currentInput, message, displayMessage, dollars, } = this.state;
    const dollarsFormat = new Intl.NumberFormat().format(dollars)
    // console.log(bidValue)
    return (
      <div className="BidStatus active">
        <div className="Auction-on flex">
          <div className="Infos-sale">
            <h5>Current Bid</h5>
            {this.props.auction.bids[0] && <p className="Dollars">by {this.props.auction.bids[0].bidder.username}</p>
}
            <p className="Price">
              {bidValue}
              <span className="Currency">ETH</span>
            </p>
            <p className="Dollars">${dollarsFormat}</p>
          </div>

          <button onClick={this.displayBidForm} className="Btn-bid">
            {!isFormOpen ? "Place a bid" : "X"}
          </button>
        </div>
        
        {isFormOpen && !isSubmit && (
          <form onSubmit={this.handleSubmit} className="Input-bid flex slide-in-bid">
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
        {displayMessage && 
            <h5 style={{marginTop: "20px", color: "#00f035"}}>{message}</h5>
        }
      </div>
    );
  }
}

export default withUser(IsActive);
