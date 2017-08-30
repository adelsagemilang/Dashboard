import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from '../components/App'
import HomeComp from '../components/HomeComp'
import Admin from '../components/admin/Admin'
import LoginComp from '../components/LoginComp'
import NotFound from '../components/common/NotFound'
import { requireAuth } from './requireAuth'
import LayoutMaster from '../components/common/LayoutMaster'

export default class Routes extends Component {
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/home" component={LayoutMaster || HomeComp} onEnter={requireAuth} />
                    <Route path="/admin/admin" component={LayoutMaster || Admin} onEnter={requireAuth} />
                    <Route path="/about" component={LayoutMaster || App} onEnter={requireAuth} />
                    <Route path="/login" component={LoginComp} onEnter={requireAuth} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        )
    }
}