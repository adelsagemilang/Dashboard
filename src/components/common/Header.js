import React, { Component } from 'react'
import "../../stylesheet/component/common/_header.scss"
import Cookie from 'react-cookie';
import Crypto from 'crypto-js';
import Base64 from 'base-64';
import autoBind from 'react-autobind';
import { API_URL, TK_KEY } from '../../containers/RootUrl'

export default class Header extends Component{
    constructor(props){
        super(props)

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userName = Crypto.AES.decrypt(Base64.decode(Cookie.load('username')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userEmail = Crypto.AES.decrypt(Base64.decode(Cookie.load('email')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    componentDidMount(){
        console.log('username: '+ this.userName )
    }
    render(){
        return(
            <div className="header-comp">
                <div className="header-container">
                    <div className="box-logout header-icon">
                        <img src="../images/icon/logout-icon.svg" />
                    </div>
                    <div className="box-setting header-icon">
                        <img src="../images/icon/setting-icon.svg" />
                    </div>
                    <div className="box-user">
                        <div className="box-img-user">
                            <img src="../images/user-img.jpeg" />
                        </div>
                        <div className="box-user-text">
                            <p className="username">{this.userName}</p>
                            <p className="status">{this.userEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}