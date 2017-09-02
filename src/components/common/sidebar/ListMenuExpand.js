import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../../../stylesheet/component/common/sidebar/_list_menu_expand.scss"

export default class ListMenuExpand extends Component {
    render(){
        const ActiveMenu = (props) => {
            if(this.props.classActive === 'expand-is-active'){
                return <p className="active">{this.props.text}</p>
            }else{
                return <p >{this.props.text}</p>
            }
        }
        return(
            <Link to={"/admin/"+this.props.link}>
                <div className={"expand-list "}>
                    <div className={this.props.classActive}></div>
                    <div className="box-icon">
                        {/* <img src="./images/icon/icon-menu/dashboard-icon.svg" /> */}
                        <div className="circle-icon"></div>
                    </div>
                    
                    <div className="box-text-menu">
                        <ActiveMenu />
                    </div>   
                </div>
            </Link>
        )
    }
}