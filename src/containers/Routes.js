import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from '../components/App'
import HomeComp from '../components/HomeComp'
import LoginComp from '../components/LoginComp'
import NotFound from '../components/common/NotFound'
import { requireAuth } from './requireAuth'

export default class Routes extends Component {
    render(){
        return(
            <Switch>
                <Route
                    exact path="/"
                    component={App}/>

                <Route path="/home" component={HomeComp} onEnter={requireAuth} />
                <Route path="/about" component={App} onEnter={requireAuth} />
                <Route path="/login" component={LoginComp} onEnter={requireAuth} />
                <Route component={NotFound}/>
            </Switch>
        )
    }
}