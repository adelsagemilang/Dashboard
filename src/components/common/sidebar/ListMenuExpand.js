import React, { Component } from 'react'
import "../../../stylesheet/component/common/sidebar/_list_menu_expand.scss"

export default class ExpandMenuExpand extends Component {
    render(){
        return(
            <div className={"expand-list "+this.props.class}>   
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