import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import {Link} from 'react-router-dom'



class MyActivity extends Component {
    state={
        myCurrentBids: null,
        myCurrentSales: null,
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
        
        return (
        <div className="flex">
            <div>
                <h3>My current bids</h3>
                <table className="Profile-table">
                    <tbody>
                        {this.state.myCurrentBids.map((auction)=>{
                            return <tr key={auction._id}>
                                <td>
                                    <Link ><img className="Miniature" src={auction._artworkId.image} alt={auction._artworkId.title}/></Link>
                                </td>
                                <td>
                                <Link><h4>{auction._artworkId.title}</h4></Link>
                                </td>
                                <td>
                                <p>Current bid : ${auction.bids[0].bidValue}</p>
                                {
                                    auction.bids.filter((bid)=> bid.bidder._id === this.props.context.user._id).length > 0 
                                    && <p>My last bid : ${auction.bids.filter((bid)=>bid.bidder._id === this.props.context.user._id)[0].bidValue}</p>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <div>
            <h3>My current Sales</h3>
            <table className="Profile-table">
                <tbody>
                    {this.state.myCurrentSales.map((auction)=>{
                        return <tr key={auction._id}>
                            <td>
                                <img className="Miniature" src={auction._artworkId.image} alt={auction._artworkId.title}/>
                            </td>
                            <td>
                                <p>{auction._artworkId.title} by {auction._artworkId.creator.username}</p>
                            </td>
                            <td>
                            {auction.bids[0]? <div><p>Current bid : ${auction.bids[0].bidValue}</p>
                                <p>Placed by : {auction.bids[0].bidder.username}</p></div>
                             : <p>No bid yet</p>}
                             </td>
                        </tr>
                    })}
                </tbody>
            </table>
            
            </div> 
        </div>
        )
    }
}

export default withUser(MyActivity)