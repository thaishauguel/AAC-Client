import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import NavMain from "./components/NavMain";
import ProtectedRoute from "./components/ProtectedRoute";
// Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import OneArtwork from "./pages/OneArtwork";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/artworks/:id" component={OneArtwork} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
