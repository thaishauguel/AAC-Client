import React from "react";
import api from "../api/apiHandler"
import {Link} from "react-router-dom"
// Components
import ArtworkCard from "../components/ArtworkCard";
// Styles
import "../styles/Home.css"


class Home extends React.Component {
  state = {
    artworks: null,
  }
  componentDidMount() {
    api.getSalesOn()
      .then(res => this.setState({artworks: res}))
  }
  render() {
       const {artworks} = this.state;
      

    if (!artworks){return <div>Loading</div>}
    let [topArtwork, ...rest]=artworks
    return (
      <div className="Home">
        {artworks.length>0 &&
        <section className="Top-artwork White-bg">
            <div className="Top-artwork-infos">
              <h1>{topArtwork.title}</h1>
              <h4>@{topArtwork.creator.username}</h4>
              
              <div className="Bid-home">
                <h4>Current Bid</h4>
                <p className="Price">
                  120
                  <span className="Currency">ETH</span>
                </p>
                <p className="Dollars">$700</p>
              </div>
                <Link to={`/artworks/${topArtwork._id}`}>
                  <button className="Btn-black">See the auction</button>
                </Link>


            </div>
            <img  className="Top-img-size"src={topArtwork.image} alt="hey" />
        </section>
        }
        
        <section className="Cards-gallery">
          <h3>
            Discover current auctions.
          </h3>
          {artworks && rest.map(artwork =>
              <ArtworkCard  key={artwork._id}  artwork={artwork} />
          )}
        </section>
      </div>
    );
  }
}

export default Home;
