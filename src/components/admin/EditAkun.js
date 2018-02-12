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
import Success from './popup/common-popup/Success'
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
            toggleSuccess: false,
            error: false,
            error_pos: true,
            error_ktp: true,
            error_hp: true,
            activeCities: true,
            activeDistrict: true,
            activeVillage: true,
            now: moment().format('YYYY-MM-DD'),
            datepicker: moment().format('YYYY-MM-DD')
        }
    }

    toggleSuccessPopup(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess
        })
    }

    _handleChange(id, value){
        if ( id === 'no_ktp' ){
            let re = /^\d{16}$/
            let result =  re.test(value)

            if(result){
                this.setState({
                    error_ktp: result
                })
            }else{
                this.setState({
                    error_ktp: false
                })
            }
        }

        else if( id === 'no_hp' ){
            let re = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/
            let result =  re.test(value)

            if(result){
                this.setState({
                    error_hp: result,
                    error: false
                })
            }else{
                this.setState({
                    error_hp: false,
                    error: false
                })
            }
        }

        else if( id === 'postcode' ){
            let re = /^[0-9]{5}$/
            let result =  re.test(value)

            if(result){
                this.setState({
                    error_pos: result
                })
            }else{
                this.setState({
                    error_pos: false
                })
           }
        }

        else if ( id === 'email' ){
            this.setState({
                error: false,
            })
        }
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
        console.log(input.files[0])
        console.log(formdata)
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
        this.setState({
            location: false,
            valueProvince: e.target.value}, () => {

            axios.get(API_LIST_URL+ 'provinces/' + this.state.valueProvince +'/cities')
            .then(res => {
                let listCities = res.data
                this.setState({
                    listCities, 
                    statusCities: true,
                    activeCities: false,
                    statusDistrict: false,
                    activeDistrict: false,
                    statusVillage: false,
                    activeVillage: false
                })
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
                this.setState({listDistrict, 
                    statusDistrict: true,
                    activeDistrict: false,
                    statusVillage: false,
                    activeVillage: false
                })
                console.log('district: '+this.state.listDistrict)
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })


        if( e.target.value !== '' ){
            this.setState({activeCities: true})
        }
        else{
            this.setState({activeCities: false})
        }
    }

    handleChangeDistricts(e){
        //get list vilage
        this.setState({valueDistrict: e.target.value}, () => {
            axios.get(API_LIST_URL+ 'districts/' + this.state.valueDistrict +'/villages')
            .then(res => {
                let listVillage = res.data
                this.setState({listVillage, 
                    statusVillage: true,
                    activeVillage: false
                })
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })

        if( e.target.value !== '' ){
            this.setState({activeDistrict: true})
        }
        else{
            this.setState({activeDistrict: false})
        }
    }

    handleChangeVillage(e){
        //get list vilage
        this.setState({valueVillage: e.target.value}, () => {
            console.log(this.state.valueVillage)
        })

        if( e.target.value !== '' ){
            this.setState({activeVillage: true})
        }
        else{
            this.setState({activeVillage: false})
        }
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
        
        if ( this.state.error_pos && this.state.error_hp && this.state.error_ktp ) {
            axios.put(API_URL + 'update', {
                name: document.getElementById('name').value,
                image: document.getElementById('image').value,
                ktp_number: document.getElementById('no_ktp').value,
                phone_number: document.getElementById('no_hp').value,
                birth_place: document.getElementById('birth_place').value,
                birth_date: this.state.datepicker === this.state.now ? this.state.birth_date : this.state.datepicker,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                pos_code: document.getElementById('postcode').value,
                village_id: this.state.valueVillage ? this.state.valueVillage : this.state.location.village_id,
                bank_id: this.state.bankId ? this.state.bankId : this.state.bank_id,
                account_name: document.getElementById('bank-owner-name').value,
                rek_number: document.getElementById('no_rek').value
                
            },
            {
                headers: {
                    'X-AUTH-TOKEN' : this.authToken,
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => {
                const data = res.data
                this.setState({
                    data,
                    toggleSuccess: !this.state.toggleSuccess
                })
            })
            .catch((error) => {
                if (error.response.status === 400){
                    let resData = error.response.data

                    if ( Array.isArray(resData) ){
                        let errorMessage = error.response.data[0].message
                        this.setState({
                            error: true,
                            errorMessage
                        })
                    }
                    else{
                        let errorMessage = error.response.data
                        this.setState({
                            error: true,
                            errorMessage
                        })
                    }
                }
            })
        }
    }

    handleSuccessDismiss(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess
        })
        window.location.reload()
    }

    renderPopupSuccess(){
        if(this.state.toggleSuccess){
            return (
                <Success 
                message="Data profil berhasil diupdate"
                toggleSuccessPopup={this.handleSuccessDismiss} 
            />
            )
        }
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
                location = res.data.location,
                pos_code = res.data.pos_code,
                bank = res.data.bank ? res.data.bank : null,
                bank_id = res.data.bank ? res.data.bank.bank_id : ''
                
                
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
                pos_code,
                bank,
                bank_id,
                status: true
            })
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
                {this.renderPopupSuccess()}
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Edit Akun"/>
                    <div className="edit-akun">
                     {this.state.status ? (
                        <form onSubmit={this.handleSubmit} >
                            <div className="content-top">
                                <div className="box-picture">
                                    <div className="picture-wrapper">
                                       <img className="image-profile" src={this.state.image !=null ? this.state.image : "../images/user-img.png" } alt=""/>
                                       <div className="hidden-hover">
                                            <img src="../images/icon/icon_image.png" />
                                            <span>Ganti Foto</span>
                                        </div>
                                        <input id="uploadFile" type="file" onChange={this.onChangeInputFile}/>
                                        <input id="image" type="hidden" value={this.state.image_res ? this.state.image_res : this.state.image}/>
                                    </div>
                                </div>
                                <div className="box-profile-form">
                                    <div className="sub-box">
                                       <p className="strong">Profil</p>
                                        {   this.state.error ? 
                                            <p className="text-danger mg-b-10 mg-t-10">{ this.state.errorMessage }</p>
                                            :
                                            null
                                        }
                                        <div className="row-flex">
                                            <div className="box-1">
                                                <InputForm
                                                inputId="name"
                                                defaultValue={this.state.name}
                                                handleChange={this._handleChange}
                                                placeholder="Nama user"
                                                type="text" class="form-control"/>
                                                <InputForm
                                                inputId="no_ktp"
                                                classError={this.state.error_ktp ? "input-form" : "input-form error"}
                                                class={this.state.error_ktp ? "form-control" : "form-control has-error"}
                                                defaultValue={this.state.ktp_number}
                                                handleChange={this._handleChange}
                                                placeholder="Nomor KTP"
                                                errorMessage="Harus 16 digit angka"
                                                type="text" class="form-control"/>
                                                <InputForm
                                                inputId="no_hp"
                                                classError={this.state.error_hp ? "input-form" : "input-form error"}
                                                class={this.state.error_hp ? "form-control" : "form-control has-error"}
                                                defaultValue={this.state.phone_number}
                                                handleChange={this._handleChange}
                                                placeholder="Nomor HP"
                                                errorMessage="Numeric minimum 10 digit angka"
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
                                    <div className="sub-box">
                                        <p className="strong">Rekening Bank</p>
                                        <div className="row-flex">
                                         <div className="box-1">
                                            <InputForm
                                                inputId="no_rek"
                                                handleChange={this._handleChange}
                                                placeholder="No. Rek"
                                                type="text" class="form-control"
                                                defaultValue={this.state.bank  !== null ? this.state.bank.rek_number : ''}
                                                />
                                                <div className="select-wrapper bank">
                                                    <select id="bank-name" className="form-control select-option input-sm text-color" value={this.state.value}
                                                    onChange={this.handleChangeBank}>
                                                        {   this.state.bank !== null ? 
                                                            <option value={this.state.bank.bank_id} >{this.state.bank.bank_name}</option>
                                                            :
                                                            <option value=''>Pilih Bank</option>
                                                        }
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
                                                <InputForm
                                                    inputId="bank-owner-name"
                                                    handleChange={this._handleChange}
                                                    placeholder="Atas Nama"
                                                    type="text" class="form-control"
                                                    defaultValue={this.state.bank !== null ? this.state.bank.account_name : ''}
                                                />
                                         </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-bottom">
                                <div className="box-alamat">
                                    <p className="strong">Alamat</p>
                                    <TextArea
                                    idtextarea="address" defaultValue={this.state.address} title="Masukkan nama jalan/kampung dst..." class="form-control color-text"/>
                                    <div className="row-flex">
                                        <div className="select-wrapper">
                                           
                                             <select id="provinsi" className="text-color form-control select-option input-sm" value={this.state.value}
                                             onChange={this.handleChangeProvince}>
                                                { this.state.location ? 
                                                  <option value={this.state.location.province_id} >{this.state.location.province}</option>
                                                  :
                                                  <option value="">Provinsi</option>
                                                }
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
                                             <select id="kabupaten" className={ this.state.activeCities ? "text-color form-control select-option input-sm" : "form-control select-option input-sm" } value={this.state.value}
                                             onChange={this.handleChangeCities}>
                                                { this.state.location ?
                                                   <option value={this.state.location.city_id} >{this.state.location.city}</option> 
                                                   :
                                                   <option value="">Kabupaten/Kota</option>
                                                }
                                                
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
                                             <select id="kecamatan" className={ this.state.activeDistrict ? "text-color form-control select-option input-sm" : "form-control select-option input-sm" } value={this.state.value}
                                             onChange={this.handleChangeDistricts}>
                                                { this.state.location ?
                                                   <option value={this.state.location.ditsrict_id} >{this.state.location.district}</option>
                                                   :
                                                   <option value="">Kecamatan</option>
                                                }
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
                                            <select id="kelurahan" className={ this.state.activeVillage ? "text-color form-control select-option input-sm" : "form-control select-option input-sm" } value={this.state.value}
                                             onChange={this.handleChangeVillage}>
                                                { this.state.location ?
                                                   <option value={this.state.location.village_id} >{this.state.location.village}</option>
                                                   :
                                                   <option value="">Kelurahan</option>
                                                }
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
                                            defaultValue={this.state.pos_code}
                                            classError={this.state.error_pos ? "input-form" : "input-form error"}
                                            class={this.state.error_pos ? "form-control" : "form-control has-error"}
                                            inputId="postcode"
                                            handleChange={this._handleChange}
                                            placeholder="Kode Pos"
                                            errorMessage="Harus 5 digit angka"
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