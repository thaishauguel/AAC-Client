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
    const {artworksMatch, artistsMatch} = this.state;
    if (!artworksMatch || !artistsMatch) return <Loading text="Art" />;
    return (
      <div className="Results init-margin">
          <h2>Results for: <span className="Searched-keyword">{this.props.searchedValue}</span></h2>

          {(artistsMatch.length === 0 && artworksMatch.length === 0) ? 
          <section>
            <h2 className="No-results">Sorry,<br/> no results found…</h2>
            <Link className="Btn-minimal" to="/">Back to home</Link>
          </section>
          :
          <React.Fragment>
            <section className="Artist-result">
              <h3>Artists</h3>
              {artistsMatch.length === 0 ? <p>No results found</p> : 
                artistsMatch.map(el =>
                <Link  key={el._id} art={el} to={`/artist/${el.creator._id}`} >{el.creator.username}</Link> )
              }
              </section>

              <section>
                <h3>Artworks</h3>
                <section className="Cards-gallery">
                {artworksMatch.length === 0 ? <p>No results found</p> : 
                artworksMatch.map((el) => (
                  <ArtworkCard key={el._id} artwork={el} />
                ))}
                </section>
            </section>
          </React.Fragment>
          }
      </div>
    );
  }
}
