import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import TambahPetani from './popup/data-petani/TambahPetani'
import SearchPetani from './popup/data-petani/searchPetani'
import PhoneFound from './popup/data-petani/phoneFound'
import PhoneNotFound from './popup/data-petani/phoneNotFound'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

export default class RekapKegiatan extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            toggleDropdownFilter: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userId = Cookie.load('user_id')
    }

    handleSearch(id, value){
        console.log('ini value: '+value)

        axios.get(API_URL + '/activities/'+this.userId+'/history?page=0&size=10&text='+ value,{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data !== '' ? res.data.content : true
            const totalPage = res.data.totalPages
            const totalElements = res.data.totalElements
            const totalsize = res.data.size
            this.setState({dataHere})
            this.setState({totalPage})
            this.setState({totalElements})
            this.setState({totalsize})
        })
        .catch((error) => {
            this.setState({
                totalElements: false,
                searchNull: false
            })
        })
    }

    handleChangeEntriPage(e){
        console.log('value: '+ e.target.value)
        const valueEntri = e.target.value

        axios.get(API_URL + '/activities/'+this.userId+'/history?page=0&size='+ valueEntri +'&text=',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data !== '' ? res.data.content : true
            const totalPage = res.data.totalPages
            const totalElements = res.data.totalElements
            const totalsize = res.data.size
            this.setState({dataHere})
            this.setState({totalPage})
            this.setState({totalElements})
            this.setState({totalsize})
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

    }

    handlePageClick(dataHere){
        console.log('clicked')
        let selected = dataHere.selected
        console.log(selected)

        axios.get(API_URL + '/activities/'+this.userId+'/history?page='+ selected +'&size=10&text=',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data !== '' ? res.data.content : true
            const totalPage = res.data.totalPages
            const totalElements = res.data.totalElements
            const totalsize = res.data.size
            this.setState({dataHere})
            this.setState({totalPage})
            this.setState({totalElements})
            this.setState({totalsize})
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    toggleDropdownFilter(){
        this.setState({
            toggleDropdownFilter: !this.state.toggleDropdownFilter
        })
    }

    renderDropdownFilter(){
        if(this.state.toggleDropdownFilter){
            return(
                <div className="dropdown-collapse">
                    <div className="row-flex col-2">
                        <InputForm
                        handleChange={this._handleChange}
                        placeholder="Tanggal Kegiatan"
                        type="text" 
                        class="form-control" 
                        icon="true" 
                        src="../images/icon/button_icon/icon-datepicker.svg"/>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Model Bisnis</option>
                            </select>
                        </div>
                    </div>
                    <div className="row w-100">
                         <InputForm
                            handleChange={this._handleChange}
                            placeholder="Ketik nama atau ID Kelompok Tani…"
                            type="text" 
                            class="form-control" />
                    </div>
                    <div className="row w-100 mg-b-10">
                        <InputForm
                            handleChange={this._handleChange}
                            placeholder="Ketik nama Petani…"
                            type="text" 
                            class="form-control" />
                    </div>
                    <div className="pull-left">
                        <div className="box-btn" onClick={this.handleFilter}>
                            <ButtonPrimary name="Filter" />
                        </div>
                    </div>
                </div>
            )
        }
    }


    componentDidMount(){
        axios.get(API_URL + '/activities/'+this.userId+'/history?page=0&size=10&text=',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data !== '' ? res.data.content : true
            const totalPage = res.data.totalPages
            const totalElements = res.data.totalElements
            const totalsize = res.data.size
            this.setState({dataHere})
            this.setState({totalPage})
            this.setState({totalElements})
            this.setState({totalsize})
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render(){
        const DataHere = this.state.dataHere

        return(
            <div id="outer-container">
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Rekap Kegiatan Petani" />
                    {
                        DataHere ? 
                        <div className="user-access">
                            {
                                this.state.totalElements ? 
                                (
                                    <div className="user-access-container">
                                        <div className="box-top row-flex flex-space">
                                            <div className="pull-left row-flex">
                                                <p className="count-item">{ this.state.totalElements ? this.state.totalElements : '0' } Rekap Kegiatan Petani</p>
                                                <div className="select-wrapper">
                                                    <select className="per-page option-input" value={ this.state.value } onChange={ this.handleChangeEntriPage }>
                                                        <option value="10">10 entri per halaman</option>
                                                        <option value="25">25 entri per halaman</option>
                                                        <option value="50">50 entri per halaman</option>
                                                        <option value="100">100 entri per halaman</option>
                                                    </select>
                                                </div>
                                                <InputForm
                                                inputId="search_admin"
                                                handleChange={this.handleSearch}
                                                placeholder="Cari.."
                                                class="search-item form-control"
                                                type="text"/>
                                                {/*
                                                <div className="select-wrapper dropdown">
                                                    <a className="dropdown-filter" onClick={this.toggleDropdownFilter}>
                                                        Filter
                                                    </a>
                                                    {this.renderDropdownFilter()}
                                                </div>
                                                */}
                                            </div>
                                        </div>

                                        <div className="box-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Kelompok Tani</th>
                                                        <th>Nama Petani</th>
                                                        <th>Program</th>
                                                        <th>Tanggal Kegiatan</th>
                                                        <th>Kegiatan</th>
                                                        <th>Rincian Kegiatan</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {DataHere.map((datahere, i) => {
                                                        return(
                                                            <tr key={i}>
                                                                <td data-th="Kelompok Tani">{datahere.farmer_group_name}</td>
                                                                <td data-th="Nama Petani">{datahere.farmer_name}</td>
                                                                <td data-th="Program">{datahere.program}</td>
                                                                <td data-th="Tanggal Kegiatan">{datahere.activity_date}</td>
                                                                <td data-th="Kegiatan">{datahere.activity}</td>
                                                                <td data-th="Rincian Kegiatan">{datahere.detail_activity}</td>
                                                                <td data-th="Status" className="text-center">{datahere.status}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="box-footer-table">
                                            <div className="footer-table">
                                                <p className="text-footer">Menampilkan {this.state.totalElements >=10 ? this.state.totalsize : this.state.totalElements} entri dari {this.state.totalElements} Rekap Kegiatan Petani</p>
                                            </div>

                                            <div className="box-pagination">
                                                <div className="pagination-content">
                                                    < ReactPaginate
                                                        previousLabel={
                                                            <div className="box-lable">
                                                                <img src="/images/icon/button_icon/icon_arrow_left.png" />
                                                            </div>
                                                        }
                                                        nextLabel={
                                                            <div className="box-lable">
                                                                <img src="/images/icon/button_icon/icon_arrow_right.png" />
                                                            </div>
                                                        }
                                                        breakLabel={<a href="">...</a>}
                                                        breakClassName={"break-me"}
                                                        pageCount={this.state.totalPage}
                                                        marginPagesDisplayed={1}
                                                        pageRangeDisplayed={2}
                                                        onPageChange={this.handlePageClick}
                                                        containerClassName={"pagination"}
                                                        subContainerClassName={"pages pagination"}
                                                        activeClassName={"active"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    this.state.searchNull ?

                                    <div className="user-access-container text-center no-content">
                                        <img src="../images/empty_state.svg" alt="" height="180"/>
                                        <h3 className="mg-t-20 normal">Data rekap kegiatan petani masih kosong</h3>
                                    </div>

                                    :
                                    
                                    <div className="user-access-container">
                                        <div className="box-top row-flex flex-space">
                                            <div className="pull-left row-flex">
                                                <p className="count-item">30 Lahan Petani</p>
                                                <div className="select-wrapper">
                                                    <select className="per-page option-input" value={ this.state.value } onChange={ this.handleChangeEntriPage }>
                                                        <option value="10">10 entri per halaman</option>
                                                        <option value="25">25 entri per halaman</option>
                                                        <option value="50">50 entri per halaman</option>
                                                        <option value="100">100 entri per halaman</option>
                                                    </select>
                                                </div>
                                                <InputForm
                                                inputId="search_admin"
                                                handleChange={this.handleSearch}
                                                placeholder="Cari.."
                                                class="search-item form-control"
                                                type="text"/>
                                                {/*
                                                <div className="select-wrapper dropdown">
                                                    <a className="dropdown-filter" onClick={this.toggleDropdownFilter}>
                                                        Filter
                                                    </a>
                                                    {this.renderDropdownFilter()}
                                                </div>
                                                */}
                                            </div>
                                        </div>

                                        <div className="box-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Kelompok Tani</th>
                                                        <th>Nama Petani</th>
                                                        <th>Program</th>
                                                        <th>Tanggal Kegiatan</th>
                                                        <th>Kegiatan</th>
                                                        <th>Rincian Kegiatan</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center normal" colSpan="7">Tidak ada data</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="box-footer-table">
                                            <div className="footer-table">
                                                <p className="text-footer">Menampilkan 0 Rekap Kegiatan Petani</p>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                        :
                        <div className="user-access">
                            <div className="user-access-container text-center no-content">
                                <img src="../images/loading.gif" alt=""/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}