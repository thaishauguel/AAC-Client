import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Results from "./pages/Results";

export default class App extends Component {
  state = {
    inputSearch: "",
    searchedValue: "",
  };
  getInputSearch = (searchInput) => {
    this.setState({ inputSearch: searchInput });
  };
  clearInputSearch = () => {
    this.setState({inputSearch: ""})
  }
  getSearchedValue = () => {
    this.setState({ searchedValue: this.state.inputSearch }, () =>
    this.clearInputSearch());
  };
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <NavMain
          getInputSearch={this.getInputSearch}
          inputSearch={this.state.inputSearch}
          getSearchedValue={this.getSearchedValue}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/results"
            render={() => (
              <Results
                searchedValue={this.state.searchedValue}
              />
            )}
          />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}
