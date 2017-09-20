import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import moment from 'moment';
import { API_URL,API_LIST_URL , TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import InputForm from '../common/InputForm'
import TextArea from '../common/TextArea'

export default class EditAkun extends Component {
    constructor(props) {
        super(props);
        autoBind(this)

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.state = {
            listProvince: {},
            listBank: {},
            image_res: '',
            datepicker: moment().format('YYYY-MM-DD')
        }
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    getDatePicker(startdate){
        const date = moment(startdate).format('YYYY-MM-DD')
        this.setState({datepicker: date})
    }

    onChangeInputFile(e){
        e.preventDefault()
        let input = document.getElementById("uploadFile")
        let formdata = new FormData()
        formdata.append("image", input.files[0])

        const { cookies } = this.props;
        
        axios.post(API_LIST_URL + 'images?path=profile_pic', formdata, {

            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'multipart/form-data'

            }

        })
        .then(res => {
            const image_res = res.data.image

            let file = input.files[0];
            let reader = new FileReader();
            let url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
               this.setState({
                  image: [reader.result]
               })
             }.bind(this)
            
            this.setState({
                image_res
            })
            let test = document.getElementById('image').value
            console.log(test)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

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
        
        axios.put(API_URL + 'update', {
            name: document.getElementById('name').value,
            image: document.getElementById('image').value,
            ktp_number: document.getElementById('ktp_number').value,
            phone_number: document.getElementById('phone_number').value,
            birth_place: document.getElementById('birth_place').value,
            birth_date: this.state.datepicker,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            pos_code: document.getElementById('pos_code').value,
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
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    componentDidMount(){
        axios.get(API_URL + 'users',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const {
                name = res.data.name,
                image = res.data.image,
                ktp_number = res.data.ktp_number,
                phone_number = res.data.phone_number,
                birth_place = res.data.birth_place,
                birth_date = res.data.birth_date,
                email = res.data.email,
                address = res.data.address,
                location = res.data.location
                
                
            } = this.state

            this.setState({
                name,
                image,
                ktp_number,
                phone_number,
                birth_place,
                birth_date,
                email,
                address,
                location,
                status: true
            })

            console.log(this.state.birth_date)
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

    render() {
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
        return (
            <div id="outer-container">
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.svg" height="35"/>
                    </div>
                    <Header title="Edit Akun"/>
                    <div className="edit-akun">
                     {this.state.status ? (
                        <form onSubmit={this.handleSubmit} >
                            <div className="content-top">
                                <div className="box-picture">
                                    <div className="picture-wrapper">
                                       <img className="image-profile" src={this.state.image !=null ? this.state.image : "../images/user-img.jpeg" } alt=""/>
                                       <div className="hidden-hover">
                                            <img src="../images/icon/icon_image.png" />
                                            <span>Ganti Foto</span>
                                        </div>
                                        <input id="uploadFile" type="file" onChange={this.onChangeInputFile}/>
                                        <input id="image" type="hidden" value={this.state.image_res ? this.state.image_res : this.state.image}/>
                                    </div>
                                </div>
                                <div className="box-profile-form">
                                    <p className="strong">Profil</p>
                                    <div className="row-flex">
                                        <div className="box-1">
                                            <InputForm
                                            inputId="name"
                                            defaultValue={this.state.name}
                                            handleChange={this._handleChange}
                                            placeholder="Nama user"
                                            type="text" class="form-control"/>
                                            <InputForm
                                            inputId="ktp_number"
                                            defaultValue={this.state.ktp_number}
                                            handleChange={this._handleChange}
                                            placeholder="Nomor KTP"
                                            type="text" class="form-control"/>
                                            <InputForm
                                            inputId="phone_number"
                                            defaultValue={this.state.phone_number}
                                            handleChange={this._handleChange}
                                            placeholder="Nomor HP"
                                            type="text" class="form-control"/>
                                        </div>
                                        <div className="box-2">
                                            <InputForm
                                            inputId="birth_place"
                                            defaultValue={this.state.birth_place}
                                            handleChange={this._handleChange}
                                            placeholder="Tempat Lahir"
                                            type="text" class="form-control"/>
                                            <InputForm
                                             getValueDatePicker={this.getDatePicker}
                                            startdate={this.state.birth_date}
                                            inputId="birth_date"
                                            handleChange={this._handleChange}
                                            placeholder="Tanggal Lahir"
                                            type="date" class="form-control" icon="true" src="../images/icon/button_icon/icon-datepicker.svg"/>
                                             <InputForm
                                             inputId="email"
                                            defaultValue={this.state.email}
                                            handleChange={this._handleChange}
                                            placeholder="Alamat Email"
                                            type="email" class="form-control"/>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="content-bottom">
                                <div className="box-alamat">
                                    <p className="strong">Alamat</p>
                                    <TextArea
                                    idtextarea="address" defaultValue={this.state.address} title="Masukkan nama jalan/kampung dst..." class="form-control"/>
                                    <div className="row-flex">
                                        <div className="select-wrapper">
                                            <select className="form-control select-option input-sm" onChange={this.handleChangeProvince}>
                                                <option value={this.state.location.province_id} >{this.state.location.province}</option>
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
                                             <select className="form-control select-option input-sm" onChange={this.handleChangeCities}>
                                                <option value={this.state.location.city_id} >{this.state.location.city}</option>
                                                {statusCities ?
                                                        listCities.map(listcities => 
                                                            <option
                                                                defaultValue={this.state.cities}
                                                                key={listcities.id}
                                                                value={listcities.id}>
                                                                {listcities.name}
                                                            </option>
                                                        ) : null
                                                }
                                            </select>
                                        </div>
                                        <div className="select-wrapper">
                                             <select className="form-control select-option input-sm" onChange={this.handleChangeDistricts}>
                                                <option value={this.state.location.ditsrict_id} >{this.state.location.district}</option>
                                                {statusDistrict ?
                                                    listDistrict.map(listdistrict => 
                                                        <option
                                                            defaultValue={this.state.district}
                                                            key={listdistrict.id}
                                                            value={listdistrict.id}>
                                                            {listdistrict.name}
                                                        </option>
                                                    ) : null
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row-flex">
                                        <div className="select-wrapper">
                                            <select className="form-control select-option input-sm" onChange={this.handleChangeVillage} value={this.state.value}>
                                                <option value={this.state.location.village_id} >{this.state.location.village}</option>
                                                {statusVillage ?
                                                    listVillage.map(listvillage => 
                                                        <option
                                                            defaultValue={this.state.village}
                                                            key={listvillage.id}
                                                            value={listvillage.id}>
                                                            {listvillage.name}
                                                        </option>
                                                    ) : null
                                                }
                                            </select>
                                        </div>
                                         <InputForm
                                            defaultValue={this.state.location.pos_code}
                                            inputId="pos_code"
                                            handleChange={this._handleChange}
                                            placeholder="Kode Pos"
                                            type="text" class="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <ButtonPrimary name="Simpan Perubahan" />
                        </form>
                    ): null
                    }
                    </div>
                </div>
            </div>
        );
    }
}