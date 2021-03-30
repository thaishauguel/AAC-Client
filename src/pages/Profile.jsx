import React, {Component} from "react";
import {NavLink} from 'react-router-dom'
import MyActivity from "./SubProfilePages/MyActivity";
import MyCollection from "./SubProfilePages/MyCollection";
import MyCreations from "./SubProfilePages/MyCreations";
import FormUpdateProfile from "./SubProfilePages/FormUpdateProfile";

//CSS
import "../styles/Profile.css"

class Profile extends Component {

  state={
    displayCrea : false,
    displayColl:false,
    displayAct:true,
    displayUpdate:false
  }  

  handleClick =(event)=>{
    if (this.state[event.target.id]===false){
    // console.log(event.target.id)  
    this.setState ({
      displayCrea : false,
      displayColl:false,
      displayAct:false,
      displayUpdate:false
    })
  this.setState ({[event.target.id] : !this.state[event.target.id]})}

  }
  render(){
    const {displayCrea, displayColl, displayAct, displayUpdate} = this.state
    const isActive = { fontWeight: "500" }
    return (
      <div className="Profile">
        <div className="Profile-title">
          <h1>Profile</h1>
          <img
            id="displayUpdate"
            onClick={this.handleClick}
            src="img/edit-btn.svg"
            alt=""
          />
        </div>

        <nav className="Profile-nav">
          <ul>
            <li
              id="displayCrea"
              style={displayCrea ? isActive : null}
              onClick={this.handleClick}
            >
              My Creations
            </li>
            <span>|</span>
            <li
              id="displayColl"
              style={displayColl ? isActive : null}
              onClick={this.handleClick}
            >
              My Collection
            </li>
            <span>|</span>
            <li
              id="displayAct"
              style={displayAct ? isActive : null}
              onClick={this.handleClick}
            >
              My Activity
            </li>
          </ul>
        </nav>
        { displayCrea && <MyCreations /> }
        { displayColl && <MyCollection /> }
        { displayAct && <MyActivity /> }
        { displayUpdate && <FormUpdateProfile /> }
      </div>
    );
  }
  
};

export default Profile;
