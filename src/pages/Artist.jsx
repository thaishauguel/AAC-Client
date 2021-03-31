import React, { Component } from "react";
import api from "../api/apiHandler";
import ArtworkCard from "../components/ArtworkCard";

export default class Artist extends Component {
  state = {
    artworks: null,
  };
  componentDidMount() {
    const userId = this.props.match.params.id;
    api
      .getOneCreator(userId)
      .then((res) => this.setState({ artworks: res }))
      .catch((err) => console.log(err));
  }
  render() {
    const {artworks} = this.state
    if (!artworks) return <h3>Loading</h3>;
    return (
      <div>
        <section className="Top-artwork" >
          <div className="Top-details Artist">
            <h1>{artworks[0].creator.username}</h1>
            <p>{artworks[0].creator.description}</p>

            <div>
              {artworks[0].creator.networks.instagram && (
                <a
                  href={artworks[0].creator.networks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              )}
              { artworks[0].creator.networks.website && (
                  <React.Fragment>
                    <span> | </span>
                    <a
                      href={artworks[0].creator.networks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </React.Fragment>
                )}
            </div>
          </div>
          <div>
            <img className="Avatar-img" src={artworks[0].creator.avatar} alt={artworks[0].creator.username} />
          </div>
        </section>

        <section className="More-artworks">
          <h4 className="">Creations</h4>
          <section className="Cards-gallery">
            {artworks.map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
          </section>
        </section>
      </div>
    );
  }
}
