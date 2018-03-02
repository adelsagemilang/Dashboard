import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_QELISA_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import { Link } from 'react-router-dom'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import InputForm from '../common/InputForm'

import Success from './popup/common-popup/Success'
import HapusData from './popup/common-popup/HapusData'
import SalinRab from './popup/RAB/SalinRab'
import TambahRab from './popup/RAB/TambahRab'

import ReactPaginate from 'react-paginate'

import { hashHistory,withRouter, Redirect, router } from 'react-router';

export default class RAB extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            salinRab: false,
            tambahRab: false,
            toggleSuccess: false,
            toggleDeletePopup: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.user_id = Cookie.load('user_id')
    }

    salinRABSuccess(id){
        this.props.history.push('/admin/rab-detail/'+id);
    }

    handleSearch(id, value){
        axios.get(API_QELISA_URL + 'public/program/rab?page=0&size=10&text=' + value + '&user=',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            },
            auth:{
                username: 'username',
                password: 'password'
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
            this.setState({
                totalElements: false,
                searchNull: false
            })
        })
    }

    handleChangeEntriPage(e){
        const valueEntri = e.target.value

        axios.get(API_QELISA_URL + 'public/program/rab?page=0&size=' + valueEntri + '&text=&user=' ,{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            },
            auth:{
                username: 'username',
                password: 'password'
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

    handleSalinRab(id,name){
    	this.setState({
            id: id,
    		name: name,
    		salinRab: true
    	})
    }

    handleDelete(id, name){
        console.log('delete: ' + id)
        this.setState({
            id: id,
            name: name,
            toggleDeletePopup: !this.state.toggleDeletePopup
        })
    }

    handleSuccessDismiss(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess,
            daftarPetani: false
        })
        window.location.reload()
    }

    toggleSalinRab(){
    	this.setState({
    		salinRab: !this.state.salinRab
    	})
    }

    toggleTambahRab(){
        this.setState({
            tambahRab: !this.state.tambahRab
        })
    }

    toggleSuccessPopup(){
        this.setState({
            toggleSuccess: !this.state.toggleSuccess,
            toggleTambahRab: false
        })
    }

    toggleDeletePopup(){
        this.setState({
            toggleDeletePopup : !this.state.toggleDeletePopup
        })
    }

    renderSalinRab(){
    	if(this.state.salinRab){
    		return <SalinRab 
    					toggleSalinRab={this.toggleSalinRab}
                        id={this.state.id}
    					placeholder={this.state.name}
                        redirect={this.salinRABSuccess}
    				/>
    	}
    }

    renderTambahRab(){
        if(this.state.tambahRab){
            return <TambahRab 
                        success={this.toggleSuccessPopup}
                        toggleTambahRab={this.toggleTambahRab}
                    />
        }
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
                    title="Hapus RAB"
                    url={'public/program/rab/'+this.state.id+'/delete'}
                    name={this.state.name}
                    qelisa={true}
                    toggleDeletePopup={this.toggleDeletePopup} 
            />
            )
        }
    }

    handlePageClick(dataHere){
        let selected = dataHere.selected

        axios.get(API_QELISA_URL + 'public/program/rab?page='+ selected +'&size=10&text=&user=',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            },
            auth:{
                username: 'username',
                password: 'password'
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

    componentDidMount(){
        axios.get(API_QELISA_URL + 'public/program/rab?page=0&size=10&text=&user='+this.user_id,{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            },
            auth:{
                username: 'username',
                password: 'password'
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
                {this.renderPopupDelete()}
            	{this.renderSalinRab()}
                {this.renderTambahRab()}
                {this.renderPopupSuccess()}
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Rencana Anggaran Tanam (RAB)" />
                    {
                    DataHere ?
                        <div className="user-access">
                        {   this.state.totalElements ?
                            (
                                <div className="user-access-container">
                                    <div className="box-top row-flex flex-space">
                                        <div className="pull-left row-flex">
                                            <p className="count-item">{ this.state.totalElements ? this.state.totalElements : '0' } Data RAB</p>
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
                                            placeholder="Cari .."
                                            class="search-item form-control"
                                            type="text"/>
                                        </div>
                                        <div className="pull-right">
                                            <div className="box-btn auto" onClick={this.toggleTambahRab}>
                                                <ButtonPrimary name="Tambah RAB" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="box-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nama RAB</th>
                                                    <th>Tanggal Dibuat</th>
                                                    <th>Status</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                           
                                            <tbody>
                                                    {DataHere.map((datahere, i) => {
                                                        return(
                                                            <tr key={i}>
                                                                <td data-th="ID">{datahere.rab_id}</td>
                                                                <td data-th="Nama RAB">
                                                                    <Link className="text-success pointer" to={'/admin/rab-detail/' + datahere.rab_id}>{datahere.name}</Link>
                                                                </td>
                                                                <td data-th="Tanggal Dibuat">{new Date (datahere.created_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                                                <td data-th="Status">
                                                                	<p>{datahere.status}</p>
                                                                </td>
                                                                <td data-th="Aksi">
                                                                	<div className="row-flex flex-center flex-xs">
                                                                        <div className="box-btn auto" onClick={this.handleSalinRab.bind(this,datahere.rab_id,datahere.name)}>
								                                            <ButtonPrimary name="SALIN RAB" class="btn-white" />
								                                        </div>
                                                                         <div className="box-btn" onClick={this.handleDelete.bind(this, datahere.rab_id,datahere.name)}>
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
                                            <p className="text-footer">Menampilkan {this.state.totalElements >=10 ? this.state.totalsize : this.state.totalElements} entri dari {this.state.totalElements} Data RAB</p>
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
                            this.state.searchNull ? 
                                (
                                     <div className="user-access-container text-center no-content">
                                        <img src="../images/empty_state.svg" alt="" height="180"/>
                                        <h3 className="mg-t-20 normal">Data RAB masih kosong</h3>
                                        <div className="box-btn auto mg-t-40" onClick={this.toggleTambahRab}>
                                            <ButtonPrimary name="Tambah RAB" />
                                        </div>
                                     </div>
                                )
                                :
                                (
                                    <div className="user-access-container">
                                        <div className="box-top row-flex flex-space">
                                            <div className="pull-left row-flex">
                                                <p className="count-item">{ this.state.totalElements ? this.state.totalElements : '0' } RAB</p>
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
                                                placeholder="Cari .."
                                                class="search-item form-control"
                                                type="text"/>
                                            </div>
                                            <div className="pull-right">
                                                <div className="box-btn auto">
                                                    <ButtonPrimary name="Tambah RAB" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="box-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
	                                                    <th>Nama RAB</th>
	                                                    <th>Tanggal Dibuat</th>
	                                                    <th>Status</th>
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
                                                <p className="text-footer">Menampilkan 0 Data RAB</p>
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