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


export default class EditRukman extends Component{
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
        
        axios.put(API_URL + this.props.url, {
            rukman_name: document.getElementById('nama-rukman').value,
            pic_name: document.getElementById('nama-pic').value,
            pic_ktp_number: document.getElementById('ktp-number').value,
            pic_phone_number: document.getElementById('phone_number').value,
            address: document.getElementById('address').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
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
            window.location.reload()
            console.log('succ: '+ this.state.data)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    componentDidMount(){
        axios.get(API_URL + this.props.urlget,{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const {
                rukman_id = res.data.rukman_id,
                name = res.data.rukman_name,
                pic_name = res.data.pic_name,
                ktp_number = res.data.pic_ktp_number,
                pic_phone_number = res.data.pic_phone_number,
                address = res.data.address,
                postcode = res.data.pos_code,
                username = res.data.username,
                password = res.data.password
                
            } = this.state

            this.setState({
                rukman_id,
                name,
                pic_name,
                ktp_number,
                pic_phone_number,
                address,
                postcode,
                username,
                password,
                status: true
            })

            console.log(this.state.account_name)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

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
                            <p className="title">Edit Data Petani</p>
                            <p className="sub-title">Silakan masukkan data petani dengan benar.</p>
                            {this.state.status ? (
                            <form onSubmit={this.handleSubmit}>
                                <div className="row-flex col-2 mg-t-10">
                                <InputForm
                                    defaultValue={this.state.name}
                                    inputId="nama-rukman" 
                                    type="text"
                                    placeholder="Nama Kelompok Tani"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm
                                    defaultValue={this.state.pic_name}
                                    inputId="nama-pic" 
                                    type="text"
                                    placeholder="Nama PIC"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm
                                    defaultValue={this.state.ktp_number}
                                    inputId="ktp-number" 
                                    type="text"
                                    placeholder="Nomor KTP"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm
                                    defaultValue={this.state.pic_phone_number}
                                    inputId="phone_number" 
                                    type="text"
                                    placeholder="Nomor HP"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <p className="strong">Alamat</p>
                            <TextArea defaultValue={this.state.address} idtextarea="address" title="Masukkan nama jalan/kampung dst..." class="form-control"/>
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
                                    defaultValue={this.state.postcode}
                                    inputId="postcode"
                                    handleChange={this._handleChange}
                                    placeholder="Kode Pos"
                                    type="text" class="form-control"/>
                            </div>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm
                                    defaultValue={this.state.username}
                                    inputId="username" 
                                    type="text"
                                    placeholder="Username"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm
                                    defaultValue={this.state.password}
                                    inputId="password" 
                                    type="password"
                                    placeholder="Password"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="box-btn auto">
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Tambah Kelompok Tani" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleHandleTambah}>
                                <ButtonPrimary
                                class="button-secondary"
                                type="button"
                                name="Batal" />
                            </div>
                            </form>
                            ) : null 
                            }
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}