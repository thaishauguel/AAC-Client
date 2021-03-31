import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  state = {
    email: "toto@gmail.com",
    password: "toto",
    username:"toto",
    avatar: "https://cdn.boldomatic.com/content/post/fl4sZw/LOVE-ME-I-M-AN-ARTIST?size=800",
    instagram:"",
    website:"",
    description:"",
    credit:0,
    DetailsOpen: false,
    message: ""
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

  handleToggle = () => {
    this.setState({DetailsOpen: !this.state.DetailsOpen})
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
        console.log('this.props.context', this.props.context)
        this.props.context.setUser(data)
       // this.props.history.push("/profile" )
        
      })
      
      .catch((error) => {
        this.setState({message: "Oups, email or username already exist"})
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/profile" />;
    }
    console.log("message is", this.state.message)

    return (
      <form  onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          required
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <label htmlFor="username">Username</label>
        <input
          required
          onChange={this.handleChange}
          value={this.state.username}
          type="text"
          id="username"
          name="username"
        />
        
        <label htmlFor="credit">Credits</label>
        <input
          required
          onChange={this.handleChange}
          value={this.state.credit}
          type="number"
          id="credit"
          name="credit"
          min="0"
        />

        

        <button className="Btn-minimal" onClick={this.handleToggle}>{this.state.DetailsOpen ? "Close" : "Add more infos"}</button>

        { this.state.DetailsOpen && 
          <React.Fragment>
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
            <textarea
              onChange={this.handleChange}
              value={this.state.description}
              type="text"
              id="description"
              name="description"
              maxLength="300"
              cols="30" 
              rows="7"
            >
            Description
            </textarea>
          </React.Fragment>
        }  
        <button className="Btn-black">Submit</button>
        {this.state.message && <p className="Alert-message">{this.state.message}</p>}
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
