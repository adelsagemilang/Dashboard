import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import TextArea from '../common/TextArea'

export default class EditAkun extends Component {
    constructor(props) {
        super(props);
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    render() {
        return (
            <div className="main-content">
            	<Header title="Edit Akun"/>
                <div className="edit-akun">
                    <div className="content-top">
                        <div className="box-picture">
                            <div className="picture-wrapper">
                               <img src="../images/user-img.jpeg" alt=""/>
                            </div>
                        </div>
                        <div className="box-profile-form">
                            <p className="strong">Profil</p>
                            <div className="row-flex">
                                <div className="box-1">
                                    <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Nama user"
                                    type="text" class="form-control"/>
                                    <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Nomor KTP"
                                    type="text" class="form-control"/>
                                    <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Nomor HP"
                                    type="text" class="form-control"/>
                                </div>
                                <div className="box-2">
                                    <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Kota"
                                    type="text" class="form-control"/>
                                    <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Date"
                                    type="text" class="form-control" icon="true" src="../images/icon/button_icon/icon-datepicker.svg"/>
                                    <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Nama Petani"
                                    type="text" class="form-control"/>
                                </div> 
                            </div>
                        </div>
                        <div className="box-bank-form">
                            <p className="strong">Rekening Bank</p>
                            <div className="box-form">
                                <InputForm
                                handleChange={this._handleChange}
                                placeholder="Domisili Bank"
                                type="text" class="form-control"/>
                                <div className="row-flex">
                                    <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="No. Rek"
                                    type="text" class="form-control input-sm"/>
                                    <div className="select-wrapper">
                                         <select className="form-control select-option input-sm">
                                            <option value="">Nama Bank</option>
                                        </select>
                                    </div>
                                </div>
                                <InputForm
                                handleChange={this._handleChange}
                                placeholder="Atas Nama"
                                type="text" class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="content-bottom">
                        <div className="box-alamat">
                            <p className="strong">Alamat</p>
                            <TextArea title="Masukkan nama jalan/kampung dst..." class="form-control"/>
                            <div className="row-flex">
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
                            <div className="row-flex">
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
                        </div>
                        <div className="box-informasi-akun">
                            <p className="strong">Informasi Akun</p>
                            <div className="row-flex">
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Alamat Email"
                                    type="email" class="form-control"/>
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Username"
                                    type="text" class="form-control"/>
                            </div>
                            <div className="row-flex">
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Password"
                                    type="password" class="form-control"/>
                                <InputForm
                                    handleChange={this._handleChange}
                                    placeholder="Ulangi Password"
                                    type="password" class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <ButtonPrimary name="Simpan Perubahan" />
                </div>
            </div>
        );
    }
}