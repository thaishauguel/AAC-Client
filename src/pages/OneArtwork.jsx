import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api/apiHandler";

import ArtworkCard from "../components/ArtworkCard";
import IsActive from "../components/BidStatus/IsActive";
import NeverSold from "../components/BidStatus/NeverSold";
import IsSold from "../components/BidStatus/IsSold";
import "../styles/OneArtwork.css";

export class OneArtwork extends Component {
  state = {
    artwork: null,
    otherArtworks: null,
    auction: null,
  };
  componentDidMount() {
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

    api
      .getLastAuction(artworkId)
      .then((res) => {
        if (res.active) {
          this.setState({ auction: res, isActive: true });
        } else if (!res.active && res.bids) {
          this.setState({ auction: res });
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.artwork !== null) {
      if (prevState.artwork._id !== this.props.match.params.id) {
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

        api
          .getLastAuction(artworkId)
          .then((res) => {
            if (res.active) {
              this.setState({ auction: res, isActive: true });
            } else if (!res.active && res.bids) {
              this.setState({ auction: res });
            } else {
              this.setState({ isActive: false, auction: null });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  handleChange = (artwork) => {};

  render() {
    const { artwork, otherArtworks, auction, isActive } = this.state;
    if (!artwork || !otherArtworks) {
      return <div>isLoading</div>;
    }
    return (
      <div className="OneArtwork">
        {artwork && (
          <section className="Top-artwork">
            <div>
              <img src={artwork.image} alt="hey" />
              {console.log(auction)}
              {auction && !isActive && <IsSold bids={auction.bids} />}
              {auction && isActive && <IsActive auction={auction} />}
              {!auction && !isActive && <NeverSold />}
            </div>
            <div>
              <h1>{artwork.title}</h1>
              <Link to={`/artist/${artwork.creator._id}`}>
                <h4>{artwork.creator.username}</h4>
              </Link>
              <p>{artwork.description}</p>
            </div>
          </section>
        )}

        <section className="More-artworks">
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
