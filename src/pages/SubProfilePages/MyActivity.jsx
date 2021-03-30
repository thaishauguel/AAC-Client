import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import {Link} from 'react-router-dom'
import { withRouter} from "react-router-dom";




class MyActivity extends Component {
    state={
        myCurrentBids: null,
        myCurrentSales: null,
        boolean: true
    }

    closeTheAuction=(auction)=>{
        // console.log(auction.bids[0].bidder._id)
        // let newOwnerId = auction.bids[0].bidder._id
        apiHandler
        .closeAnAuction(auction._id,{owner : auction.bids[0].bidder._id } )
        .then(()=>this.setState({boolean : !this.state.boolean}))
        .catch(err=>console.log(err))

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
        console.log(this.state.myCurrentBids)
        return (
        <div className="flex">
            <div>
                <h3>My current bids</h3>
                <table className="Profile-table">
                    <tbody>
                        {this.state.myCurrentBids.map((auction)=>{
                            return <tr key={auction._id}>
                                <td>
                                <Link to={`artworks/${auction._artworkId._id}`}><img className="Miniature" src={auction._artworkId.image} alt={auction._artworkId.title}/>
                                </Link></td>
                                <td>
                                <Link to={`artworks/${auction._artworkId._id}`}><h4>{auction._artworkId.title}</h4>
                                </Link></td>
                                <td>
                                <Link to={`artworks/${auction._artworkId._id}`}>
                                <p>Current bid : ${auction.bids[0].bidValue}</p>
                                {auction.bids.filter((bid)=> bid.bidder._id === this.props.context.user._id).length > 0 
                                    && <p>My last bid : ${auction.bids.filter((bid)=>bid.bidder._id === this.props.context.user._id)[0].bidValue}</p>}
                                </Link></td>
                                
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <div>
            <h3>My current Sales</h3>
            <table className="Profile-table">
                <tbody>
                    {this.state.myCurrentSales.length===0 ? <tr><td>No current sales</td></tr> : this.state.myCurrentSales.map((auction)=>{
                        return <tr key={auction._id}>
                            <td>
                            <Link to={`artworks/${auction._artworkId._id}`}><img className="Miniature" src={auction._artworkId.image} alt={auction._artworkId.title}/></Link>
                            </td>
                            <td>
                            <Link to={`artworks/${auction._artworkId._id}`}><p>{auction._artworkId.title} by {auction._artworkId.creator.username}</p></Link>
                            </td>
                            <td>
                            {auction.bids[0]? <div><p>Current bid : ${auction.bids[0].bidValue}</p>
                                <p>Placed by : {auction.bids[0].bidder.username}</p></div>
                             : <p>No bid yet</p>}
                             </td>
                             <td><button onClick={()=>this.closeTheAuction(auction)} className="Btn-black">Close the auction</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
            
            </div> 
        </div>
        )
    }
}

export default withUser (withRouter(MyActivity))