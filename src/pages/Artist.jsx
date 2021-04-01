import React, { Component } from "react";
import api from "../api/apiHandler";
import ArtworkCard from "../components/ArtworkCard";
import Loading from "../components/Loading";


export default class Artist extends Component {
  state = {
    artworks: null,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    const userId = this.props.match.params.id;
    api
      .getOneCreator(userId)
      .then((res) => this.setState({ artworks: res }))
      .catch((err) => console.log(err));
  }
  render() {
    const {artworks} = this.state
    if (!artworks) return <Loading text="Artist" />;
    return (
      <div>
        <section className="Top-artwork Grid40-60" >
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
