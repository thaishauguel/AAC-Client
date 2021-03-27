import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";



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
        if (!this.state.myCurrentSales || !this.state.myCurrentBids){return <div>Loading...</div>}
        console.log(this.state.myCurrentBids, this.state.myCurrentSales)
        return (
        <div>
            <div>
                <h3>My current bids</h3>
                {this.state.myCurrentBids.map((auction)=>{
                    return <div key={auction._id} style={{display:"flex", padding:5}}><img style={{width:50}} src={auction._artworkId.image} alt=""/>
                    <h4 style={{padding:5}} >{auction._artworkId.title}</h4>
                    <div>
                    <h4 style={{padding:5}} >Current bid : ${auction.bids[0].bidValue}</h4>
                    {auction.bids.filter((bid)=>bid.bidder._id=== this.props.context.user._id).length>0 && <h4 style={{padding:5}}>My last bid : ${auction.bids.filter((bid)=>bid.bidder._id=== this.props.context.user._id)[0].bidValue}</h4>}
                    </div>
                    </div>
                })}
                
            </div>
            <div>
            <h3>My current Sales</h3>
            {this.state.myCurrentSales.map((auction)=>{
                return <div key={auction._id} style={{display:"flex", padding:5}}><img style={{width:50}} src={auction._artworkId.image} alt=""/>
                <h4 style={{padding:5}} >{auction._artworkId.title}</h4>
                <h4 style={{padding:5}} >{auction._artworkId.creator.username}</h4>
                <div>
                <h4 style={{padding:5}} >Current bid : ${auction.bids[0].bidValue}</h4>
                <h4 style={{padding:5}} >Placed by : {auction.bids[0].bidder.username}</h4>
                </div>
                </div>
            })}
            
            </div> 
        </div>
        )
    }
}

export default withUser(MyActivity)