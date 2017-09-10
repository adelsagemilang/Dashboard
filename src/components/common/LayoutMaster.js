import React, { Component } from 'react'
import SideBar from '../common/sidebar/SideBar'
import '../../stylesheet/component/admin/_admin.scss'

export default class LayoutMaster extends Component{
    render(){
    	
        return(
            <div>
                <SideBar />
                {this.props.children}
            </div>
        )
    }
}