import React from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import SearchBar from "./../components/SearchBar";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;
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
    <nav className="NavMain text-focus-in">
      <Link to="/">
        <h3 className="logo">.aaa</h3>
      </Link>

      <SearchBar           
        getInputSearch={props.getInputSearch}
        inputSearch={props.inputSearch}
        getSearchedValue={props.getSearchedValue}/>
      
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <Link className="Btn-minimal black" to="/profile">
                {/* {context.user && context.user.email} */}
                Profile
              </Link>
            </li>
            <li>
              <button className="Btn-minimal" onClick={handleLogout}>Logout</button>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <Link className="Btn-minimal black" to="/signin">Log in</Link>
            </li>
            <li>
              <Link className="Btn-minimal black" to="/signup">Create account</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
