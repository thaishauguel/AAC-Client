import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
     
      })
      .catch((error) => {
        console.log(error);
        this.setState({message: "Oups, Bad Credentials"})
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/profile" />;
    }

    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button className="Btn-black  ">Submit</button>
        {this.state.message && <p className="Alert-message">{this.state.message}</p>}

      </form>
    );
  }
}

export default withRouter(withUser(FormSignin));
