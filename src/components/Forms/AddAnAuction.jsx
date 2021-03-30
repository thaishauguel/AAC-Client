import React, { Component } from 'react'
import { withUser } from "../../components/Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { withRouter} from "react-router-dom";



class AddAnAuction extends Component {

    state={
        initialPrice:0,
        startingDate: null
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        const newAuction={
            initialPrice: this.state.initialPrice,
            _artworkId : this.props.auction._id,
            startingDate: Date.now()
        }

        apiHandler
        .addAnAuction(newAuction)
        .then(()=>{
            this.props.closeForm();
            console.log('created!')})
        .catch(err=>console.log(err))


    }

    handleChange=(event)=>{
    this.setState({initialPrice: event.target.value })
    }   


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"  readOnly value={this.props.auction.title}/>
                <input id="initialPrice" onChange={this.handleChange} name="initialPrice" value={this.state.initialPrice} type="number" placeholder="Initial price"/>
                <button className="Btn-black">Create an Auction</button> 
            </form>
        )
    }
}

export default withRouter(withUser(AddAnAuction))
