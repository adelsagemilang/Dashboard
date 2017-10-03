import React, { Component } from 'react'
import "../../stylesheet/component/common/_header.scss"
import Cookie from 'react-cookie';
import Crypto from 'crypto-js';
import axios from 'axios'
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
        this.userLevel = Crypto.AES.decrypt(Base64.decode(Cookie.load('user_level_name')), TK_KEY).toString(Crypto.enc.Utf8)
    }

     handleLogout(){
        Cookie.remove('TK', { path: '/' });
        Cookie.remove('user_level_name', { path: '/' });
        Cookie.remove('username', { path: '/' });
        window.location.reload(true)
    }

    componentDidMount(){
        axios.get(API_URL + 'users',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const {
                image = res.data.image,
                
                
            } = this.state

            this.setState({
                image
            })

        })
        .catch((error) => {
            console.log('err: '+ error)
        })
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
                        { this.props.backprogram === "true" ?
                            <Link to={this.props.link}>
                                <img src="../images/icon/button_icon/back_icon.svg" />
                                <p>{this.props.title}</p>
                             </Link> 
                        :
                            <p>{this.props.title}</p>
                        }
                    </div>
                    
                    <div className="box-menu">
                        <div className="box-user">
                            <div className="box-img-user">
                                <img src={ this.state.image ? this.state.image : "../images/user-img.png"} />
                            </div>
                            <div className="box-user-text">
                                <p className="username">{this.userName}</p>
                                <p className="status">{this.userLevel}</p>
                            </div>
                        </div>
                        <div className="box-setting header-icon">
                            <Link to="/admin/edit-akun">
                                <img src={ this.state.settingActive ? '../images/icon/setting-icon-blue.svg' : '../images/icon/setting-icon.svg' } />
                             </Link>    
                        </div>
                        <div className="box-logout header-icon" onClick={this.handleLogout}>
                            <img src="../images/icon/logout-icon.svg" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}