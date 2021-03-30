import React, { Component } from 'react'
import {Link} from "react-router-dom";
import apiHandler from "./../api/apiHandler";


// Styles
import "../styles/ArtworkCard.css"

export class ArtworkCard extends Component {
    state={
        auction: null
    }
    componentDidMount(){
        apiHandler.getLastAuction(this.props.artwork._id)
        .then(data=> this.setState({auction: data}))
        .catch(err=> console.log(err))
    }
    render() {
        const {artwork} = this.props
        const {auction} = this.state
        console.log("ArtworkCard state: ", this.state)
        return (
            <div className="ArtworkCard">
                <Link key={artwork._id} to={`/artworks/${artwork._id}`}>
                    <img src={artwork.image} alt={`${artwork.title} picture`}/>
                    <div className="details">
                        <h5>{artwork.title}</h5>
                        <h6>{artwork.creator.username}</h6>
                        <div className="Bid-status">
                            {!auction && <p>Never sold</p>}
                            {auction && auction.active && auction.bids.length>0 &&(
                            <><p>Current Price</p>
                            <p className="Price">{auction.bids[0].bidValue}<span className="Currency">ETH</span></p>
                            <p className="Dollars">? $</p></>)}
                            {auction && auction.active && auction.bids.length===0 &&(
                            <><p>Current Price</p>
                            <p className="Price">{auction.initialPrice}<span className="Currency">ETH</span></p>
                            <p className="Dollars">? $</p></>)}
                            {auction && !auction.active && (
                            <><p>Sold for</p>
                            <p className="Price">{auction.bids[0].bidValue}<span className="Currency">ETH</span></p>
                            <p className="Dollars">? $</p></>)}
                            
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default ArtworkCard
