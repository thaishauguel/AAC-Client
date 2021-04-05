import React, {Component} from 'react'
import apiHandler from "../../api/apiHandler";
import {Link} from 'react-router-dom'
import AddAnAuction from "../../components/Forms/AddAnAuction";




class MyCollection extends Component {
    state={
        myCollection: null,
        displaySellForm:false,
        artworkToSell : null, 
    }

    getCollection () {
        apiHandler
        .getMyCollection()
        .then((data) => {
        this.setState({myCollection : data})
        })
        .catch(err=>console.log(err))
    }
    componentDidMount(){
        this.getCollection()
    }
    handleClickSell=(artwork)=>{
        this.setState({displaySellForm : true, artworkToSell:artwork })
    }
        
    handleChange=(event)=>{
        this.setState({initialValue: event.target.value })
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.displaySellForm!==this.state.displaySellForm) {
            this.getCollection()
        }
      };
      
      closeForm = (nameOfForm) => {
        this.setState({[nameOfForm]: false})
      };

render(){
    if (!this.state.myCollection){return <div>Loading...</div>}
    // console.log("my collection state: ",this.state)
    return (
        <div className="MyCollection flex">

            {this.state.myCollection.length===0 && <p>You don't have any artwork in your collection, buy some !</p>}

            <table className="Profile-table">
                <tbody>
                    {this.state.myCollection.map((artwork)=>{
                        return (
                        <tr key={artwork._id}> 
                            <td>
                                <Link to={`artworks/${artwork._id}`}><img className="Miniature" src={artwork.image} alt={artwork.title}/></Link>
                            </td>
                            <td>
                            <Link to={`artworks/${artwork._id}`}>{artwork.title} <span>by {artwork.creator.username}</span></Link>
                            </td>
                            <td>
                            {artwork.forSale===false? <button onClick={()=>this.handleClickSell(artwork)}>
                                <img className="Btn-icon" src="img/auction-btn.svg" alt="auction-btn" />
                            </button> : <p>Auction<br/>in progress</p>}
                            </td>
                        </tr> )
                    })}    
                </tbody>
            </table>

            {this.state.displaySellForm && <AddAnAuction  artwork={this.state.artworkToSell} closeForm={this.closeForm}/>}
        </div>
    )
}

    
}

export default MyCollection
