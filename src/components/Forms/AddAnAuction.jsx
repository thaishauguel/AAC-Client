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
            _artworkId : this.props.artwork._id,
            startingDate: Date.now()
        }

        apiHandler
        .addAnAuction(newAuction)
        .then(()=>{
            this.props.closeForm("displaySellForm");
            console.log('created!')})
        .catch(err=>console.log(err))


    }

    handleChange=(event)=>{
    this.setState({initialPrice: event.target.value })
    }   

    render() {
        return (
            <section>
                <h3>Create an auction</h3>
                <form onSubmit={this.handleSubmit}>
                    <input required type="text"  readOnly value={this.props.artwork.title}/>
                    <input required id="initialPrice" onChange={this.handleChange} name="initialPrice" value={this.state.initialPrice} type="number" placeholder="Initial price"/>
                    <button className="Btn-black">Create</button> 
                </form>
            </section>
        )
    }
}

export default withRouter(withUser(AddAnAuction))
