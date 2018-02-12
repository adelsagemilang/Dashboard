import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import TambahTiketProgram from './popup/tiket-program/TambahTiketProgram'
import HapusData from './popup/common-popup/HapusData'
import Success from './popup/common-popup/Success'
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'
import ResponsiveHeader from '../common/ResponsiveHeader'

export default class TiketProgram extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            classBgColor: '',
            toggleTambahTiket: false,
            toggleSuccess: false,
            toggleDeletePopup: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    toggleSuccessPopup(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess
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

    renderPopupDelete(){
        if (this.state.toggleDeletePopup){
            return (
                <HapusData 
                    title="Hapus Tiket Program"
                    url={'programs/program_tickets/delete/'+this.state.id}
                    name={this.state.title}
                    farmerId={this.state.id}
                    handleDelete={this.handleDelete} 
                    toggleDeletePopup={this.toggleDeletePopup} 
            />
            )
        }
    }

    toggleDeletePopup(){
        this.setState({
            toggleDeletePopup : !this.state.toggleDeletePopup
        })
    }

    handleDelete(id, title){
        this.setState({
            id: id,
            title: title,
            toggleDeletePopup: !this.state.toggleDeletePopup
        })
    }

    handleSuccessDismiss(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess,
            toggleTambahTiket: false
        })
        window.location.reload()
    }

    handleSearch(id, value){
        console.log('ini value: '+value)

        axios.get(API_URL + 'programs/program_tickets?page=0&size=10&text=' + value,{
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

        axios.get(API_URL + 'programs/program_tickets?page=0&size=' + valueEntri + '&text=',{
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

        axios.get(API_URL + 'programs/program_tickets?page='+ selected +'&size=10&text=',{
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


    toggleTambahTiket(){
        this.setState({
            toggleTambahTiket : !this.state.toggleTambahTiket
        })
    }

    renderPopupTambahTiket(){
        let { toggleTambahTiket } = this.state

        if( toggleTambahTiket === true ){
            return (
                <TambahTiketProgram success={this.toggleSuccessPopup} toggleTambahTiket={this.toggleTambahTiket} />
            )
        }
        else{
            return null;
        }
    }

    handleCancel(){
        console.log('canceled')
        this.setState({
            toggleTambahTiket: false
        })
    }

    componentDidMount(){
        console.log(this.authToken)
        axios.get(API_URL + 'programs/program_tickets?page=0&size=10&text=',{
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

        axios.get(API_URL + 'programs/program_tickets/count_program_tickets',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const data = res.data
            console.log(data)
            this.setState({
                count_accepted_program: data.accept,
                count_added_program: data.waiting,
                count_rejected_program: data.reject
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
                {this.renderPopupTambahTiket()}
                {this.renderPopupSuccess()}
                {this.renderPopupDelete()}
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Tiket Program" />
                    {
                    DataHere ?
                        <div className="user-access tiket-program">
                        {   this.state.totalElements ?
                            (

                                <div className="user-access-container">
                                    <div className="box-status row-flex">
                                        <div className="col-3 text-center">
                                            <h3 className="text-success">{this.state.count_accepted_program ? this.state.count_accepted_program : '0'}</h3>
                                            <p>Disetujui</p>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h3 className="text-info">{this.state.count_added_program ? this.state.count_added_program : '0'}</h3>
                                            <p>Menunggu Persetujuan</p>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h3 className="text-danger">{this.state.count_rejected_program ? this.state.count_rejected_program : '0'}</h3>
                                            <p>Ditolak</p>
                                        </div>
                                    </div>
                                    <div className="box-top row-flex flex-space">
                                        <div className="pull-left row-flex col-5">
                                            <p className="count-item"> { this.state.totalElements ? this.state.totalElements : '0' } Tiket Program</p>
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
                                            <div className="select-wrapper">
                                                 <select className="option-input">
                                                    <option value="">Status</option>
                                                </select>
                                            </div>
                                            */}
                                        </div>
                                        <div className="pull-right">
                                            <div className="box-btn auto" onClick={this.toggleTambahTiket}>
                                                <ButtonPrimary name="Tambah Tiket" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Kode Tiket</th>
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
                                                            <td data-th="Kode Tiket" className="strong">{ datahere.code }</td>
                                                            <td data-th="Judul Program">{ datahere.title }</td>
                                                            <td data-th="Penjelasan Singkat">{ datahere.description }</td>
                                                            <td data-th="Tanggal Pengajuan">{ datahere.date }</td>
                                                            <td data-th="Status">{ datahere.status }</td>
                                                            <td data-th="Pengguna" className="text-center">{ datahere.user === null ? '-' : datahere.user }</td>
                                                             <td data-th="Aksi">
                                                                <div className="row-flex flex-center">
                                                                     <div className="box-btn" onClick={this.handleDelete.bind(this,datahere.id,datahere.title)}>
                                                                         <ButtonIcon class="btn-red-sm" icon="icon-delete"/>
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
                                            <p className="text-footer">Menampilkan {this.state.totalElements >=10 ? this.state.totalsize : this.state.totalElements} entri dari {this.state.totalElements} Tiket Progam</p>
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
                                (
                                    <div className="user-access-container text-center no-content">
                                        <img src="../images/empty_state.svg" alt="" height="180"/>
                                        <h3 className="mg-t-20 normal">Data tiket program masih kosong</h3>
                                        <div className="box-btn auto mg-t-40" onClick={this.toggleTambahTiket}>
                                            <ButtonPrimary name="Tambah Tiket" />
                                        </div>
                                     </div>
                                )
                                :
                                (
                                    <div className="user-access-container">
                                        <div className="box-status row-flex">
                                            <div className="col-3 text-center">
                                                <h3 className="text-success">{this.state.count_accepted_program}</h3>
                                                <p>Disetujui</p>
                                            </div>
                                            <div className="col-3 text-center">
                                                <h3 className="text-info">{this.state.count_added_program}</h3>
                                                <p>Menunggu Persetujuan</p>
                                            </div>
                                            <div className="col-3 text-center">
                                                <h3 className="text-danger">{this.state.count_rejected_program}</h3>
                                                <p>Ditolak</p>
                                            </div>
                                        </div>
                                        <div className="box-top row-flex flex-space">
                                            <div className="pull-left row-flex col-5">
                                                <p className="count-item"> 0 Tiket Program</p>
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
                                                <div className="select-wrapper">
                                                     <select className="option-input">
                                                        <option value="">Status</option>
                                                    </select>
                                                </div>
                                                */}
                                            </div>
                                            <div className="pull-right">
                                                <div className="box-btn auto" onClick={this.toggleTambahTiket}>
                                                    <ButtonPrimary name="Tambah Tiket" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Kode Tiket</th>
                                                        <th>Judul Program</th>
                                                        <th>Penjelasan Singkat</th>
                                                        <th>Tanggal Pengajuan</th>
                                                        <th>Status</th>
                                                        <th>Pengguna</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center normal" colSpan="7">Data tidak ditemukan</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="box-footer-table">
                                            <div className="footer-table">
                                                <p className="text-footer">Menampilkan 0 Tiket Progam</p>
                                            </div>

                                        </div>
                                    </div>
                                )
                                 
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