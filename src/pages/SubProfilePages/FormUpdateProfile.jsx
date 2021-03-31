import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";


class FormUpdate extends Component {
  state = {
    email: "",
    username: "",
    avatar: "",
    instagram: "",
    website: "",
    description: "",
    credit: 0,
    isFormPwdDisplayed: false,
    formerPassword: "",
    newPassword: "",
    message: "",
  
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

    //  componentDidUpdate(prevProps,prevState){
    //     console.log(prevProps.context.user.credit, this.props.context.user.credit)
    //     if (prevProps.context.user.credit!==this.props.context.user.credit){
    //       console.log(this.props.context.user.credit)
    //     }
    //   }


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
    event.preventDefault()
    const uploadData = new FormData();
    uploadData.append("email", this.state.email);
    uploadData.append("username", this.state.username);
    uploadData.append("avatar", this.state.avatar);
    uploadData.append("instagram", this.state.instagram);
    uploadData.append("website", this.state.website);
    uploadData.append("description", this.state.description);
    uploadData.append("credit", this.state.credit);

  

    apiHandler
      .UpdateMyProfile(uploadData)
      .then(data => {
        console.log(data)
        this.props.getTheUpdatedUser(data)
        this.setState({message: "Successfully Updated" });
      })
      .catch(error => console.log(error))
  };

  displayFormPwd = () => {
    this.setState({ isFormPwdDisplayed: !this.state.isFormPwdDisplayed })
  }

  handleChangePwd = (event) => {
    event.preventDefault()
    let passwords = {
      formerPassword: this.state.formerPassword,
      newPassword: this.state.newPassword
    }

    apiHandler
      .changePassword(passwords)
      .then(() => {
        console.log('successfully changed')
        this.setState({ isFormPwdDisplayed: !this.state.isFormPwdDisplayed, newPassword: "", formerPassword: "", message: "password successfully changed" })
      })
      .catch(err => console.log(err))

  }

  // handleDelete = () => {
  //   apiHandler.delete()
  //     .then(data => {
  //       window.location.reload()
  //     }
  //     )
  //     .catch(err => console.log(err))
  // }

  render() {
    console.log("credit", this.props.context.user.credit)
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* <h3>Parameters</h3> */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            id="email"
            name="email"
            required
          />
          <label htmlFor="username">Username</label>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
            id="username"
            name="username"
            required
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
          <img className="Miniature" src={this.state.avatar} alt="" />
          <input
            onChange={this.handleFileChange}
            type="file"
            id="avatar"
            name="avatar"
          />

          <label htmlFor="credit">Credits</label>
          <input
            onChange={this.handleChange}
            value={this.state.credit}
            type="number"
            id="credit"
            name="credit"
            min="0"

          />

          <button className="Btn-black" >Update</button>
          {this.state.message && <p className="Success-message">{this.state.message}</p>}

        </form>

        {/* <button onClick={this.handleDelete} className="Btn-minimal" >delete your account</button> */}

        <div>
          {!this.state.isFormPwdDisplayed && <button onClick={this.displayFormPwd} className="Btn-black">Change your password</button>}
          {this.state.isFormPwdDisplayed && <form onSubmit={this.handleChangePwd}>
            <label htmlFor="formerPassword">Former password</label>
            <input name="formerPassword" onChange={this.handleChange} id="formerPassword" type="password" placeholder="former password"
              value={this.state.formerPassword} />

            <label htmlFor="newPassword">New password</label>
            <input name="newPassword" onChange={this.handleChange} id="newPassword" type="password" placeholder="new password"
              value={this.state.newPassword} />

            <button className="Btn-black">Update password</button>

          </form>}
          {this.state.message && <p className="Success-message">{this.state.message}</p>}
        </div>


      </div>
    );
  }
}

export default withRouter(withUser(FormUpdate));
