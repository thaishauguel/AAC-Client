import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                <h1>Oups,
                are you lost?
                </h1>
                <Link className="Btn-minimal" to="/" >Please back home</Link>
            </div>
        )
    }
}
export default NotFound
