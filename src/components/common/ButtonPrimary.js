import React, { Component } from 'react'
import "../../stylesheet/component/common/_button_primary.scss"

export default class ButtonPrimary extends Component {
    render(){
        return(
            <button className="button-primary">
                Login
            </button>
        )
    }
}