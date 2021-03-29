import React, { Component } from "react";
import { Link } from "react-router-dom";

import apiHandler from "../../api/apiHandler";

//CSS
import "../../styles/Profile.css"

class MyCreations extends Component {
  state = {
    myCreations: null,
    displayAddForm: false,
    title: "",
    description: "",
    image: "",
  };

  componentDidMount() {
    apiHandler
      .getMyCreations()
      .then((data) => {
        this.setState({ myCreations: data });
      })
      .catch((err) => console.log(err));
  }

  handleClickAdd = () => {
    this.setState({ displayAddForm: !this.state.displayAddForm });
  };

  handleSubmit = () => {
    console.log("submitted!");
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    if (!this.state.myCreations) {
      return <div>Loading...</div>;
    }
    console.log(this.state);
    return (
      <div className="flex">
        <section>

          <table className="Profile-table">
            <tbody>
                {this.state.myCreations.map((artwork) => {
                  console.log(artwork)
                  return (
                    <tr key={artwork._id} >
                        
                          <td>
                          <Link to={`artworks/${artwork._id}`}>
                              <img
                                className="Miniature"
                                src={artwork.image}
                                alt={artwork.title}
                              />
                          </Link>
                          </td>
                          <td>
                            <Link to={`artworks/${artwork._id}`}>
                              <p>{artwork.title}</p>
                            </Link>
                          </td>
                        <td>
                          {/* TODO */}
                          <button><img className="Btn-icon" src="img/edit-btn.svg" alt="auction-btn" /></button>
                        </td>
                        
                        <td>
                          {artwork.creator === artwork.owner._id ? (
                            <button><img className="Btn-icon" src="img/auction-btn.svg" alt="auction-btn" /></button>
                          ) : (
                            <h4>Already sold</h4>
                          )}
                        </td>
                      </tr>
                  );
                })}
            </tbody>
          </table>
          <button className="Btn-black" onClick={this.handleClickAdd}>{this.state.displayAddForm ? "Close" : "Add an artwork"}</button>
        </section>

        
        {this.state.displayAddForm && (
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
                value={this.state.image}
                onChange={this.handleChange}
                type="file"
                placeholder="Upload the image"
              />

            <button className="Btn-black">Create</button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

export default MyCreations;
