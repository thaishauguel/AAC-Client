import React from "react";
import api from "../api/apiHandler";
import { Link } from "react-router-dom";
import EthToDollars from "./../controllers/EthToDollars";
// Components
import ArtworkCard from "../components/ArtworkCard";
// Styles
import "../styles/Home.css";

class Home extends React.Component {
  state = {
    artworks: null,
    auctionTop: null,
    dollars: null,
  };
  componentDidMount() {
    api.getSalesOn().then((res) =>
      this.setState({ artworks: res }, () => {
        if (this.state.artworks.length > 0) {
          api
            .getLastAuction(this.state.artworks[0]._id)
            .then((res) =>
              this.setState({ auctionTop: res }, () => {
                if (this.state.auctionTop.bids.length === 0) {
                  EthToDollars(this.state.auctionTop.initialPrice)
                    .then((res) => this.setState({ dollars: res }))
                    .catch((err) => console.log(err));
                } else {
                  EthToDollars(this.state.auctionTop.bids[0].bidValue)
                    .then((res) => this.setState({ dollars: res }))
                    .catch((err) => console.log(err));
                }
              })
            )
            .catch((err) => console.log(err));
        }
      })
    );
  }

  render() {
    const { artworks, auctionTop, dollars } = this.state;

    if (!artworks || !auctionTop) {
      return <div>Loading</div>;
    }
    let [topArtwork, ...rest] = artworks;
    return (
      <div className="Home">
        {artworks.length > 0 && (
          <section className="Top-artwork White-bg">
            <div className="Top-artwork-infos">
              <h1>{topArtwork.title}</h1>
              <h4>@{topArtwork.creator.username}</h4>

              <div className="Bid-home">
                <h4>Current Bid</h4>
                <p className="Price">
                  {auctionTop.bids.length === 0
                    ? auctionTop.initialPrice
                    : auctionTop.bids[0].bidValue}
                  <span className="Currency">ETH</span>
                </p>
                <p className="Dollars">${dollars}</p>
              </div>
              <Link to={`/artworks/${topArtwork._id}`}>
                <button className="Btn-black">See the auction</button>
              </Link>
            </div>
            <img className="Top-img-size" src={topArtwork.image} alt="hey" />
          </section>
        )}

        <section className="Cards-gallery">
          <h3>Discover current auctions.</h3>
          {artworks &&
            rest.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
        </section>
      </div>
    );
  }
}

export default Home;
