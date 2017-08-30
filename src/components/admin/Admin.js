import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie';
import Crypto from 'crypto-js';
import Base64 from 'base-64';
import autoBind from 'react-autobind';
import { API_URL, TK_KEY } from '../../containers/RootUrl'

export default class Admin extends Component{
    constructor(props){
        super(props)
        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    componentDidMount(){
        console.log('token'+this.authToken)
    }

    render(){
        return(
            <div>
                Admin
                
            </div>
        )
    }
}