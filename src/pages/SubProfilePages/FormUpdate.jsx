import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";


class FormUpdate extends Component {
  state = {
    email: "",
    username:"",
    avatar: "",
    instagram:"",
    website:"",
    description:"",
    credit:0
  };

  componentDidMount() {
    apiHandler
      .getMyProfile()
      .then((data) => this.setState({
        email: data.email,
        username: data.username,
        avatar: data.avatar,
        description: data.description,
        credit: data.credit,
        instagram: data.networks.instagram,
        website: data.networks.website

      }))
      .catch((err) => console.log(err));
  }

 

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value }, () => console.log(this.state));
  };

  handleFileChange = (event) => {
    console.log("The file added by the use is: ", event.target.files[0]);
    this.setState({
      avatar: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    const uploadData = new FormData();
    event.preventDefault()
    uploadData.append("email", this.state.email);
    uploadData.append("username", this.state.username);
    uploadData.append("avatar", this.state.avatar);
    uploadData.append("instagram", this.state.instagram);
    uploadData.append("website", this.state.website);
    uploadData.append("description", this.state.description);
    uploadData.append("credit", this.state.credit);
    
    console.log("uploadData => " + uploadData)
    for (const pair of uploadData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }

      apiHandler
        .UpdateMyProfile(uploadData)
        .then(data => console.log(data))
        .catch(error => console.log(error))
  };


  render() {
    return (
      <div>
        <h3>Parameters</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            id="email"
            name="email"
          />
          <label htmlFor="username">Username</label>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
            id="username"
            name="username"
          />
        
        
          <label htmlFor="description">Description</label>
          <textarea 
            onChange={this.handleChange}
            value={this.state.description}
            type="text"
            id="description"
            name="description" 
            cols="30" 
            rows="7"
          >
            description
          </textarea>
          
          <label htmlFor="networks">Networks</label>
          <input
            onChange={this.handleChange}
            value={this.state.instagram}
            type="text"
            id="networks"
            name="instagram"
            placeholder="instagram"
          />
          <input
            onChange={this.handleChange}
            value={this.state.website}
            type="text"
            id="networks"
            name="website"
            placeholder="website"
          /> 
          <label htmlFor="avatar">Avatar</label>
          <img className="Miniature" src={this.state.avatar} alt=""/>
          <input
            onChange={this.handleFileChange}
            type="file"
            id="avatar"
            name="avatar"
          />

          <label htmlFor="credit">Credit</label>
          <input
            onChange={this.handleChange}
            value={this.state.credit}
            type="number"
            id="credit"
            name="credit"
          />

          <button className="Btn-black" >Update</button>
        </form>
      </div>
    );
  }
}

export default withRouter(withUser(FormUpdate));
