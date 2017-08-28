import React, { Component } from 'react'
import "../../../stylesheet/component/common/sidebar/_list_menu.scss"

export default class ListMenu extends Component {
    render(){
        return(
            <div className={"list-menu " + this.props.classActive}>
                <div className="box-icon">
                    <img src="./images/icon/icon-menu/dashboard-icon.svg" />
                </div>
                <div className="box-text-menu">
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}