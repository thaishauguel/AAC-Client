import React from 'react'
import {Link} from "react-router-dom";

const ArtistCard = (props) => {
    const artist = props.art.creator
    return (
        <div className="ArtworkCard">
        <Link key={artist._id} to={`/artist/${artist._id}`}>
            <img src={artist.avatar} alt={`${artist.username}`}/>
            <div className="details">
                <h5>{artist.username}</h5>
                <h6>{artist.description.substring(0,50)}...</h6>
            </div>
        </Link>
    </div>
    )
}

export default ArtistCard
