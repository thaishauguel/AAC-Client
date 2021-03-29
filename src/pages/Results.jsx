import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import ArtworkCard from "../components/ArtworkCard";

//styles
import "./../styles/Results.css"

export default class Results extends Component {
  state = {
    artworks: null,
  };
  componentDidMount() {
    apiHandler
      .getResults(this.props.searchedValue)
      .then((data) => {
        this.setState({ artworks: data });
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
          this.setState({ artworks: data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    if (!this.state.artworks) return <h3>Loading</h3>;
    return (
      <div>
        <section className="results">
          {this.state.artworks.length === 0 && (
            <h2>No results for "{this.props.searchedValue}"</h2>
          )}
          {this.state.artworks.length === 0 || (
            <h2>Results for: <span className="searched-keyword">{this.props.searchedValue}</span></h2>
          )}
          </section>
          <section style={{margin: "70px"}}>
            {/* A REMPLACER */}
            <p> Romain | Romain33 | Romain75 | RomainBlabla</p>
          </section>
            <section className="Cards-gallery">
            {this.state.artworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
            </section>
      </div>
    );
  }
}
