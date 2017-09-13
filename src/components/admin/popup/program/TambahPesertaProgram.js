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

class TambahPesertaProgram extends Component {
    constructor(props) {
        super(props);
        autoBind(this)

        this.state = {

        }
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
                            <p className="title">Tambah Peserta Program</p>
                            <p className="sub-title">Silahkan masukkan data peserta program.</p>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm
                                    inputId="namakelompok"
                                    type="text"
                                    placeholder="Ketik Nama Kelompok Tani"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm
                                    inputId="namapetani" 
                                    type="text"
                                    placeholder="Ketik Nama Petani"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    inputId="biaya"
                                    type="text"
                                    placeholder="Tentukan biaya yang dibutuhkan (Rp.)"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <TextArea idtextarea="jelaskan-program" title="Jelaskan secara singkat program anda, tidak lebih dari 140 karakter.
								Penjelasan ini untuk membantu kami mempromosikan program anda." class="form-control"/>

							<TextArea title="Jelaskan dampak atau perubahan setelah program ini selesai" class="form-control"/>

							<p className="strong">Dokumen</p>
                            
                            <div className="row-flex mg-t-5">
                                <span className="btn-file">
                                    <img src="/images/icon/button_icon/icon_plus.svg"/> Tambah Dokumen <input type="file" multiple />
                                </span>
                            </div>

                            <p className="strong">Lahan</p>

                            <div className="box-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nama Lahan</th>
                                            <th>Luas Tersedia</th>
                                            <th>Komoditas</th>
                                            <th>Luas Lahan Tanam</th>
                                            <th>Jumlah Pohon</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="normal">
                                                <input type="checkbox" id="test1" />
                                                <label htmlFor="test1">Lahan Cikidang</label>
                                            </td>
                                            <td>5000m</td>
                                            <td>
                                                <div className="select-wrapper">
                                                     <select className="form-control select-option input-sm">
                                                        <option value="">Cabai</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <InputForm
                                                handleChange={this.handleSearch}
                                                class="form-control"
                                                type="text"/>
                                            </td>
                                            <td><InputForm
                                                handleChange={this.handleSearch}
                                                class="form-control"
                                                type="text"/></td>
                                        </tr>
                                        <tr>
                                            <td className="normal">
                                                <input type="checkbox" id="test2" />
                                                <label htmlFor="test2">Lahan Cikidang</label>
                                            </td>
                                            <td>5000m</td>
                                            <td>
                                                <div className="select-wrapper">
                                                     <select className="form-control select-option input-sm">
                                                        <option value="">Cabai</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <InputForm
                                                handleChange={this.handleSearch}
                                                class="form-control"
                                                type="text"/>
                                            </td>
                                            <td><InputForm
                                                handleChange={this.handleSearch}
                                                class="form-control"
                                                type="text"/></td>
                                        </tr>
                                        <tr>
                                            <td className="normal">
                                                <input type="checkbox" id="test3" />
                                                <label htmlFor="test3">Lahan Cikidang</label>
                                            </td>
                                            <td>5000m</td>
                                            <td>
                                                <div className="select-wrapper">
                                                     <select className="form-control select-option input-sm">
                                                        <option value="">Cabai</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <InputForm
                                                handleChange={this.handleSearch}
                                                class="form-control"
                                                type="text"/>
                                            </td>
                                            <td><InputForm
                                                handleChange={this.handleSearch}
                                                class="form-control"
                                                type="text"/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Buat Program" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleTambahPesertaProgram}>
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

export default TambahPesertaProgram;
