import React, { Component } from 'react'
import SideBar from '../common/sidebar/SideBar'
import '../../stylesheet/component/admin/_admin.scss'

export default class LayoutMaster extends Component{

	/*componentDidMount(){
		let DEBUG = false;
        if(!DEBUG){
            if(!window.console) window.console = {};
            let methods = ["log", "debug", "warn", "info"];
            for(let i=0;i<methods.length;i++){
                console[methods[i]] = function(){};
            }
        }
	}*/

    render(){
    	
        return(
            <div>
                <SideBar />
                {this.props.children}
            </div>
        )
    }
}