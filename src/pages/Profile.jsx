import React, {Component} from "react";
import {withUser} from '../components/Auth/withUser'
import Credits from "./../components/Credits";
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
    displayUpdate:false,
    user : null
  }  

  handleClick =(event)=>{
    if (this.state[event.target.id]===false){
    this.setState ({
      displayCrea : false,
      displayColl:false,
      displayAct:false,
      displayUpdate:false
    })
  this.setState ({[event.target.id] : !this.state[event.target.id]})}
  }
  
  getTheUpdatedUser=(userInCallback)=>{
    this.setState({user: userInCallback})
  }
  
  componentDidMount(){
    window.scrollTo(0, 0);
    this.setState({user: this.props.context.user})
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.user){
      if (prevState.user.credit!==this.state.user.credit ||prevState.user.avatar!==this.state.user.avatar ){
      this.setState({user:this.state.user})
        console.log('kiki')}
    }
  }

  render(){
    // console.log("profile state: ",this.state)
    // const {user} = this.props.context
    const {displayCrea, displayColl, displayAct, displayUpdate, user} = this.state
    if (!user){return <div>Loading</div>}

    const isActive = { fontWeight: "500" }
    return (
      <div className="Profile">
        <header className="flex">
          <div className="Profile-title flex">
            <img className="Avatar" src={user.avatar} alt="user avatar" />
            <h1>Profile</h1>
            <img
              id="displayUpdate"
              onClick={this.handleClick}
              src="img/edit-btn.svg"
              alt="edit-icon"
            />
          </div>
          <Credits user={user} />          
        </header>
        
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
        { displayAct && <MyActivity getTheUpdatedUser={this.getTheUpdatedUser}/> }
        { displayUpdate && <FormUpdateProfile getTheUpdatedUser={this.getTheUpdatedUser}/> }
      </div>
    );
  }
  
};

export default withUser(Profile);
