import React, { Component } from 'react';
import { router } from 'react-router';
import { API_URL, TK_KEY } from '../containers/RootUrl'
import Cookie from 'react-cookie';
import autoBind from 'react-autobind';

export function requireAuth(){
    const tk = Cookie.load('TK')

    let cookies = document.cookie
    let location = window.location.pathname

    if((
        cookies.indexOf("TK")) > 0){
        if((location === '/login') || (location === '/')){
            window.location = '/'
        }
    }else if((cookies.indexOf("TK")) < 0 ){
        if(location === '/login'){
            return null
        }else{
            window.location = '/login'
        }
    }
}