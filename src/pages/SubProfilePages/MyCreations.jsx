import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import apiHandler from "../../api/apiHandler";


class MyCreations extends Component {

    state={
        myCreations: null,
        displayAddForm:false,
        title:"",
        description:"",
        image : ""
    }


    componentDidMount(){
        apiHandler
        .getMyCreations()
        .then((data) => {
        this.setState({myCreations : data})
    })
    }

    handleClickAdd=()=>{
    this.setState({displayAddForm : !this.state.displayAddForm})
    }

    handleSubmit=()=>{
        console.log('submitted!')
    }

    handleChange=(event)=>{
        const name= event.target.name
        const value= event.target.value
        this.setState({[name] : value})
    }


    render(){
        if (!this.state.myCreations){return <div>Loading...</div>}
        console.log(this.state)
        return (
        <div>
            {this.state.myCreations.map((artwork)=>{
                return <div key={artwork._id} style={{display:"flex", padding:5}}><img style={{width:50, padding : 5}} src={artwork.image} alt=""/>
                <h4 style={{padding:5}} >{artwork.title}</h4>
                <h4 style={{padding:5}} >{artwork.creator.username}</h4>
                {artwork.creator===artwork.owner._id?<button style={{padding:5}} >Sell</button>: <h4 style={{padding:5}} >Already sold</h4>}
                </div>
            })}
            <button onClick={this.handleClickAdd}>Add an artwork</button>
            {this.state.displayAddForm && <form onSubmit={this.handleSubmit}>
                <input id="title" name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Title"/>
            <input id="description" name="description" value={this.state.description} onChange={this.handleChange} type="text" placeholder="Description"/>
            <input id="image" name="image" value={this.state.image} onChange={this.handleChange} type="file" placeholder="Upload the image"/>
                </form>}
        </div>
    )
    }
    
}

export default MyCreations
