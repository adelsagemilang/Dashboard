import React, { Component, PropTypes } from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import '../../stylesheet/component/admin/_adduser.scss'
import { API_URL, TK_KEY } from '../../containers/RootUrl'


export default class AddUser extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return(
            <div className="add-popup">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Tambah User</p>
                            <p className="sub-title">Silakan masukkan data user dengan benar.</p>
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}