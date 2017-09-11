import React, { Component } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
    
import configureStore from '../store/configureStore'
import Routes from '../containers/Routes'
import createBrowserHistory from 'history/createBrowserHistory'
import App from '../components/App'


const history = createBrowserHistory()
const store = configureStore()
// store.dispatch(actionAuth.fetchAuth())

export default class Root extends Component {
    render(){
        return(
                <Provider store={store}>
                    <Router history={history}>
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

