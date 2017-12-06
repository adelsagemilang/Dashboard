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

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)

        this.state = {

        }
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleChangeRukman(e){
        this.setState({
            valueRukman: e.target.value}, () => {
            console.log(this.state.valueRukman)
            axios.get(API_URL+ 'farmers/spinner?query=' + this.state.valueRukman,{
                headers:{ 
                    'X-AUTH-TOKEN' : this.authToken
                }
            })
            .then(res => {
                let listfarmer = res.data
                this.setState({
                    listfarmer,
                    list_farmer: true 
                })
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
    }

    handleChangeFarmer(e){
        this.setState({valueFarmer: e.target.value}, () => {
            axios.get(API_URL+ 'programs/farmers/'+ this.state.valueFarmer +'/lands',{
                headers:{ 
                    'X-AUTH-TOKEN' : this.authToken
                }
            })
            .then(res => {
                let listLahan = res.data
                
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
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


    componentDidMount(){
        axios.get(API_URL+ 'farmer_groups/spinner_by_surveyor?active=true',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            let listrukman = res.data
            this.setState({
                listrukman,
                list_rukman: true
            })

            console.log(this.state.listrukman)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }
    


    render() {
        const { 
            list_rukman,
            listrukman,

            list_farmer,
            listfarmer

         } = this.state
        return (
            <div className="add-popup">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Tambah Peserta Program</p>
                            <p className="sub-title">Silahkan masukkan data peserta program.</p>
                            <div className="row-flex col-2 mg-t-10">
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm mg-r-10" value={ this.state.value } onChange={this.handleChangeRukman}>
                                        <option value="">Pilih kelompok tani</option>
                                        {list_rukman ?
                                            listrukman.map(rukman => 
                                                <option
                                                    key={rukman.farmer_group_id}
                                                    value={rukman.farmer_group_id}>
                                                    {rukman.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>

                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm" value={ this.state.value } onChange={this.handleChangeFarmer}>
                                        <option value="">Pilih petani</option>
                                        {list_farmer ?
                                            listfarmer.map(farmer => 
                                                <option
                                                    key={farmer.farmer_id}
                                                    value={farmer.farmer_id}>
                                                    {farmer.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
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
