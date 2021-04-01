import React, { Component } from 'react'
// import {withUser} from './Auth/withUser'
import EthToDollars from '../controllers/EthToDollars'

export class Credits extends Component {
    state = {
        credit: null
    }

    getEthToDollars() {
        EthToDollars(this.props.user.credit)
        .then(res => {
            this.setState({credit: res})
        })
    }

    componentDidMount() {
        console.log('mount')
        this.getEthToDollars()
    }

    componentDidUpdate(prevProps,prevState){
        console.log('update')
        console.log("props credit", this.props.user.credit)
        if (prevProps.user.credit !== this.props.user.credit){
          this.getEthToDollars()
        }
    }
    render() {
        const {user} = this.props
        const {credit} = this.state
       
        return (
            <div className="Profile-credits">
                <h4>Credits</h4>
                <p className="Price">{user.credit.toFixed(2)}<span className="Currency">ETH</span></p>
                <p className="Dollars">${credit}</p>
          </div>
        )
    }
}

export default Credits
