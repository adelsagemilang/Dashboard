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


class TambahAnggotaKelompokTani extends Component {
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
                <div className="popup-container sm">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Tambah Anggota Kelompok Tani</p>
                            <p className="sub-title">Silakan masukkan data anggota kelompok tani dengan benar.</p>
                            <InputForm 
                                type="text"
                                placeholder="Ketikkan nama atau ID kelompok tani…"
                                class="form-control"
                                handleChange={this._handleChange}
                            />
                            <div className="select-wrapper w-100">
                                 <select className="form-control select-option w-100">
                                    <option value="">Pilih Petani</option>
                                </select>
                            </div>
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Daftarkan Petani" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleTambahAnggotaKelompokTani}>
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

export default TambahAnggotaKelompokTani;
