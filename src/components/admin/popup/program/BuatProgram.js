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

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class BuatProgram extends Component {
    constructor(props) {
        super(props)
        autoBind(this)

        this.state = {
            listCategories: {},
            listModel: {},
            listInvest: {},
            listRule: {},
            startDate: '',
            endDate: ''
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleChangeCategories(e){
        this.setState({valueCategories: e.target.value}, () => {
            console.log(this.state.valueVillage)
        })
    }

    formatDate(date){
        return moment(date).format('YYYY-MM-DD')
    }

     handleChangeModel(e){
        this.setState({valueModel: e.target.value}, () => {

            axios.get(API_URL+ 'programs/business_model/' + this.state.valueModel+'/business_rule',
                {
                headers: {
                    'X-AUTH-TOKEN' : this.authToken,
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => {
                let listRule = res.data
                this.setState({
                    listRule, 
                    listStatusRule: true,
                })
                console.log(this.state.valueModel)
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
    }

     handleChangeRule(e){
        this.setState({valueRule: e.target.value}, () => {
            console.log(this.state.valueRule)
        })
    }

     handleChangeInvest(e){
        this.setState({valueInvest: e.target.value}, () => {
            console.log(this.state.valueInvest)
        })
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        })
    }

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        })
    }

     handleSubmit(e){
        // const doc = document.getElementById
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'programs', {
            program_ticket_id: this.props.id_tiket,
            title: document.getElementById('title').value,
            program_category_id: this.state.valueCategories,
            start_date: this.formatDate(this.state.startDate),
            end_date: this.formatDate(this.state.endDate),
            business_rule_id: this.state.valueRule,
            tagline: document.getElementById('tagline').value,
            reason: document.getElementById('reason').value,
            minimum_invest: this.state.valueInvest,
            link_video: document.getElementById('link').value
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
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

     componentDidMount(){
        console.log(this.props.id_tiket)
        axios.get(API_URL+ 'programs/categories?type=Investasi',
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            let listCategories = res.data
            this.setState({
                listCategories,
                listStatus: true
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

        axios.get(API_URL+ 'programs/business_model',
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            let listModel = res.data
            this.setState({
                listModel,
                listStatusModel: true
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

        axios.get(API_URL+ 'programs/minimum_invest',
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            let listInvest = res.data
            this.setState({
                listInvest,
                listStatusInvest: true
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }


    render() {
        let {
            listCategories,
            listStatus,

            listModel,
            listStatusModel,

            listInvest,
            listStatusInvest,

            listRule,
            listStatusRule
        } = this.state
        return (
            <div className="add-popup">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Buat Program</p>
                            <p className="sub-title">Silahkan lengkapi profile program investasi Anda.</p>
                            <div className="row-flex col-2 mg-t-10">
                                <InputForm
                                    inputId="title" 
                                    type="text"
                                    placeholder="Judul Program"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm" value={this.state.value} onChange={this.handleChangeCategories}>
                                        <option value="">Kategori</option>
                                        {listStatus ?
                                            listCategories.map(listcategories => 
                                                <option
                                                    key={listcategories.id}
                                                    value={listcategories.id}>
                                                    {listcategories.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row-flex col-2 mg-t-10">
                                <div className="input-form">
                                    <DatePicker 
                                        dateFormat="YYYY-MM-DD"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        selectsStart
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        readOnly={true}
                                        selected={this.state.startDate} 
                                        onChange={this.handleChangeStart} 
                                        className="form-control"
                                        placeholderText="Periode mulai"
                                        yearDropdownItemNumber={50}
                                    />
                                    <img src="../images/icon/button_icon/icon-datepicker.svg" className="icon-form"/>
                                </div>
                                <div className="input-form mg-r-0">
                                    <DatePicker 
                                        dateFormat="YYYY-MM-DD"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        readOnly={true}
                                        selected={this.state.endDate} 
                                        onChange={this.handleChangeEnd} 
                                        className="form-control"
                                        placeholderText="Periode berakhir"
                                        yearDropdownItemNumber={50}
                                    />
                                    <img src="../images/icon/button_icon/icon-datepicker.svg" className="icon-form"/>
                                </div>
                            </div>

                            <div className="row-flex col-2 mg-t-10">
                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm" value={this.state.value} onChange={this.handleChangeModel}>
                                        <option value="">Model Bisnis</option>
                                        {listStatusModel ?
                                            listModel.map(listmodel => 
                                                <option
                                                    key={listmodel.business_model_id}
                                                    value={listmodel.business_model_id}>
                                                    {listmodel.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>
                            <TextArea idtextarea="tagline" title="Jelaskan secara singkat program anda, tidak lebih dari 140 karakter.
								Penjelasan ini untuk membantu kami mempromosikan program anda." class="form-control"/>

							<TextArea idtextarea="reason" title="Jelaskan dampak atau perubahan yang diharapkan" class="form-control"/>

							<div className="row-flex col-2 mg-t-10">
                                <div className="select-wrapper mg-r-10">
                                     <select className="form-control select-option input-sm" value={this.state.value} onChange={this.handleChangeRule}>
                                        <option value="">Ketentuan Model Bisnis</option>
                                        {listStatusRule ?
                                            listRule.map(listrule => 
                                                <option
                                                    key={listrule.business_rule_id}
                                                    value={listrule.business_rule_id}>
                                                    {listrule.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>

                                <div className="select-wrapper">
                                     <select className="form-control select-option input-sm" value={this.state.value} onChange={this.handleChangeInvest}>
                                        <option value="">Minimal Pemberian Dana</option>
                                        {listStatusInvest ?
                                            listInvest.map(listinvest => 
                                                <option
                                                    key={listinvest.value}
                                                    value={listinvest.value}>
                                                    {listinvest.name}
                                                </option>
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="row-flex col-2 mg-t-10">
                                <InputForm 
                                    inputId="link"
                                    type="text"
                                    placeholder="Link Video Youtube (Jika ada)"
                                    class="form-control"
                                    handleChange={this._handleChange}
                                />
                            </div>
                            
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Buat Program" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleBuatProgram}>
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

export default BuatProgram;
