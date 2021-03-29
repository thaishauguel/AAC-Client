import React, { Component } from 'react'
import api from '../api/apiHandler'

import ArtworkCard from "../components/ArtworkCard";
import "../styles/OneArtwork.css"


export class OneArtwork extends Component {
    state = {
        artwork: null,
        otherArtworks: null
    }
    componentDidMount() {
        console.log('didMount')
        const artworkId = this.props.match.params.id
        console.log('first artworkId', artworkId)
        let creatorId;
        api.getOneArtwork(artworkId)
            .then(res => {
                creatorId = res.creator._id
                this.setState({artwork: res})
                api.getOneCreator(creatorId)
                    .then(res => {
                        const selectArtworks = res.slice(0,4)
                        this.setState({otherArtworks: selectArtworks})
                })
            })
            .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.artwork !== null) {
            if (prevState.artwork._id !== this.props.match.params.id ) {
                const artworkId = this.props.match.params.id
                let creatorId;
                api.getOneArtwork(artworkId)
                    .then(res => {
                        creatorId = res.creator._id
                        this.setState({artwork: res})
                        api.getOneCreator(creatorId)
                            .then(res => {
                                const selectArtworks = res.slice(0,4)
                                this.setState({otherArtworks: selectArtworks})
                        })
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    handleChange = (artwork) => {

    }
    
    render() {
        const {artwork, otherArtworks} = this.state
        return (
            <div className="OneArtwork">
                {artwork &&
                <section className="Top-artwork">
                    <img src={artwork.image} alt="hey" />
                    <div>
                        <h1>{artwork.title}</h1>
                        <h4>{artwork.creator.username}</h4>
                        <h4>{artwork.description}</h4>
                        {/* 
                        Bid Component to add 
                        */}
                    </div>
                </section>
                }
                
                <section className="More-artworks">
                    <h4 className="">From the same artist</h4>
                    <section className="Cards-gallery">
                    {otherArtworks && otherArtworks.map(artwork =>
                        <ArtworkCard  key={artwork._id}  artwork={artwork} />
                    )}
                    </section>
                </section>
            </div>
        )
    }
}

export default OneArtwork
