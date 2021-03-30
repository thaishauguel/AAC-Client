import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddAnAuction from "../../components/Forms/AddAnAuction";


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
    displaySellForm : false,
    artworkToSell : null
  };




  componentDidMount() {
    apiHandler
      .getMyCreations()
      .then((data) => {
        this.setState({ myCreations: data });
      })
      .catch((err) => console.log(err));
  }

  handleClickSell=(artwork)=>{
    this.setState({displaySellForm : true, artworkToSell:artwork })
}

  handleClickAdd = () => {
    this.setState({ displayAddForm: !this.state.displayAddForm });
  };

  handleFileChange = (event) => {

    // console.log("The file added by the use is: ", event.target.files[0]);
    this.setState({
      image: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    // event.preventDefault() // parti pris de faire un refresh ici
    // console.log(this.state.title, this.state.description)
    const newArtwork= new FormData()
    newArtwork.append("title", this.state.title)
    newArtwork.append("description", this.state.description)
    newArtwork.append("image", this.state.image)

    apiHandler
  .addAnArtwork(newArtwork)
  .then(()=>console.log('artwork created!'))
  .catch(err=>console.log(err))
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
          {this.state.myCreations.length===0 && <p>You don't have any creation, add some !</p>}
          <table className="Profile-table">
            <tbody>
                {this.state.myCreations.map((artwork) => {
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
                            artwork.forSale===false? <button onClick={()=>this.handleClickSell(artwork)}><img className="Btn-icon" src="img/auction-btn.svg" alt="auction-btn" /></button> : <Link to={`artworks/${artwork._id}`}><h4>Auction in progress</h4></Link>
                          ) : (
                            <p>Already sold</p>
                          )}
                        </td>
                      </tr>
                  );
                })}
            </tbody>
          </table>
          <button className="Btn-black" onClick={this.handleClickAdd}>{this.state.displayAddForm ? "Close" : "Add an artwork"}</button>
        </section>

        {this.state.displaySellForm && <AddAnAuction  auction={this.state.artworkToSell}/>}


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
                onChange={this.handleFileChange}
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
