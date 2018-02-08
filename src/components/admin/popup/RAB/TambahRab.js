import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import InputForm from '../../../common/InputForm'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, TK_KEY } from '../../../../containers/RootUrl'

class TambahRab extends Component {

    constructor(props) {
        super(props)
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleTambahRab(){

    }

    render() {
        return (
           <div className="add-popup">
           	<div className="popup-container sm">
				<div className="box-content">
					<div className="content">
						<p className="title">Tambah RAB</p>
						<p className="sub-title">Silakan masukkan nama RAB baru dengan
						benar.</p>
						<InputForm 
							inputId="name"
							handleChange={this._handleChange}
							type="text"
							placeholder="No. Handphone"
							class="form-control"
						/>

						<div className="box-btn auto" onClick={this.handleTambahRab}>
                            <ButtonPrimary
                            class="button-primary"
                            type="submit"
                            name="Tambah RAB" />
                        </div>
                        <div className="box-btn" onClick={this.props.toggleTambahRab}>
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

export default TambahRab;
