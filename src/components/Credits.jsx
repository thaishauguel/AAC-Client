import React, { Component } from 'react'
import {withUser} from './Auth/withUser'
import EthToDollars from '../controllers/EthToDollars'

export class Credits extends Component {
    state = {
        credit: null
    }

    componentDidMount() {
        EthToDollars(this.props.context.user.credit)
        .then(res => {
            this.setState({credit: res})
        })
    }

    render() {
        const {user} = this.props.context
        const {credit} = this.state
       
        return (
            <div className="Profile-credits">
                <h4>Credits</h4>
                <p className="Price">{user.credit}<span className="Currency">ETH</span></p>
                <p className="Dollars">${credit}</p>
          </div>
        )
    }
}

export default withUser(Credits)
