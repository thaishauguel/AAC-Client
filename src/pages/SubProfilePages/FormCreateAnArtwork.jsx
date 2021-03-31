import React, { Component } from 'react'
import apiHandler from "../../api/apiHandler";
//CSS
import "../../styles/Profile.css"


export default class FormCreateAnArtwork extends Component {
    state = {
        
        title: "",
        description: "",
        image: "",
        
      };


    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
      };

      handleFileChange = (event) => {

        // console.log("The file added by the use is: ", event.target.files[0]);
        this.setState({
          image: event.target.files[0],
        });
      };

      handleSubmit = (event) => {
        event.preventDefault()
        const newArtwork= new FormData()
        newArtwork.append("title", this.state.title)
        newArtwork.append("description", this.state.description)
        newArtwork.append("image", this.state.image)
    
        apiHandler
      .addAnArtwork(newArtwork)
      .then(()=>{
        this.props.closeForm("displayAddForm")
        console.log('artwork created!')})
      .catch(err=>console.log(err))
      };

    render() {
        return (
            <section>
            <h3>Add an artwork</h3>
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

            <button className="Btn-black">Create</button>
            </form>
          </section>
        )
    }
}
