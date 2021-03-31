import React, { Component } from 'react'
import {Link} from "react-router-dom";
import apiHandler from "./../api/apiHandler";
import EthToDollars from "./../controllers/EthToDollars"

// Styles
import "../styles/ArtworkCard.css"

export class ArtworkCard extends Component {
    state={
        auction: null,
        dollars: null
    }
    componentDidMount(){
        apiHandler.getLastAuction(this.props.artwork._id)
        .then(data=> this.setState({auction: data}))
        .catch(err=> console.log(err));
    }
    componentDidUpdate(prevProps, prevState){
        if (this.state.auction && (prevState.auction !==this.state.auction)) {
        if ((this.state.auction.active && this.state.auction.bids.length>0) || (this.state.auction && !this.state.auction.active)) {
            EthToDollars(this.state.auction.bids[0].bidValue)
            .then(res => this.setState({dollars: res}))
            .catch(err=> console.log(err));
            } else if (this.state.auction.active && this.state.auction.bids.length===0) {
                EthToDollars(this.state.auction.initialPrice)
                .then(res => this.setState({dollars: res}))
                .catch(err=> console.log(err));
            }
        }
    }
    render() {
        const {artwork} = this.props
        const {auction, dollars} = this.state
        // console.log("ArtworkCard state: ", this.state)
        return (
            <div className="ArtworkCard">
                <Link key={artwork._id} to={`/artworks/${artwork._id}`}>
                    <img src={artwork.image} alt={`${artwork.title} picture`}/>
                    <div className="details">
                        <h5>{artwork.title}</h5>
                        <h6>{artwork.creator.username}</h6>
                        <div className="Bid-status">
                            {!auction && <p>Not for sale</p>}
                            {auction && auction.active && auction.bids.length>0 &&(
                            <><p>Current Price</p>
                            <p className="Price">{auction.bids[0].bidValue}<span className="Currency">ETH</span></p>
                            <p className="Dollars">${dollars}</p></>)}
                            {auction && auction.active && auction.bids.length===0 &&(
                            <><p>Current Price</p>
                            <p className="Price">{auction.initialPrice}<span className="Currency">ETH</span></p>
                            <p className="Dollars">${dollars}</p></>)}
                            {auction && !auction.active && (
                            <><p>Sold for</p>
                            <p className="Price">{auction.bids[0].bidValue}<span className="Currency">ETH</span></p>
                            <p className="Dollars">${dollars}</p></>)}
                            
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default ArtworkCard
