import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import TagsInput from 'react-tagsinput'
import InputForm from '../../../common/InputForm'
import TextArea from '../../../common/TextArea'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, TK_KEY } from '../../../../containers/RootUrl'

class HapusProgram extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handleSubmitReject(e){
        // const doc = document.getElementById
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'programs/reject/' + this.props.id_program ,{
            reason: document.getElementById('reason').value
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            this.props.success()
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    handleSubmit(e){
        // const doc = document.getElementById
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'programs/delete/' + this.props.id_program ,{
            reason: document.getElementById('reason').value
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            this.props.success()
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render() {
        return (
           <div className="add-popup">
                <div className="popup-container md">
                    <div className="box-content">
                        <div className="content">
                            {  this.props.reject ? 
                                <p className="title warning">Tolak Program</p>
                                :
                                <p className="title warning">Hapus Program</p>
                            }
                            <p className="sub-title">Anda yakin akan { this.props.reject ? 'menolak' : 'menghapus' } program <span className="strong">{this.props.name}</span></p>
                            <TextArea idtextarea="reason" title="Tulis alasan anda" class="form-control"/>

                            { this.props.reject ? 
                                <div>
                                    <div className="box-btn auto" onClick={this.props.toggleTolakProgram}>
                                        <ButtonPrimary
                                            class="button-primary"
                                            type="submit"
                                            name="Batal" />
                                    </div>
                                    <div className="box-btn auto" onClick={this.handleSubmitReject}>
                                        <ButtonPrimary
                                        class="button-secondary"
                                        type="button"
                                        name="Konfirmasi" />
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="box-btn auto" onClick={this.props.toggleHapusProgram}>
                                        <ButtonPrimary
                                            class="button-primary"
                                            type="submit"
                                            name="Batal" />
                                    </div>
                                    <div className="box-btn auto" onClick={this.handleSubmit}>
                                        <ButtonPrimary
                                        class="button-secondary"
                                        type="button"
                                        name="Konfirmasi" />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="footer-content warning"></div>
                    </div>
                </div>
            </div>  
        );
    }
}

export default HapusProgram;
