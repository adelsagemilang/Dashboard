import React, { Component } from 'react'
import "../../../stylesheet/component/common/sidebar/_list_menu.scss"
import autoBind from 'react-autobind';

export default class ListMenu extends Component {
    constructor(props){
        super(props)
        autoBind(this)
        
    }
    render(){
        return(
            <div className={"list-menu " + this.props.classActive}>
                <div className="box-icon">
                    <img src={ this.props.icon } />
                </div>
                <div className="box-text-menu">
                    <p>{this.props.text}</p>
                </div>
                <div className="active-mark"></div>
            </div>
        )
    }
}