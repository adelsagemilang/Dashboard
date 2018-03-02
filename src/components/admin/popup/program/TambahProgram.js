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

class TambahProgram extends Component {
    constructor(props) {
        super(props)
        autoBind(this)

        this.state = {
            error: false
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    _handleChange(){
        this.setState({
            error: false
        })
    }

    handleSubmit(e){
        // const doc = document.getElementById
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'programs/program_tickets/check_ticket', {
            ticket_code: document.getElementById('code').value,
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            if(res.status === 200){
                const data = res.data
                this.props.getRes(data)
                this.props.toggleTambahProgram()
                this.props.toggleBuatProgram()
            } else {
                this.setState({
                    error: true
                })
            }
        })
        .catch((error) => {
            this.setState({
                error: true
            })
        })
    }

    render() {
        return (
           <div className="add-popup">
                <div className="popup-container md">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Buat Program</p>
                            <p className="sub-title">Silakan masukan kode tiket yang sudah anda ajukan untuk membuat program.</p>
                            {   this.state.error ? 
                                <p className="text-danger mg-b-10 mg-t-10">Tiket tidak terdaftar</p>
                                :
                                null
                            }
                            <InputForm
                                inputId="code" 
                                type="text"
                                placeholder="Kode Tiket"
                                class={!this.state.error ? "form-control" : "form-control has-error"}
                                handleChange={this._handleChange}
                            />
                            
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Submit" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleTambahProgram}>
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

export default TambahProgram;
