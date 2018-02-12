import React, { Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import Success from './popup/common-popup/Success'
import TambahProgram from './popup/program/TambahProgram'
import BuatProgram from './popup/program/BuatProgram'
import HapusProgram from './popup/program/HapusProgram'
import DropdownMenu from './dropdown-menu'
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'
import ResponsiveHeader from '../common/ResponsiveHeader'

export default class Program extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            classBgColor: '',
            toggleTambahProgram: false,
            toggleBuatProgram: false,
            toggleHapusProgram: false,
            toggleTolakProgram: false,
            toggleDropdownFilter: false,
            toggleSuccess: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    toggleSuccessPopup(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess,
            toggleHapusProgram: false,
            toggleTolakProgram: false
        })
    }

    HapusProgram(id, name){
        this.setState({
            id_program: id,
            name: name,
            toggleHapusProgram: true
        })
    }

    TolakProgram(id, name){
        this.setState({
            id_program: id,
            name: name,
            toggleTolakProgram: true
        })
    }

    renderPopupSuccess(){
        if(this.state.toggleSuccess){
            return (
                <Success 
                toggleSuccessPopup={this.handleSuccessDismiss} 
            />
            )
        }
    }

    handleSuccessDismiss(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess,
            toggleBuatProgram: false
        })
        window.location.reload()
    }


    handleSearch(id, value){
        console.log('ini value: '+value)

        axios.get(API_URL + 'programs?page=0&size=10&text=' + value,{
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

        axios.get(API_URL + 'programs?page=0&size=' + valueEntri + '&text=',{
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
            
            console.log('total page: '+totalPage)
            console.log('data here: '+
            dataHere.map( datas => {
                return datas.email
            }))
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

    }

    handlePageClick(dataHere){
        console.log('clicked')
        let selected = dataHere.selected
        console.log(selected)

        axios.get(API_URL + 'programs?page='+ selected +'&size=10&text=',{
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

            console.log('total page: '+totalPage)
            console.log('data here: '+
            dataHere.map( datas => {
                return datas.email
            }))
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    getResTambah(data){
        this.setState({
            res_tambah: data
        })
    }


    toggleTambahProgram(){
        this.setState({
            toggleTambahProgram : !this.state.toggleTambahProgram
        })
    }

    toggleBuatProgram(){
        this.setState({
            toggleBuatProgram : !this.state.toggleBuatProgram
        })
    }

    renderPopupTambahProgram(){

        if( this.state.toggleTambahProgram ){
            return (
                <TambahProgram
                    toggleBuatProgram={this.toggleBuatProgram} 
                    toggleTambahProgram={this.toggleTambahProgram}
                    getRes={this.getResTambah}
                />
            )
        }
    }

    toggleDropdownFilter(){
        this.setState({
            toggleDropdownFilter: !this.state.toggleDropdownFilter
        })
    }

    toggleDropdownMenu(i){
        let id = document.getElementById(i)
        let active = document.getElementsByClassName("active")


        if( id.classList.contains("active") ){
            id.classList.remove("active")
        }
        else{
            while (active.length){
                active[0].classList.remove("active")
            }
            id.classList.add("active")
        }
    }

    toggleHapusProgram(){
        this.setState({
            toggleHapusProgram: !this.state.toggleHapusProgram
        })
    }

    toggleTolakProgram(){
        this.setState({
            toggleTolakProgram: !this.state.toggleTolakProgram
        })
    }

    incrementValue()
    {
        let check = document.getElementById('number')

        if (check){
            let value = document.getElementById('number').value 

            if (value != "20"){
                value ++
                document.getElementById('number').value = value
            }
        }
    }

    decrementValue()
    {
        let check = document.getElementById('number')

        if (check){
            var value = document.getElementById('number').value
            value --
            value = value < 0 ? 0 : value
            document.getElementById('number').value = value
        }
    }

    checkValue(){
        console.log()
    }

    renderPopupBuatProgram(){
        if (this.state.toggleBuatProgram){
            return(
                <BuatProgram toggleBuatProgram={this.toggleBuatProgram} dataTambah={this.state.res_tambah}  success={this.toggleSuccessPopup}/>
            )
        }
    }

    renderPopupHapusProgram(){
        if (this.state.toggleHapusProgram){
            return(
                <HapusProgram
                    name={this.state.name} 
                    id_program={this.state.id_program}
                    toggleHapusProgram={this.toggleHapusProgram}
                    success={this.toggleSuccessPopup} 
                />
            )
        }
    }

    renderPopupTolakProgram(){
        if (this.state.toggleTolakProgram){
            return(
                <HapusProgram
                    name={this.state.name} 
                    id_program={this.state.id_program}
                    toggleTolakProgram={this.toggleTolakProgram}
                    success={this.toggleSuccessPopup} 
                    reject="true"
                />
            )
        }
    }

    renderDropdownFilter(){
        if(this.state.toggleDropdownFilter){
            return(
                <div className="dropdown-collapse">
                    <div className="row-flex col-2">
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Tipe Program</option>
                            </select>
                        </div>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Model Bisnis</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2">
                         <InputForm
                            handleChange={this._handleChange}
                            placeholder="Tanggal Pengajuan"
                            type="text" 
                            class="form-control" 
                            icon="true" 
                            src="../images/icon/button_icon/icon-datepicker.svg"/>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Inisiator</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2">
                         <InputForm
                            handleChange={this._handleChange}
                            placeholder="Periode"
                            type="text" 
                            class="form-control" 
                            icon="true" 
                            src="../images/icon/button_icon/icon-datepicker.svg"/>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Kelompok Tani</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2">
                        <div className="input-form row-flex input-plus-min">
                           <button className="buttonmin" type="button" onClick={this.decrementValue}>-</button>
                           <input className="form-control" type="text" id="number" value="0" max onChange={this.checkValue} />
                           <span>Petani</span>
                           <button className="buttonplus" type="button" onClick={this.incrementValue}>+</button>
                        </div>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Biaya</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2 mg-b-10">
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Status</option>
                            </select>
                        </div>
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
        axios.get(API_URL + 'programs?page=0&size=10&text=',{
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

        axios.get(API_URL + 'programs/count_program',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            console.log(res)
            const data = res.data
            this.setState({
                count_accepted_program: data.accept,
                count_added_program: data.draft,
                count_pending_program: data.reject,
                count_rejected_program: data.waiting
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render(){
        const DataHere = this.state.dataHere
        let ClassBgColor = this.state.classBgColor

        return(
            <div id="outer-container">
                {this.renderPopupTambahProgram()}
                {this.renderPopupBuatProgram()}
                {this.renderPopupHapusProgram()}
                {this.renderPopupTolakProgram()}
                {this.renderPopupSuccess()}
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Program" />
                    {
                    DataHere ?
                        <div className="user-access tiket-program">
                        {   this.state.totalElements ?
                            (
                                <div className="user-access-container">
                                    <div className="box-status row-flex">
                                        <div className="col-4 text-center">
                                            <h3 className="text-success">{this.state.count_accepted_program}</h3>
                                            <p>Disetujui</p>
                                        </div>
                                        <div className="col-4 text-center">
                                            <h3 className="text-info">{this.state.count_added_program}</h3>
                                            <p>Menunggu Persetujuan</p>
                                        </div>
                                        <div className="col-4 text-center">
                                            <h3>{this.state.count_pending_program}</h3>
                                            <p>Belum Diajukan</p>
                                        </div>
                                        <div className="col-4 text-center">
                                            <h3 className="text-danger">{this.state.count_rejected_program}</h3>
                                            <p>Ditolak</p>
                                        </div>
                                    </div>
                                    <div className="box-top row-flex flex-space">
                                        <div className="pull-left row-flex col-5">
                                            <p className="count-item">{ this.state.totalElements ? this.state.totalElements : '0' } Tiket Program</p>
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
                                            placeholder="Cari Tiket"
                                            class="search-item form-control"
                                            type="text"/>
                                            {/*
                                            <InputForm
                                            handleChange={this.handleSearch}
                                            placeholder="Tanggal Pengajuan"
                                            class="search-item form-control"
                                            type="text"
                                            icon="true"
                                            src="../images/icon/button_icon/icon-datepicker.svg"/>
                                            <div className="select-wrapper dropdown">
                                                <a className="dropdown-filter" onClick={this.toggleDropdownFilter}>
                                                    Filter
                                                </a>

                                                {this.renderDropdownFilter()}
                                            </div>
                                            */}
                                        </div>
                                        <div className="pull-right">
                                            <div className="box-btn auto" onClick={this.toggleTambahProgram}>
                                                <ButtonPrimary name="Buat Program" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Kode Program</th>
                                                    <th>Judul Program</th>
                                                    <th>Penjelasan Singkat</th>
                                                    <th>Tanggal Pengajuan</th>
                                                    <th>Status</th>
                                                    <th>Pengguna</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {DataHere.map((datahere, i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td data-th="Kode Program" className="strong">{ datahere.code }</td>
                                                            <td data-th="Judul Program">{ datahere.title }</td>
                                                            <td data-th="Penjelasan Singkat">{ datahere.tagline }</td>
                                                            <td data-th="Tanggal Pengajuan">{ datahere.date }</td>
                                                            <td data-th="Status" className="text-center">{ datahere.status === null ? '-' : datahere.status }</td>
                                                            <td data-th="Pengguna" className="text-center">{ datahere.initiator }</td>
                                                             <td>
                                                                <div className="row-flex flex-center">
                                                                     <div className="row-flex flex-center">
                                                                         <div className="box-btn dropdown-three">
                                                                            <div className="pointer" onClick={this.toggleDropdownMenu.bind(this, i) }>
                                                                                <img src="../images/icon/dropdown-three.svg" height="7"/>

                                                                                <DropdownMenu id={i} 
                                                                                    HapusProgram={this.HapusProgram.bind(this, datahere.id, datahere.title)}
                                                                                    TolakProgram={this.TolakProgram.bind(this, datahere.id, datahere.title)}
                                                                                    id_program={ datahere.id }
                                                                                    status={datahere.status_id}
                                                                                    success={this.toggleSuccessPopup}
                                                                                />
                                                                            </div>
                                                                         </div>
                                                                    </div>
                                                                </div>   
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="box-footer-table">
                                        <div className="footer-table">
                                            <p className="text-footer">Menampilkan {this.state.totalElements >=10 ? this.state.totalsize : this.state.totalElements} entri dari {this.state.totalElements} Anggota Kelompok Tani</p>
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
                                 <div className="user-access-container text-center no-content">
                                    <img src="../images/empty_state.svg" alt="" height="180"/>
                                    <h3 className="mg-t-20 normal">Data Program masih kosong</h3>
                                    <div className="box-btn auto mg-t-40" onClick={this.toggleTambahProgram}>
                                        <ButtonPrimary name="Tambah Program" />
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