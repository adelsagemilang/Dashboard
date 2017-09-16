import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import { API_URL, TK_KEY } from '../../../../containers/RootUrl'

class HapusData extends Component {
    constructor(props) {
        super(props)
        autoBind(this)
        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)

    }

    handleAcceptDelete(){
        console.log('deleted')

        axios.get(API_URL + this.props.url,{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
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
	           	<div className="popup-container md">
					<div className="box-content">
						<div className="content">
							<p className="title warning">{this.props.title}</p>
							<p className="sub-title">Apakah anda yakin akan data dari petani <span className="strong">{this.props.name}</span> ?</p>
							<div className="box-btn auto" onClick={this.props.toggleDeletePopup}>
	                        <ButtonPrimary
                                class="button-primary"
                                type="button"
                                name="Tidak" />
                            </div>
                            <div className="box-btn auto" onClick={this.handleAcceptDelete}>
                                <ButtonPrimary
                                class="button-secondary"
                                type="submit"
                                name="Ya" />
                            </div>
						</div>
						<div className="footer-content warning"></div>
					</div>
				</div>
           </div> 
        );
    }
}

export default HapusData;
