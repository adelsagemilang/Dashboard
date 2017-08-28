import React, {Component, PropTypes} from 'react'
import { actionAuth } from '../actions/actionAuth'
import { connect } from 'react-redux'
import SideBar from '../components/common/sidebar/SideBar'


export default class HomeComp extends Component{
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
     
    }

    render(){
        return(
            <div className="home-comp">
                <SideBar />
            </div>
        )
    }
}