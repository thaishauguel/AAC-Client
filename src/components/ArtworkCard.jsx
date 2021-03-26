import React, { Component } from 'react'
import {Link} from "react-router-dom";


// Styles
import "../styles/ArtworkCard.css"

export class ArtworkCard extends Component {
    render() {
        const {artwork} = this.props
        
        return (
            <div className="ArtworkCard">
                <Link key={artwork._id} to={`/artworks/${artwork._id}`}>
                    <img src={artwork.image} alt={`${artwork.title} picture`}/>
                    <div className="details">
                        <h5>{artwork.title}</h5>
                        <h6>{artwork.creator.username}</h6>
                        <div className="Bid-status">
                            <p>Current Price</p>
                            <p className="Price">18.54<span className="Currency">ETH</span></p>
                            <p className="Dollars">14,000$</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default ArtworkCard
