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

class SalinRab extends Component {

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
        const { cookies } = this.props;
        
        axios.post(API_QELISA_URL + 'public/program/rab/'+this.props.id+'/copy', {
           "user_aruni_id" : this.userId,
           "name" : document.getElementById('name').value
        },
        {
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
            this.props.redirect(res.data.rab_id) 
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
						<p className="title">Salin RAB</p>
						<p className="sub-title">Silakan masukkan nama RAB baru dengan
						benar.</p>
						<InputForm 
							inputId="name"
							handleChange={this._handleChange}
							type="text"
							placeholder="Nama RAB"
							class="form-control"
							defaultValue={this.props.placeholder}
						/>

						<div className="box-btn" onClick={this.handleSalinRab}>
                            <ButtonPrimary
                            class="button-primary"
                            type="submit"
                            name="Salin RAB" />
                        </div>
                        <div className="box-btn" onClick={this.props.toggleSalinRab}>
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

export default SalinRab;
