import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import App from '../components/App'
import NotFound from '../components/common/NotFound'

export default class Routes extends Component {
    render(){
        return(
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/about" component={App}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}