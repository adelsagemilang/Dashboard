import React, { Component, PropTypes } from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import TagsInput from 'react-tagsinput'
import InputForm from '../../../common/InputForm'
import TextArea from '../../../common/TextArea'
import MultiSelect from '../../../common/MultiSelect'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, API_LIST_URL, TK_KEY } from '../../../../containers/RootUrl'
import Select from 'react-select';
import 'react-select/dist/react-select.css';


export default class TambahLahan extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            listProvince: {},
        	tagsPenyakit: [],
        	tagsHama: [],
            activeProvince: false,
            activeCities: false,
            activeDistrict: false,
            activeVillage: false,
            valueMulti: [],
            error: false

        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
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
            console.log(this.state.valueFarmer)
        })
    }

    handleChangeMulti(value) {
        this.setState({ valueMulti: value },function(){
            console.log('You have selected: ', this.state.valueMulti);
        })
    } 

    handleChangeStatus(e){
        //get list vilage
        this.setState({status_lahan: e.target.value}, () => {
            console.log(this.state.status_lahan)
        })
    }

    handleChangeTagsPenyakit(tagsPenyakit) {
	   this.setState({tagsPenyakit},function(){
        var stringy = JSON.stringify(this.state.tagsPenyakit).replace(/['"\[\]]+/g,"").replace(/[,]/g,", ");
        console.log(stringy);
       })
	 }

	 handleChangeTagsHama(tagsHama){
	 	this.setState({tagsHama})
	 }

     logChange(val) {
      console.log("Selected: " + JSON.stringify(val));
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

        if( e.target.value !== '' ){
            this.setState({activeProvince: true})
        }
        else{
            this.setState({activeProvince: false})
        }
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

    handleSubmit(e){
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'lands', {
            farmer_id: this.state.valueFarmer,
            land_status_id: this.state.status_lahan,
            village_id: this.state.valueVillage,
            name: document.getElementById('nama-lahan').value,
            large: document.getElementById('large').value,
            height: document.getElementById('height').value,
            pest: JSON.stringify(this.state.tagsHama).replace(/['"\[\]]+/g,"").replace(/[,]/g,", "),
            disease: JSON.stringify(this.state.tagsPenyakit).replace(/['"\[\]]+/g,"").replace(/[,]/g,", "),
            irigation: document.getElementById('irigation').value,
            address: document.getElementById('address').value,
            pos_code: document.getElementById('postcode').value,
            commodities: this.state.valueMulti
            
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
            window.location.reload();
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

    componentDidMount(){
        axios.get(API_URL + 'lands/land_status',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const statusLahan = res.data
            this.setState({
                statusLahan,
                listStatusLahan: true,
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

        axios.get(API_LIST_URL + 'commodity_categories/-1/commodities2',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
           const dataComodity = res.data

           this.setState({
                dataComodity
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

    render(){
        const { 

            listStatusLahan,
            statusLahan,

            list_rukman,
            listrukman,

            list_farmer,
            listfarmer,

            listStatus,
            listProvince,

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
                            <p className="title">Tambah Lahan</p>
                            <p className="sub-title">Silakan masukkan lahan petani dengan benar.</p>
                            {   this.state.error ? 
                                <p className="text-danger mg-b-10 mg-t-10">{this.state.errorMessage}</p>
                                :
                                null
                            }
                            <div className="row-flex col-2">
                                <InputForm 
                                    inputId="nama-lahan"
                                    type="text"
                                    placeholder="Nama Lahan"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <div className="select-wrapper">
                                     <select id="land_status" className="form-control select-option input-sm mg-r-0" value={ this.state.value } onChange={this.handleChangeStatus}>
                                        <option value="">Status Lahan</option>
                                        {listStatusLahan ?
                                            statusLahan.map(status => 
                                                <option
                                                    key={status.land_status_id}
                                                    value={status.land_status_id}>
                                                    {status.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
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
                            <div className="row-flex col-2">
                                <InputForm 
                                    inputId="large"
                                    type="text"
                                    placeholder="Luas"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <InputForm 
                                    inputId="height"
                                    type="text"
                                    placeholder="Ketinggian"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <div className="row-flex col-2">
                            	<div className="tag-wrapper">
									<TagsInput
                                        ref="tagsPenyakit" 
                                        value={this.state.tagsPenyakit} 
                                        onChange={this.handleChangeTagsPenyakit} 
                                        inputProps={{ placeholder: 'Penyakit Dominan' }} 
                                        preventSubmit= {false}
                                    />
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
                                    inputId="irigation"
                                    type="text"
                                    placeholder="Sumber Pengairan"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            <p className="strong">Lokasi Lahan</p>
                            <TextArea idtextarea="address" title="Masukkan nama jalan/kampung dst..." class="form-control"/>
                            <div className="row-flex col-3">
                                <div className="select-wrapper">
                                     <select id="provinsi" className={ this.state.activeProvince ? "text-color form-control select-option input-sm" : "form-control select-option input-sm" } value={this.state.value}
                                     onChange={this.handleChangeProvince}>
                                        <option value="">Provinsi</option>
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
                                        <option value="">Kabupaten/Kota</option>
                                        
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
                                        <option value="">Kecamatan</option>
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
                            <div className="row-flex col-3">
                                <div className="select-wrapper">
                                    <select id="kelurahan" className={ this.state.activeVillage ? "text-color form-control select-option input-sm" : "form-control select-option input-sm" } value={this.state.value}
                                     onChange={this.handleChangeVillage}>
                                        <option value="">Kelurahan</option>
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
                                    inputId="postcode"
                                    handleChange={this._handleChange}
                                    placeholder="Kode Pos"
                                    type="text" class="form-control"/>
                            </div>
                            <p className="strong">Komoditas</p>
                            <div className="tag-wrapper w-100">
								<MultiSelect value={this.state.valueMulti} handleChange={this.handleChangeMulti} data={this.state.dataComodity} />
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