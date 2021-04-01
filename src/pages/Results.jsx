import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
//import ArtistCard from "./../components/ArtistCard";
import ArtworkCard from "../components/ArtworkCard";
import Loading from "../components/Loading";


//styles
import "./../styles/Results.css"

export default class Results extends Component {
  state = {
    artworksMatch: null,
    artistsMatch: null
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.searchedValue) {
      this.setState({ artworksMatch: []});
      this.setState({ artistsMatch: []});
    } else {
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
    if (!this.state.artworksMatch || !this.state.artistsMatch) return <Loading text="Art" />;
    return (
      <div>
          <section className="results">
          <h2>Results for: <span className="searched-keyword">{this.props.searchedValue}</span></h2>
          </section>
            {/* Artist section */}
            <h3 style={{margin: "20px 70px"}}>Artists</h3>
          <section className="">
          {this.state.artistsMatch.length === 0 ? <p>No results</p> : 
            this.state.artistsMatch.map(el =>
            <Link className="Artist-search" key={el._id} art={el} to={`/artist/${el.creator._id}`} >{el.creator.username}</Link> )
          }
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
