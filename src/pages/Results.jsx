import React, { Component } from "react";
import apiHandler from "../api/apiHandler";

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
    if (prevProps.searchedValue!==this.props.searchedValue){
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
    console.log("props in Result: ",this.props);
    if (!this.state.artworks) return <h3>Loading</h3>;
    if (this.state.artworks.length === 0) return <h3>No results</h3>
    return (
      <div>
        {/* {(this.state.artworks.length===0) && <h3>No results</h3>} */}

        <h1>List of results for: {this.props.searchedValue}</h1>
        {this.state.artworks.map((el) => (
          <p key={el._id}>{el.title}</p>
        ))}

      </div>
    );
  }
}
