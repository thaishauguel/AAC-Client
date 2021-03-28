import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// Components
import NavMain from "./components/NavMain";
import ProtectedRoute from "./components/ProtectedRoute";
// Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Artist from "./pages/Artist";
// import MyActivity from "./pages/SubProfilePages/MyActivity";
// import MyCollection from "./pages/SubProfilePages/MyCollection";
// import MyCreactions from "./pages/SubProfilePages/MyCreactions";



// function App() {
//   return (
//     <div className="App">
//       <NavMain />
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/signin" component={Signin} />
//         <Route exact path="/signup" component={Signup} />
//         <ProtectedRoute exact path="/profile" component={Profile} />



//       </Switch>
//     </div>
//   );
// }
import Results from "./pages/Results";
import OneArtwork from "./pages/OneArtwork";

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

    return (
      <div className="App">
        <NavMain
          getInputSearch={this.getInputSearch}
          inputSearch={this.state.inputSearch}
          getSearchedValue={this.getSearchedValue}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results" render={() => (
              <Results searchedValue={this.state.searchedValue}/>
            )}
          />
          <Route exact path="/artworks/:id" component={OneArtwork} />
          <Route exact path="/artist/:id" component={Artist} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}