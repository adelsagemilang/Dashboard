import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import InputForm from '../../../common/InputForm'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_QELISA_URL, TK_KEY } from '../../../../containers/RootUrl'

class EditRab extends Component {

    constructor(props) {
        super(props)
        autoBind(this)
        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userId = Cookie.load('user_id')
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleSalinRab(e){
        e.preventDefault();
        let name = document.getElementById('name').value
        axios.get(API_QELISA_URL + 'public/program/rab/1/change-name?name='+name, {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            },
            auth: {
                username: 'username',
                password: 'password'
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render() {
        return (
           <div className="add-popup">
           	<div className="popup-container sm">
				<div className="box-content">
					<div className="content">
						<p className="title">Ubah Nama RAB</p>
						<p className="sub-title">Silakan masukkan nama RAB baru dengan
						benar.</p>
						<InputForm 
							inputId="name"
							handleChange={this._handleChange}
							type="text"
							placeholder="Nama RAB"
							class="form-control"
							defaultValue={this.props.name}
						/>

						<div className="box-btn" onClick={this.handleSalinRab}>
                            <ButtonPrimary
                            class="button-primary"
                            type="submit"
                            name="Edit RAB" />
                        </div>
                        <div className="box-btn" onClick={this.props.togglePopUpEdit}>
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

export default EditRab;
