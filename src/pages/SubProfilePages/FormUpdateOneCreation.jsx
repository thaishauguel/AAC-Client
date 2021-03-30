import React, { Component } from 'react'
import apiHandler from "../../api/apiHandler";
//CSS
import "../../styles/Profile.css"


export default class FormUpdateOneCreation extends Component {
    state = {
        artwork: this.props.artwork,
        title: this.props.artwork.title,
        description: this.props.artwork.description,
        image: this.props.artwork.image,
      };


    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
      };

      handleFileChange = (event) => {
        this.setState({
          image: event.target.files[0],
        });
      };

      handleSubmit = (event) => {
          event.preventDefault()
        const updatedArtwork= new FormData()
        updatedArtwork.append("title", this.state.title)
        updatedArtwork.append("description", this.state.description)
        updatedArtwork.append("image", this.state.image)
    
        apiHandler
      .updateAnArtwork(this.state.artwork._id, updatedArtwork)
      .then(()=>{console.log('artwork updated!')
        this.props.closeForm("displayUpdateForm")})
      .catch(err=>console.log(err))
      };

      handleDelete=()=>{
          apiHandler
          .deleteAnArtwork(this.state.artwork._id)
          .then(()=>{console.log('artwork deleted!')
          this.props.closeForm("displayUpdateForm")})
          .catch(err=>console.log(err))
      }

    render() {
        console.log(this.state.artwork)
        return (
            <section>
            <h3>Update an artwork</h3>
            <form onSubmit={this.handleSubmit}>
              <input
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                type="text"
                placeholder="Title"
              />
            <textarea 
              onChange={this.handleChange}
              value={this.state.description}
              type="text"
              id="description"
              name="description" 
              placeholder="Description"
              cols="30" 
              rows="7"
            >
              
            </textarea>
              <input
                id="image"
                name="image"
                onChange={this.handleFileChange}
                type="file"
                placeholder="Upload the image"
              />

            <button className="Btn-black">Update</button>
            </form>
            <button onClick={this.handleDelete}>Delete</button>
          </section>
        )
    }
}
