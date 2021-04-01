import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import {Link} from 'react-router-dom'
import { withRouter} from "react-router-dom";




class MyActivity extends Component {
    state={
        myCurrentBids: null,
        myCurrentSales: null,
        boolean: true // is toggled when auction is closed
    }

    closeTheAuction=(auction)=>{
        if (auction.bids[0]) { // if there is at least one bid, new owner is last bidder
        apiHandler
        .closeAnAuction(auction._id,{owner : auction.bids[0].bidder._id } )
        .then(()=>this.setState({boolean : !this.state.boolean}))
        .catch(err=>console.log(err))
        } else { // if no one has bidded yet, auction is deleted
        apiHandler
        .deleteAuction(auction._id)
        .then(()=>this.setState({boolean : !this.state.boolean}))
        .catch(err=>console.log(err))
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.myCurrentSales){
            if (prevState.boolean!==this.state.boolean){
                apiHandler
                .getMyCurrentSales()
                .then((data) => {
                this.setState({myCurrentSales : data})
                })
                .catch(err=>console.log(err))
                }
        } 
    }

    componentDidMount(){      
        apiHandler
        .getMyCurrentBids()
        .then((data) => {
        this.setState({myCurrentBids : data})
        })
        .catch(err=>console.log(err))
        apiHandler
        .getMyCurrentSales()
        .then((data) => {
        this.setState({myCurrentSales : data})
        })
        .catch(err=>console.log(err))
    }

    render() {
        if (!this.state.myCurrentSales || !this.state.myCurrentBids || !this.props.context.user ){return <div>Loading...</div>}
        // console.log(this.state.myCurrentBids)
        return (
        <div className="flex" style={{gap: "50px", flexWrap: "wrap"}}>
            <div>
                <h3>My current bids</h3>
                {this.state.myCurrentBids.length===0 && <p>You haven't bid on any artwork lately.</p>}

                <table className="Profile-table">
                    <tbody>
                        {this.state.myCurrentBids.map((auction)=>{
                            return <tr key={auction._id}>
                                <td>
                                    <Link to={`artworks/${auction._artworkId._id}`}>
                                        <img className="Miniature" src={auction._artworkId.image} alt={auction._artworkId.title}/>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`artworks/${auction._artworkId._id}`}>
                                        {auction._artworkId.title}
                                    </Link>
                                    <p>
                                        Current bid: ${auction.bids[0].bidValue} |
                                        {auction.bids.filter((bid)=> bid.bidder._id === this.props.context.user._id).length > 0 
                                        && ` My last bid: ${auction.bids.filter((bid)=>bid.bidder._id === this.props.context.user._id)[0].bidValue}`} 
                                    </p>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <div>
            <h3>My current Sales</h3>
            {this.state.myCurrentSales.length===0 && <p>You don't have any sales in progress, you can add an auction at anytime.</p>}
            <table className="Profile-table Activity">
                <tbody>
                    {this.state.myCurrentSales.map((auction)=>{
                        return (
                          <tr key={auction._id}>
                            <td>
                              <Link to={`artworks/${auction._artworkId._id}`}>
                                <img
                                  className="Miniature"
                                  src={auction._artworkId.image}
                                  alt={auction._artworkId.title}
                                />
                              </Link>
                            </td>
                            <td>
                              <Link to={`artworks/${auction._artworkId._id}`}>
                                {auction._artworkId.title}
                              </Link>
                              {auction.bids[0] ? (
                                <p>
                                  Current bid: ${auction.bids[0].bidValue} |
                                  Placed by: {auction.bids[0].bidder.username}
                                </p>
                              ) : (
                                <p>No bid yet</p>
                              )}
                            </td>
                            <td></td>
                            <td>
                              <button
                                onClick={() => this.closeTheAuction(auction)}
                                className="Btn-minimal"
                              >
                                Close auction
                              </button>
                            </td>
                          </tr>
                        );
                    })}
                </tbody>
            </table>
            
            </div> 
        </div>
        )
    }
}

export default withUser (withRouter(MyActivity))