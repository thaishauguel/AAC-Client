import React, {Component} from "react";
import MyActivity from "./SubProfilePages/MyActivity";
import MyCollection from "./SubProfilePages/MyCollection";
import MyCreations from "./SubProfilePages/MyCreations";




class Profile extends Component {

  state={
    displayCrea : false,
    displayColl:false,
    displayAct:true
  }  

  handleClick =(event)=>{
    if (this.state[event.target.id]===false){
    // console.log(event.target.id)  
    this.setState ({displayCrea : false,
    displayColl:false,
    displayAct:false})
  this.setState ({[event.target.id] : !this.state[event.target.id]})}

  }
  render(){
    // console.log(this.state)
    return (
      <div>
        <h1>Profile</h1>
        <div style={{display:"flex"}}>
        <h3 id="displayCrea" style={{padding:10}} onClick={this.handleClick}>My Creations</h3>
        <h3 id="displayColl" style={{padding:10}} onClick={this.handleClick}>My Collection</h3>
        <h3 id="displayAct" style={{padding:5}} onClick={this.handleClick}>My Activity</h3>
        </div>
        {this.state.displayCrea && <MyCreations />}
        {this.state.displayColl && <MyCollection />}
        {this.state.displayAct && <MyActivity />}

      </div>
    );
  }
  
};

export default Profile;
