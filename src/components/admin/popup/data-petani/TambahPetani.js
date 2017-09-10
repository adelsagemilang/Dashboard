import React, { Component, PropTypes } from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import InputForm from '../../../common/InputForm'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, TK_KEY } from '../../../../containers/RootUrl'


export default class TambahPetani extends Component{
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
                            <p className="sub-title">Silakan masukkan data petani dengan benar.</p>
                            <div className="row-flex">
                                <InputForm 
                                    type="text"
                                    placeholder="Nama Petani"
                                    class="form-control"
                                />
                                <InputForm 
                                    type="number"
                                    placeholder="No. Handphone"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}