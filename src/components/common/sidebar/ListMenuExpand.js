import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../../../stylesheet/component/common/sidebar/_list_menu_expand.scss"

export default class ExpandMenuExpand extends Component {
    render(){
        return(
            <Link to={"/admin/"+this.props.link}>
                <div className={"expand-list "+this.props.class}>   
                    <div className="box-icon">
                        {/* <img src="./images/icon/icon-menu/dashboard-icon.svg" /> */}
                        <div className="circle-icon"></div>
                    </div>
                    
                    <div className="box-text-menu">
                        <p>{this.props.text}</p>
                    </div>
                </div>
            </Link>
        )
    }
}