import React, { Component } from "react";
import { Link} from "react-router-dom";
import AddAnAuction from "../../components/Forms/AddAnAuction";
import FormCreateAnArtwork from "./FormCreateAnArtwork";
import FormUpdateOneCreation from "./FormUpdateOneCreation";

import apiHandler from "../../api/apiHandler";
import {withUser} from "./../../components/Auth/withUser";

//CSS
import "../../styles/Profile.css";

class MyCreations extends Component {
  state = {
    myCreations: null,
    displayAddForm: false,
    displayUpdateForm: false,
    displaySellForm: false,
    artworkToSell: null,
    artworkToUpdate: null,
    message: "",
  };

  componentDidMount() {
    apiHandler
      .getMyCreations()
      .then((data) => {
        this.setState({ myCreations: data });
      })
      .catch((err) => console.log(err));
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.displayAddForm !== this.state.displayAddForm ||
      prevState.displaySellForm !== this.state.displaySellForm ||
      prevState.displayUpdateForm !== this.state.displayUpdateForm
    ) {
      apiHandler
        .getMyCreations()
        .then((data) => {
          this.setState({ myCreations: data });
        })
        .catch((err) => console.log(err));
    }
  }

  handleClickSell = (artwork) => {
    this.setState({ displaySellForm: true, displayUpdateForm: false, displayAddForm: false, artworkToSell: artwork });
  };

  handleClickAdd = () => {
    this.setState({ displayAddForm: true, displayUpdateForm: false, displaySellForm: false, });
  };

  handleClickUpdate = (artwork) => {
    this.setState({ displayUpdateForm: true, displayAddForm: false, displaySellForm: false, artworkToUpdate: artwork });
  };


  closeForm = (nameOfForm) => {
    this.setState({ [nameOfForm]: false });
  };

  render() {
    if (!this.state.myCreations) {
      return <div>Loading...</div>;
    }
    // console.log(this.state);
    return (
      <div className="flex">
        <section>
          {this.state.myCreations.length === 0 && (
            <p>You don't have any creation, add some !</p>
          )}
          {this.state.message && (
            <p className="Sucess-message">{this.state.message}</p>
          )}
          <table className="Profile-table">
            <tbody>
              {this.state.myCreations.map((artwork) => {
                return (
                  <tr key={artwork._id}>
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
                        {artwork.title}
                      </Link>
                    </td>
                    <td>
                      {artwork.owner=== this.props.context.user._id &&<button onClick={() => this.handleClickUpdate(artwork)}>
                        <img
                          className="Btn-icon edit"
                          src="img/edit-btn.svg"
                          alt="auction-btn"
                        />
                      </button>}
                    </td>
                    <td>
                      {artwork.creator=== artwork.owner? (
                        artwork.forSale === false ? (
                          <button onClick={() => this.handleClickSell(artwork)}>
                            <img
                              className="Btn-icon"
                              src="img/auction-btn.svg"
                              alt="auction-btn"
                            />
                          </button>
                        ) : (
                            <p> In auction</p>
                        )
                      ) : (
                        <p>Sold</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="Btn-black" onClick={this.handleClickAdd}>
            Add an artwork
          </button>
        </section>

        {this.state.displaySellForm && (
          <AddAnAuction
            artwork={this.state.artworkToSell}
            closeForm={this.closeForm}
          />
        )}

        {this.state.displayAddForm && (
          <FormCreateAnArtwork closeForm={this.closeForm} />
        )}

        {this.state.displayUpdateForm && (
          <FormUpdateOneCreation
            closeForm={this.closeForm}
            artwork={this.state.artworkToUpdate}
          />
        )}
      </div>
    );
  }
}

export default withUser(MyCreations);
