import React, { Component } from 'react'
import "../../styles/BidStatus.css";
import EthToDollars from "./../../controllers/EthToDollars";

export default class IsSold extends Component {

  state = {
    dollars: null
  }
  componentDidMount(){
    EthToDollars(this.props.bids[0].bidValue)
      .then(res => this.setState({dollars: res}))
      .catch(err=> console.log(err))
  }
  render() {
    
  const { bids } = this.props;
  const {dollars} = this.state;
  const dollarsFormat = new Intl.NumberFormat().format(dollars)

    return (
    <div className="BidStatus flex">
      <div className="Infos-sale">
        <h5>Sold For</h5>
        <p className="Price">
          {bids[0].bidValue}
          <span className="Currency">ETH</span>
        </p>
        <p className="Dollars">${dollarsFormat}</p>
      </div>
      <div className="Infos-owner">
        <h5>Owned by</h5>
        <p>{bids[0].bidder.username}</p>
      </div>
    </div>
    )
  }
}

