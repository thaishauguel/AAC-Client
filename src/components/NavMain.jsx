import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import SearchBar from "./../components/SearchBar";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;
console.log("navBar props: ", props)
  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <h3 className="logo">.aac</h3>
      </NavLink>

      <SearchBar           
        getInputSearch={props.getInputSearch}
        inputSearch={props.inputSearch}
        getSearchedValue={props.getSearchedValue}/>
      
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/profile">
                {context.user && context.user.email}
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
