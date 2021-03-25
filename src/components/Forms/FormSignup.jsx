import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  state = {
    email: "toto@gmail.com",
    password: "toto",
    username:"toto",
    avatar:null,
    instagram:"",
    website:"",
    description:"",
    credit:0
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleFileChange = (event) => {

    console.log("The file added by the use is: ", event.target.files[0]);
    this.setState({
      avatar: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    const uploadData = new FormData();
    uploadData.append("email", this.state.email);
    uploadData.append("password", this.state.password);
    uploadData.append("username", this.state.username);
    uploadData.append("avatar", this.state.avatar);
    uploadData.append("instagram", this.state.instagram);
    uploadData.append("website", this.state.website);
    uploadData.append("description", this.state.description);
    uploadData.append("credit", this.state.credit);


    apiHandler
      .signup(uploadData)
      .then((data) => {
        console.log('coucou')
        this.props.context.setUser(data);
        this.props.history.push("/profile"); 

      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <label htmlFor="username">Username</label>
        <input
          onChange={this.handleChange}
          value={this.state.username}
          type="text"
          id="username"
          name="username"
        />
        <label htmlFor="avatar">Avatar</label>
        <input
          onChange={this.handleFileChange}
          type="file"
          id="avatar"
          name="avatar"
        />
        <label htmlFor="instagram">Instagram</label>
        <input
          onChange={this.handleChange}
          value={this.state.instagram}
          type="text"
          id="instagram"
          name="instagram"
        />
        <label htmlFor="website">Website</label>
        <input
          onChange={this.handleChange}
          value={this.state.website}
          type="text"
          id="website"
          name="website"
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={this.handleChange}
          value={this.state.description}
          type="text"
          id="description"
          name="description"
        />
        <label htmlFor="credit">Credit</label>
        <input
          onChange={this.handleChange}
          value={this.state.credit}
          type="number"
          id="credit"
          name="credit"
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
