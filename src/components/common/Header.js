import React, { Component } from 'react'
import "../../stylesheet/component/common/_header.scss"
import Cookie from 'react-cookie';
import Crypto from 'crypto-js';
import Base64 from 'base-64';
import autoBind from 'react-autobind';
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { Link } from 'react-router-dom'

export default class Header extends Component{
    constructor(props){
        super(props)

        autoBind(this)

        this.state = {
            settingActive: false
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userName = Crypto.AES.decrypt(Base64.decode(Cookie.load('username')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userEmail = Crypto.AES.decrypt(Base64.decode(Cookie.load('email')), TK_KEY).toString(Crypto.enc.Utf8)
    }

     handleLogout(){
        Cookie.remove('TK', { path: '/' });
        Cookie.remove('email', { path: '/' });
        Cookie.remove('username', { path: '/' });
        window.location.reload(true)
    }

    componentDidMount(){
        console.log('username: '+ this.userName )
    }
    render(){

        const url = window.location.pathname;

        if(url === '/admin/edit-akun' ||  url === '/admin/edit-akun'){
            this.state.settingActive = true
        }else{
            this.state.settingActive = false
        }

        return(
            <div className="header-comp">
                <div className="header-container">
                    <div className="box-title">
                        <p>{this.props.title}</p>
                    </div>
                    
                    <div className="box-logout header-icon" onClick={this.handleLogout}>
                        <img src="../images/icon/logout-icon.svg" />
                    </div>
                    <div className="box-setting header-icon">
                        <Link to="/admin/edit-akun">
                            <img src={ this.state.settingActive ? '../images/icon/setting-icon-blue.svg' : '../images/icon/setting-icon.svg' } />
                         </Link>    
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