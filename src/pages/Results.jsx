import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import ArtistCard from "./../components/ArtistCard";
import ArtworkCard from "../components/ArtworkCard";

//styles
import "./../styles/Results.css"

export default class Results extends Component {
  state = {
    artworksMatch: null,
    artistsMatch: null
  };
  componentDidMount() {
    apiHandler
      .getResults(this.props.searchedValue)
      .then((data) => {
        this.setState({ artworksMatch: data.matchArtwork});
        this.setState({ artistsMatch: data.matchArtist});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchedValue !== this.props.searchedValue) {
      apiHandler
        .getResults(this.props.searchedValue)
        .then((data) => {
          this.setState({ artworksMatch: data.matchArtwork});
          this.setState({ artistsMatch: data.matchArtist});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    if (!this.state.artworksMatch || !this.state.artistsMatch) return <h3>Loading</h3>;
    return (
      <div>
          <section className="results">
          <h2>Results for: <span className="searched-keyword">{this.props.searchedValue}</span></h2>
          </section>
            {/* Artist section */}
            <h3 style={{margin: "20px 70px"}}>Artists</h3>
          <section className="Cards-gallery">
          {this.state.artistsMatch.length === 0 ? <p>No results</p> : 
            this.state.artistsMatch.map(el => 
              <ArtistCard key={el._id} art={el} />)}
          </section>
            {/* Artwork section */}
              <h3 style={{margin: "20px 70px"}}>Artworks</h3>
            <section className="Cards-gallery">
            {this.state.artworksMatch.length === 0 ? <p>No results</p> : 
            this.state.artworksMatch.map((el) => (
              <ArtworkCard key={el._id} artwork={el} />
            ))}
            </section>
      </div>
    );
  }
}
