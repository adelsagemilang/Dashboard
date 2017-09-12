import React, { Component, PropTypes } from 'react'
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


export default class TambahLahan extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
        	tagsPenyakit: [],
        	tagsHama: [],
        	tagsKomoditas: []

        }
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleChangeTagsPenyakit(tagsPenyakit) {
	   this.setState({tagsPenyakit})
	 }

	 handleChangeTagsHama(tagsHama){
	 	this.setState({tagsHama})
	 }

	 handleChangeTagsKomoditas(tagsKomoditas){
	 	this.setState({tagsKomoditas})
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

    render(){

        return(
            <div className="add-popup">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Tambah Lahan</p>
                            <p className="sub-title">Silakan masukkan lahan petani dengan benar.</p>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    type="text"
                                    placeholder="Ketik nama atau id kelompok tani.."
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    type="text"
                                    placeholder="Ketik nama petani"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2">
                                <InputForm 
                                    type="text"
                                    placeholder="Nama Lahan"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Status Lahan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row-flex col-2">
                                <InputForm 
                                    type="text"
                                    placeholder="Luas"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    type="text"
                                    placeholder="Ketinggian"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2">
                            	<div className="tag-wrapper">
									<TagsInput ref="tagsPenyakit" value={this.state.tagsPenyakit} onChange={this.handleChangeTagsPenyakit} inputProps={{ placeholder: 'Penyakit Dominan' }} />
									<button onClick={() => this.refs.tagsPenyakit.accept()}>
										<img src="/images/icon/button_icon/icon_plus.svg" />
									</button>
                            	</div>
                            	<div className="tag-wrapper">
									<TagsInput ref="tagsHama" value={this.state.tagsHama} onChange={this.handleChangeTagsHama} inputProps={{ placeholder: 'Hama Dominan' }} />
									<button onClick={() => this.refs.tagsHama.accept()}>
										<img src="/images/icon/button_icon/icon_plus.svg" />
									</button>
                            	</div>
                            </div>
                            <div className="row-flex col-2">
								<InputForm 
                                    type="text"
                                    placeholder="Sumber Pengairan"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <p className="strong">Lokasi Lahan</p>
                            <TextArea title="Masukkan nama jalan/kampung dst..." class="form-control"/>
                            <div className="row-flex col-3">
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Provinsi</option>
                                    </select>
                                </div>
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Kabupaten/Kota</option>
                                    </select>
                                </div>
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm">
                                        <option value="">Kecamatan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row-flex col-3">
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
                            <p className="strong">Komoditas</p>
                            <div className="tag-wrapper w-100">
								<TagsInput ref="tagsKomoditas" value={this.state.tagsKomoditas} onChange={this.handleChangeTagsKomoditas} inputProps={{ placeholder: 'Ketik nama komoditas..' }} />
								<button onClick={() => this.refs.tagsKomoditas.accept()}>
									<img src="/images/icon/button_icon/icon_plus.svg" />
								</button>
                        	</div>
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Daftarkan Petani" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleTambahLahan}>
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
        )
    }
}