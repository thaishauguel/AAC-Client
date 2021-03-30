import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddAnAuction from "../../components/Forms/AddAnAuction";
import FormCreateAnArtwork from "./FormCreateAnArtwork";
import FormUpdateOneCreation from "./FormUpdateOneCreation";




import apiHandler from "../../api/apiHandler";

//CSS
import "../../styles/Profile.css"

class MyCreations extends Component {
  state = {
    myCreations: null,
    displayAddForm: false,
    displayUpdateForm:false,
    displaySellForm : false,
    artworkToSell : null,
    artworkToUpdate: null,
    message: ""
  };


  componentDidMount() {
    apiHandler
      .getMyCreations()
      .then((data) => {
        this.setState({ myCreations: data });
      })
      .catch((err) => console.log(err));
  }

  closeForm = (nameOfForm) => {
    this.setState({[nameOfForm]: false})
    }

  handleClickSell=(artwork)=>{
    this.setState({displaySellForm : true, artworkToSell:artwork })
}

  handleClickAdd = () => {
    this.setState({ displayAddForm: !this.state.displayAddForm });
  };
 
  handleClickUpdate=(artwork)=>{
    this.setState({displayUpdateForm : true, artworkToUpdate:artwork })

  }
  

  render() {
    if (!this.state.myCreations) {
      return <div>Loading...</div>;
    }
    console.log(this.state);
    return (
      <div className="flex">
        <section>
          {this.state.myCreations.length===0 && <p>You don't have any creation, add some !</p>}
          {this.state.message && <p className="Sucess-message">{this.state.message}</p>}
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
                          <button onClick={()=>this.handleClickUpdate(artwork)}><img className="Btn-icon" src="img/edit-btn.svg" alt="auction-btn" /></button>
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
          <button className="Btn-black" onClick={this.handleClickAdd}>Add an artwork</button>
        </section>

        {this.state.displaySellForm && <AddAnAuction auction={this.state.artworkToSell}/>}

        {this.state.displayAddForm && <FormCreateAnArtwork />}

        {this.state.displayUpdateForm && <FormUpdateOneCreation closeForm={this.closeForm}  artwork={this.state.artworkToUpdate}/>}

      </div>
    );
  }
}

export default MyCreations;
