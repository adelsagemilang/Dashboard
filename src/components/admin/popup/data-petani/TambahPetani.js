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
import { API_URL, API_LIST_URL, TK_KEY } from '../../../../containers/RootUrl'


export default class TambahPetani extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.state = {
            username: '',
            listProvince: {},
            listBank: {}
        }
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleChangeProvince(e){
        //get list cities
        this.setState({valueProvince: e.target.value}, () => {
            axios.get(API_LIST_URL+ 'provinces/' + this.state.valueProvince +'/cities')
            .then(res => {
                let listCities = res.data
                this.setState({listCities, statusCities: true})
                console.log('cities: '+this.state.listCities)
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
    }

    handleChangeCities(e){
        //get list district
        this.setState({valueCities: e.target.value}, () => {
            axios.get(API_LIST_URL+ 'cities/' + this.state.valueCities +'/districts')
            .then(res => {
                let listDistrict = res.data
                this.setState({listDistrict, statusDistrict: true})
                console.log('district: '+this.state.listDistrict)
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
    }

    handleChangeDistricts(e){
        //get list vilage
        this.setState({valueDistrict: e.target.value}, () => {
            axios.get(API_LIST_URL+ 'districts/' + this.state.valueDistrict +'/villages')
            .then(res => {
                let listVillage = res.data
                this.setState({listVillage, statusVillage: true})
                console.log('district: '+this.state.listVillage)
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
    }

    handleChangeVillage(e){
        //get list vilage
        this.setState({valueVillage: e.target.value}, () => {
            console.log(this.state.valueVillage)
        })
    }

    handleChangeBank(e){
        //get list vilage
        this.setState({bankId: e.target.value}, () => {
            console.log(this.state.bankId)
        })
    }

    handleSubmit(e){
        // const doc = document.getElementById
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'farmers', {
            name: document.getElementById('nama-petani').value,
            phone_number: document.getElementById('no_hp').value,
            ktp_number: document.getElementById('no_ktp').value,
            birth_place: document.getElementById('tempat_lahir').value,
            birth_date: document.getElementById('tanggal_lahir').value,
            biological_mothers_name: document.getElementById('nama-ibu').value,
            account_name: document.getElementById('bank-owner-name').value,
            rek_number: document.getElementById('no_rek').value,
            address: document.getElementById('alamat').value,
            pos_code: document.getElementById('postcode').value,
            bank_id: this.state.bankId,
            village_id: this.state.valueVillage
            
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
            this.props.success()
            console.log('succ: '+ this.state.data)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    componentDidMount(){
        axios.get(API_LIST_URL+ 'provinces/')
        .then(res => {
            let listProvince = res.data
            this.setState({
                listProvince,
                listStatus: true
            })
            console.log('province'+this.state.listProvince)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

        axios.get(API_LIST_URL+ 'banks')
        .then(res => {
            let listBank = res.data
            this.setState({
                listBank,
                listStatusBank: true
            })
            console.log('bank'+this.state.listBank)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

        
    }

    render(){
        let{
            listStatus,
            listStatusBank,

            listProvince,
            listBank,

            listCities,
            statusCities,
            
            listDistrict,
            statusDistrict,

            listVillage,
            statusVillage
        } = this.state
        return(
            <div className="add-popup">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Tambah User</p>
                            <p className="sub-title">Silakan masukkan data petani dengan benar.</p>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm
                                    inputId="nama-petani" 
                                    type="text"
                                    placeholder="Nama Petani"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    inputId="no_hp"
                                    type="text"
                                    placeholder="No. Handphone"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2">
                                <InputForm 
                                    inputId="no_ktp"
                                    type="text"
                                    placeholder="No. KTP"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    inputId="tempat_lahir"
                                    type="text"
                                    placeholder="Tempat Lahir"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2">
                                <InputForm 
                                    inputId="tanggal_lahir"
                                    type="text"
                                    placeholder="Tanggal Lahir"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    inputId="nama-ibu"
                                    type="text"
                                    placeholder="Nama Ibu Kandung"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <p className="strong">Alamat</p>
                            <TextArea handleChange={this._handleChange} idtextarea="alamat" title="Masukkan nama jalan/kampung dst..." class="form-control"/>
                            <div className="row-flex col-3">
                                <div className="select-wrapper">
                                   
                                     <select id="provinsi" className="form-control select-option input-sm" value={this.state.value}
                                     onChange={this.handleChangeProvince}>
                                        <option>Provinsi</option>
                                        {listStatus ?
                                            listProvince.map(listprovince => 
                                                <option
                                                    key={listprovince.id}
                                                    value={listprovince.id}>
                                                    {listprovince.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                                <div className="select-wrapper">
                                     <select id="kabupaten" className="form-control select-option input-sm" value={this.state.value}
                                     onChange={this.handleChangeCities}>
                                        <option value="">Kabupaten/Kota</option>
                                        {statusCities ?
                                                listCities.map(listcities => 
                                                    <option
                                                        key={listcities.id}
                                                        value={listcities.id}>
                                                        {listcities.name}
                                                    </option>
                                                ) : null
                                        }
                                    </select>
                                </div>
                                <div className="select-wrapper">
                                     <select id="kecamatan" className="form-control select-option input-sm" value={this.state.value}
                                     onChange={this.handleChangeDistricts}>
                                        <option value="">Kecamatan</option>
                                        {statusDistrict ?
                                            listDistrict.map(listdistrict => 
                                                <option
                                                    key={listdistrict.id}
                                                    value={listdistrict.id}>
                                                    {listdistrict.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row-flex col-3">
                                <div className="select-wrapper">
                                    <select id="kelurahan" className="form-control select-option input-sm" value={this.state.value}
                                     onChange={this.handleChangeVillage}>
                                        <option value="">Kelurahan</option>
                                        {statusVillage ?
                                            listVillage.map(listvillage => 
                                                <option
                                                    key={listvillage.id}
                                                    value={listvillage.id}>
                                                    {listvillage.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                                 <InputForm
                                    inputId="postcode"
                                    handleChange={this._handleChange}
                                    placeholder="Kode Pos"
                                    type="text" class="form-control"/>
                            </div>
                            <p className="strong">Informasi Akun</p>
                            <div className="row-flex col-2">
                                <InputForm
                                    inputId="no_rek"
                                    handleChange={this._handleChange}
                                    placeholder="No. Rek"
                                    type="text" class="form-control"/>
                                <div className="select-wrapper">
                                    <select id="bank-name" className="form-control select-option input-sm" value={this.state.value}
                                    onChange={this.handleChangeBank}>
                                        <option value="">Nama Bank</option>
                                        {listStatusBank ?
                                            listBank.map(listbank => 
                                                <option
                                                    key={listbank.id_bank}
                                                    value={listbank.id_bank}>
                                                    {listbank.bank_name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row-flex col-2">
                                <InputForm
                                    inputId="bank-owner-name"
                                    handleChange={this._handleChange}
                                    placeholder="Atas Nama"
                                    type="text" class="form-control"/>
                            </div>
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Daftarkan Petani" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleHandleDaftar}>
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