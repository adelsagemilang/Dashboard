import React, { Component } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
    
import configureStore from '../store/configureStore'
import Routes from '../containers/Routes'
import createHistory from 'history/createBrowserHistory'
import App from '../components/App'
import NotFound from '../components/common/NotFound'

const store = configureStore()

export default class Root extends Component {
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <div>
                        <Routes />
                    </div>
                </Router>
            </Provider>
        )
    }
}

Root.PropTypes ={
    store: PropTypes.func.isRequired
}

