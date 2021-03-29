import React, {Component} from 'react'
import apiHandler from "../../api/apiHandler";
import {Link} from 'react-router-dom'



class MyCollection extends Component {
    state={
        myCollection: null,
        displaySellForm:false,
        artworkToSell : null, 
        initialValue : 0

    }


    componentDidMount(){
        apiHandler
        .getMyCollection()
        .then((data) => {
        this.setState({myCollection : data})
        })
        .catch(err=>console.log(err))
    }
    handleClickSell=(title)=>{
        this.setState({displaySellForm : true, artworkToSell: title})
    }
        
     handleSubmit=()=>{
                console.log('submitted!')
    }

    handleChange=(event)=>{
        this.setState({initialValue: event.target.value })
    }


render(){
    if (!this.state.myCollection){return <div>Loading...</div>}
    console.log(this.state)
    return (
        <div className="flex">
            <table className="Profile-table">
                <tbody>
                    {this.state.myCollection.map((artwork)=>{
                        return (
                        <tr key={artwork._id}> 
                            <td>
                                <img className="Miniature" src={artwork.image} alt={artwork.title}/>
                            </td>
                            <td>
                                <p> {artwork.title} by {artwork.creator.username} </p>
                            </td>
                            <td>
                            <button onClick={()=>this.handleClickSell(artwork.title)}>
                                <img className="Btn-icon" src="img/auction-btn.svg" alt="auction-btn" />
                            </button>
                            </td>
                        </tr> )
                    })}    
                </tbody>
            </table>

            {this.state.displaySellForm && 
            <form onSubmit={this.handleSubmit}>
                <input type="text"  readOnly value={this.state.artworkToSell}/>
                <input id="initialPrice" onChange={this.handleChange} name="initialPrice" value={this.state.initialValue} type="number" placeholder="Initial price"/>
                <button className="Btn-black">Create an Auction</button> 
            </form>}
        </div>
    )
}

    
}

export default MyCollection
