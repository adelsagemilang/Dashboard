import React, { Component } from 'react'
import Header from '../common/Header'
import SideBar from '../common/sidebar/SideBar'

export default class LayoutMaster extends Component{
    render(){
        return(
            <div>
                <Header />
                <SideBar />
                {/* {this.props.children} */}
            </div>
        )
    }
}