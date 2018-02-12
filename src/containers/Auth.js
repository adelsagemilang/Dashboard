import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from 'react-cookie';

let loc = window.location.pathname
export const Authenticated = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Cookie.load('TK') !== undefined ?
        (   
            loc  === '/login' || loc === '/' ?
            window.location.reload() ||
            <Redirect to={{ pathname: '/dashboard' }}/> :
            <Component {...props}/>
        )
        :
        (
            <Component {...props}/>,
            loc  === '/login' ?
            <Component {...props}/> :
            window.location.reload() ||
            <Redirect to={{ pathname: '/login' }}/>
        )

    )} />
)