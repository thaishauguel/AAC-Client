import React from "react";
import api from "../api/apiHandler";
import { Link } from "react-router-dom";
import EthToDollars from "./../controllers/EthToDollars";
// Components
import ArtworkCard from "../components/ArtworkCard";
import Loading from "../components/Loading";
// Styles
import "../styles/Home.css";
import "../styles/Animations.css";


class Home extends React.Component {
  state = {
    artworks: null,
    auctionTop: null,
    dollars: null,
    parallaxX: null,
    parallaxY: null,
    blur: null, 
  };
  
  

  parallax = (event) => {
    const speed = 2;
    const x= (window.innerWidth - event.pageX*speed)/300
    const y= (window.innerHeight - event.pageY*speed)/100
    const blurVal= (window.innerHeight - event.pageX)/250
    
    this.setState({parallaxX: x, parallaxY: y, blur: blurVal})
  }

  getEthToDollars(value) {
    EthToDollars(value)
      .then((res) => this.setState({ dollars: res }))
      .catch((err) => console.log(err));
  }


  getData=()=>{
    api.getSalesOn().then((res) =>
      this.setState({ artworks: res }, () => {
        if (this.state.artworks.length > 0) {
          api
            .getLastAuction(this.state.artworks[0]._id)
            .then((res) =>
              this.setState({ auctionTop: res }, () => {
                if (this.state.auctionTop.bids.length === 0) {
                  this.getEthToDollars(this.state.auctionTop.initialPrice)
                } else {
                  this.getEthToDollars(this.state.auctionTop.bids[0].bidValue)
                }
              })
            )
            .catch((err) => console.log(err));
        }
      })
    );
  }

  intervalID;
   /* 
        declare a member variable to hold the interval ID
        that we can reference later.
      */

  componentDidMount() {
    window.scrollTo(0, 0);
   this.getData()
    this.intervalID = setInterval(()=>this.getData(), 2000);
    /*
          Now we need to make it run at a specified interval,
          bind the getData() call to `this`, and keep a reference
          to the invterval so we can clear it later.
        */
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.parallaxX !== this.state.parallaxX || prevState.parallaxY !== this.state.parallaxY ) 
    this.setState({parallaxX: this.setState.parallaxX, parallaxY: this.setState.parallaxY, blur: this.state.blur})
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearInterval(this.intervalID);
  }


  render() {
    const { artworks, auctionTop, dollars, parallaxX, parallaxY, blur } = this.state;
    const dollarsFormat = new Intl.NumberFormat().format(dollars)
    let parallax = {
      transform: `translateX(${parallaxX}px) translateY(${parallaxY}px)`,
      filter: `blur(${blur}px)`
    }
    if (!artworks || !auctionTop) {
      return <Loading text="Art" />;
    }
    let [topArtwork, ...rest] = artworks;
    return (
      <div className="Home" onMouseMove={this.parallax}>
        {artworks.length > 0 && (
          <section className="Top-artwork Grid40-60">
            <div className="Top-artwork-Bg slide-in-top"></div>
            <div className="Top-artwork-infos slide-in-bottom" style={parallax}>
              <h1>{topArtwork.title}</h1>
              <h4>@{topArtwork.creator.username}</h4>

              <div className="Bid-home">
                <h4>Current Bid</h4>
                <p className="Price">
                  {auctionTop.bids.length === 0
                    ? auctionTop.initialPrice
                    : auctionTop.bids[0].bidValue}
                  <span className="Currency">ETH</span>
                </p>
                <p className="Dollars">${dollarsFormat}</p>
              </div>
              <Link to={`/artworks/${topArtwork._id}`}>
                <button className="Btn-black">See the auction</button>
              </Link>
            </div>
            
            <img className="Top-img-size slide-in-bottom delay2" src={topArtwork.image} alt={topArtwork.title}/>
          </section>
        )}

        <section className="Cards-gallery">
          <h3 style={parallax} >Discover current auctions.</h3>
          {artworks &&
            rest.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
          ))}
        </section>
      </div>
    );
  }
}

export default Home;
