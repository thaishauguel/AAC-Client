import React, { Component } from "react";
import api from "../api/apiHandler";
import ArtworkCard from "../components/ArtworkCard";

export default class Artist extends Component {
    state = {
        artworks: null,
    }
    componentDidMount() {
        const userId = this.props.match.params.id;
        api.getOneCreator(userId)
        .then(res => this.setState({artworks: res}))
        .catch(err=> console.log(err))
    }
  render() {
      if (!this.state.artworks) return <h3>Loading</h3>
    return <div>
        <section style={{
            display: "flex"
        }}>
            <div>
                <h1>{this.state.artworks[0].creator.username}</h1>
                <h4>{this.state.artworks[0].creator.description}</h4>
                <h4>{this.state.artworks[0].creator.networks.instagram} | {this.state.artworks[0].creator.networks.website}</h4>
            </div>
            <div>
            <img src={this.state.artworks[0].creator.avatar} alt={this.state.artworks[0].creator.username}/>
            </div>
        </section>
        <section>
            <h3>Creations</h3>
            <div className="Cards-gallery">
            {this.state.artworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
            </div>
        </section>

    </div>;
  }
}
