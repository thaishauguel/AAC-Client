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
        this.setState({displaySellForm : !this.state.displaySellForm, artworkToSell: title})
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
        <div>
            {this.state.myCollection.map((artwork)=>{
                return <div key={artwork._id} style={{display:"flex", padding:5}}><img style={{width:50}} src={artwork.image} alt=""/>
                <h4 style={{padding:5}} >{artwork.title}</h4>
                <h4 style={{padding:5}} >{artwork.creator.username}</h4>
                <button onClick={()=>this.handleClickSell(artwork.title)}>Sell</button>

                </div>
            })}
            {this.state.displaySellForm && <form onSubmit={this.handleSubmit}>
            <input type="text"  readOnly value={this.state.artworkToSell}/>
            <input id="initialPrice" onChange={this.handleChange} name="initialPrice" value={this.state.initialValue} type="number" placeholder="Initial price"/>
            <button>Submit</button>
            </form>}
        </div>
    )
}

    
}

export default MyCollection
