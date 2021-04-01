import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
  handleEnter = (evt) => {
    if (evt.key === "Enter" && this.props.inputSearch) {
      this.props.getSearchedValue();
      this.props.history.push("/results");
    }
  };
  render() {
    console.log(this.props)
    return (
      <div className="SearchBar">
        <input 
          onChange={(evt) => this.props.getInputSearch(evt.target.value)}
          onKeyDown={this.handleEnter}
          type="text"
          value={this.props.inputSearch}
          placeholder="Search artworks or artists"
          required
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
