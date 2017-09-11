import React, { Component, PropTypes } from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import InputForm from '../../../common/InputForm'
import TextArea from '../../../common/TextArea'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, TK_KEY } from '../../../../containers/RootUrl'


export default class TambahPetani extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

     handleSubmit(e){
        // const doc = document.getElementById
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'admins', {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone_number: document.getElementById('no_hp').value,
            name: document.getElementById('name').value
            
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            const data = res.data
            this.setState({data})
            console.log('succ: '+ this.state.data)
            window.location.reload();
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render(){
        return(
            <div className="add-popup">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Tambah User</p>
                            <p className="sub-title">Silakan masukkan data petani dengan benar.</p>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    type="text"
                                    placeholder="Nama Petani"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    type="text"
                                    placeholder="No. Handphone"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2">
                                <InputForm 
                                    type="text"
                                    placeholder="No. KTP"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    type="text"
                                    placeholder="Tempat Lahir"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2">
                                <InputForm 
                                    type="text"
                                    placeholder="Tanggal Lahir"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    type="text"
                                    placeholder="Nama Ibu Kandung"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <p className="strong">Alamat</p>
                            <TextArea title="Masukkan nama jalan/kampung dst..." class="form-control"/>
                            <div className="row-flex col-3">
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Nama user"
                                    type="text" class="form-control"/>
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Nama Bank</option>
                                    </select>
                                </div>
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Nama Bank</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row-flex col-3">
                                <div className="select-wrapper">
                                    <select className="form-control select-option input-sm">
                                        <option value="">Kelurahan</option>
                                    </select>
                                </div>
                                 <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Kode Pos"
                                    type="text" class="form-control"/>
                            </div>
                            <p className="strong">Informasi Akun</p>
                            <div className="row-flex col-2">
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Alamat Email"
                                    type="email" class="form-control"/>
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Username"
                                    type="text" class="form-control"/>
                            </div>
                            <div className="row-flex col-2">
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Password"
                                    type="password" class="form-control"/>
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Ulangi Password"
                                    type="password" class="form-control"/>
                            </div>
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Daftarkan Petani" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleHandleDaftar}>
                                <ButtonPrimary
                                class="button-secondary"
                                type="button"
                                name="Batal" />
                            </div>
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}