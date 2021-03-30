import React from "react";
import api from "../api/apiHandler"
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

    return (
      <div className="Home">
        {artworks.length>0 &&
        <section className="Top-artwork White-bg">
            <div>
              <h1>{artworks[0].title}</h1>
              <h4>{artworks[0].creator.username}</h4>
              {/* 
              Bid Component to add 
            */}
            </div>
            <img src={artworks[0].image} alt="hey" />
        </section>
        }
        
        <section className="Cards-gallery">
          <h3>
            Discover current auctions.
          </h3>
          {artworks && artworks.map(artwork =>
              <ArtworkCard  key={artwork._id}  artwork={artwork} />
          )}
        </section>
      </div>
    );
  }
}

export default Home;
