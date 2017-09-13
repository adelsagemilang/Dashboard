import React, { Component, PropTypes } from 'react';
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

class BuatProgram extends Component {
    constructor(props) {
        super(props);
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


    render() {
        return (
            <div className="add-popup">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Buat Program</p>
                            <p className="sub-title">Silahkan lengkapi profile program investasi Anda.</p>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    type="text"
                                    placeholder="Judul Program"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Kategori</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    type="text"
                                    placeholder="Periode"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Model Bisnis</option>
                                    </select>
                                </div>
                            </div>
                            <TextArea title="Jelaskan secara singkat program anda, tidak lebih dari 140 karakter.
								Penjelasan ini untuk membantu kami mempromosikan program anda." class="form-control"/>

							<TextArea title="Jelaskan dampak atau perubahan yang diharapkan" class="form-control"/>

							<div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    type="text"
                                    placeholder="Ketentuan Model Bisnis"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Minimal Pemberian Dana</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    type="text"
                                    placeholder="Link Video Youtube (Jika ada)"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Buat Program" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleBuatProgram}>
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
        );
    }
}

export default BuatProgram;
