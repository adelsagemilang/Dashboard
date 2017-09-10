import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import InputForm from '../../common/InputForm'
import TambahPetani from './TambahPetani';
import { ButtonPrimary } from '../../common/ButtonPrimary'
import '../../../stylesheet/component/admin/_popup.scss'
import { API_URL, TK_KEY } from '../../../containers/RootUrl'

class SearchPetani extends Component {

    constructor(props) {
        super(props)
        autoBind(this)

        this.state = {
        	phoneFound: false,
        	phoneNotFound: false
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userName = Crypto.AES.decrypt(Base64.decode(Cookie.load('username')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userEmail = Crypto.AES.decrypt(Base64.decode(Cookie.load('email')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleCancel(){
        console.log('canceled')
        this.props.onClick(this.props.toggleStatus === false)
        console.log('status'  + this.props.toggleStatus)
    }

    handleSearchToAdd(){
    	console.log('clicked');
    	const value = document.getElementById('search-to-add').value
    	axios.get(API_URL + 'user_access?page=0&size=10&text=' + value + '&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
            const phone = dataHere.map( datas => {
                return datas.phone
            })

            if( phone.length ){
				this.setState({
		            phoneFound : true,
		            phoneNotFound: false
		        })
		        this.handleCancel()
            }
        })
        .catch((error) => {
            console.log('err: '+ error)
            this.setState({
	            phoneNotFound : true,
	            phoneFound: false
	        })
	        this.handleCancel()
        })
    }

    phoneFound(){
    	let { phoneFound } = this.state

        if( phoneFound === true ){
            return (
                
            )
        }
        else{
            return null;
        }
 
    }

    phoneNotFound(){
    	let { phoneNotFound } = this.state

        if( phoneNotFound === true ){
            return (
                
            )
        }
        else{
            return null;
        }
 
    }

    render() {
        return (
           <div className="add-popup">
			<div className="popup-container sm">
				<div className="box-content">
					<div className="content">
						<p className="title">Tambah Petani</p>
						<p className="sub-title">Silahkan masukkan no. HP petani</p>
						<InputForm 
							inputId="search-to-add"
							handleChange={this._handleChange}
							type="text"
							placeholder="No. Handphone"
							class="form-control"
						/>

						<div className="box-btn" onClick={this.handleSearchToAdd}>
                            <ButtonPrimary
                            class="button-primary"
                            type="submit"
                            name="Cari" />
                        </div>
                        <div className="box-btn" onClick={this.handleCancel}>
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

export default SearchPetani;
