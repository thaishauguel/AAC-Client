import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api/apiHandler";

import ArtworkCard from "../components/ArtworkCard";
import Loading from "../components/Loading";
import IsActive from "../components/BidStatus/IsActive";
import NeverSold from "../components/BidStatus/NeverSold";
import IsSold from "../components/BidStatus/IsSold";

import "../styles/OneArtwork.css";


export class OneArtwork extends Component {
  state = {
    artwork: null,
    otherArtworks: null,
    auction: null,
    isActive: false
  };
 
  intervalID; 
     /* 
        declare a member variable to hold the interval ID
        that we can reference later.
      */

  getArtwork() { 
    const artworkId = this.props.match.params.id;
    let creatorId;
    api
      .getOneArtwork(artworkId)
      .then((res) => {
        creatorId = res.creator._id;
        this.setState({ artwork: res });
        api.getOneCreator(creatorId).then((res) => {
          const selectArtworks = res.slice(0, 4);
          this.setState({ otherArtworks: selectArtworks });
        });
      })
      .catch((err) => console.log(err));
  }
  getAuction() { 
    const artworkId = this.props.match.params.id;
    api
      .getLastAuction(artworkId)
      .then((res) => {
        if (res.active) {
          this.setState({ auction: res, isActive: true });
        } else if (!res.active && res.bids) {
          this.setState({ auction: res, isActive: false });
        } else {
          this.setState({auction: null, isActive: false})
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    console.log("mount")
    this.getArtwork();
    this.getAuction();
    window.scrollTo(0, 0);
    this.intervalID = setInterval(()=>this.getAuction(), 10000);
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.artwork !== null) {
      if (prevState.artwork._id !== this.props.match.params.id) {
        this.getArtwork();
        this.getAuction();
        window.scrollTo(0,0); 

      }
    }
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearInterval(this.intervalID);
  }

  render() {
    const { artwork, otherArtworks, auction, isActive } = this.state;
    if (!artwork || !otherArtworks) {
      return <Loading text="Art" />;
    }

    return (
      <div className="OneArtwork">
        {artwork && (
          <section className="Top-artwork Grid60-40 ">
            <div className="slide-in-bid">
              <img
                className="Top-details-img-size"
                src={artwork.image}
                alt="hey"
              />
              {auction && !isActive && <IsSold bids={auction.bids}/>}
              {auction && isActive && <IsActive auction={auction} />}
              {!auction && !isActive && <NeverSold />}
            </div>
            <div className="Top-details slide-in-bid delay">
              <h1>{artwork.title}</h1>
              <Link to={`/artist/${artwork.creator._id}`}>
                <h4>@{artwork.creator.username}</h4>
              </Link>
              <p>{artwork.description}</p>
            </div>
          </section>
        )}

        <section className="More-artworks init-margin ">
          <h4 className="">From the same artist</h4>
          <section className="Cards-gallery">
            {otherArtworks &&
              otherArtworks.map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
          </section>
        </section>
      </div>
    );
  }
}

export default OneArtwork;
