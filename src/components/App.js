import React, {Component, PropTypes} from 'react'
import { actionAuth } from '../actions/actionAuth'
import { connect } from 'react-redux'


export default class App extends Component{
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
     
    }

    render(){
        return(
            <div>
                apps
                {this.props.children}
            </div>
        )
    }
}