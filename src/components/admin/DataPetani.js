import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import Success from './popup/common-popup/Success'
import HapusData from './popup/common-popup/HapusData'
import TambahPetani from './popup/data-petani/TambahPetani'
import SearchPetani from './popup/data-petani/searchPetani'
import PhoneFound from './popup/data-petani/phoneFound'
import PhoneNotFound from './popup/data-petani/phoneNotFound'
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

export default class DataPetani extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: [],
            classBgColor: '',
            toggleAddUser: false,
            toggleDeletePopup: false,
            toggleSuccess: false,
            phoneFound: false,
            phoneNotFound: false,
            daftarPetani: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userName = Crypto.AES.decrypt(Base64.decode(Cookie.load('username')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userEmail = Crypto.AES.decrypt(Base64.decode(Cookie.load('email')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handleSearch(id, value){
        console.log('ini value: '+value)

        axios.get(API_URL + 'user_access?page=0&size=10&text=' + value + '&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
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

    handleChangeEntriPage(e){
        console.log('value: '+ e.target.value)
        const valueEntri = e.target.value

        axios.get(API_URL + 'user_access?page=0&size=' + valueEntri + '&text=&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
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

        axios.get(API_URL + 'user_access?page='+ selected +'&size=10&text=&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
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


    toggleAddUser(){
        this.setState({
            toggleAddUser : !this.state.toggleAddUser
        })
    }

    toggleDeletePopup(){
        console.log('clicked');
        this.setState({
            toggleDeletePopup : !this.state.toggleDeletePopup
        })
    }

    renderPopupAddUser(){
        let { toggleAddUser } = this.state

        if( toggleAddUser === true ){
            return (
                <SearchPetani 
                    toggleAddUser={this.toggleAddUser}
                    handleSearchToAdd = {this.handleSearchToAdd}
                />
            )
        }
        else{
            return null;
        }
    }

    renderPopupDelete(){
        if (this.state.toggleDeletePopup){
            return (
                <HapusData 
                toggleDeletePopup={this.toggleDeletePopup} 
            />
            )
        }
    }

    renderPopupSuccess(){
        return (
                <Success 
                toggleDeletePopup={this.toggleDeletePopup} 
            />
            )
    }

    handleCancel(){
        console.log('canceled')
        this.setState({
            toggleAddUser: false
        })
    }

    handleSearchToAdd(){
        console.log('clicked');
        const value = document.getElementById('search-to-add').value
        axios.get(API_URL + 'user_access?page=0&size=10&text=' + value + '&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
            const phone = dataHere.map( datas => {
                return datas.phone_number
            })

            if( phone.length == 1 ){
                this.setState({
                    phoneNotFound : false,
                    phoneFound: true
                })

                this.handleCancel()
                
            }
            else{
                this.setState({
                    phoneNotFound : true,
                    phoneFound: false
                })
                this.handleCancel()
            }
        })
        .catch((error) => {
            console.log('err: '+ error)
            
        })
    }

    phoneFound(){
        if(this.state.phoneFound){
            return (
                <PhoneFound 
                    togglePhoneFound={this.togglePhoneFound} 
                />
            )
        }
        
    }

    togglePhoneFound(){
        this.setState({
            phoneFound: !this.state.phoneFound
        })
    }

    phoneNotFound(){
        if(this.state.phoneNotFound){
            return <PhoneNotFound 
                handleDaftar={this.toggleHandleDaftar} 
                togglePhoneNotFound={this.togglePhoneNotFound}
                />
        }
 
    }

    togglePhoneNotFound(){
        this.setState({
            phoneNotFound: !this.state.phoneNotFound
        })
    }

    toggleHandleDaftar(){
        this.setState({
            daftarPetani: !this.state.daftarPetani,
            phoneNotFound: false
        })
    }

    handleDaftar(){
        if(this.state.daftarPetani){
            return <TambahPetani toggleHandleDaftar={this.toggleHandleDaftar} />
        }
    }

    componentDidMount(){
        console.log(this.authToken)
        axios.get(API_URL + 'user_access?page=0&size=10&text=&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
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

    render(){
        const DataHere = this.state.dataHere
        let ClassBgColor = this.state.classBgColor

        return(
            <div>
                {this.renderPopupAddUser()}
                {this.renderPopupDelete()}
                {this.phoneFound()}
                {this.phoneNotFound()}
                {this.handleDaftar()}
                {this.renderPopupSuccess()}
                <div className="main-content">
                    <Header title="Data Petani" />
                    <div className="user-access">
                        <div className="user-access-container">
                            <div className="box-top row-flex flex-space">
                                <div className="pull-left">
                                    <p className="count-item">30 Petani</p>
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
                                    class="search-item"
                                    type="text"/>
                                </div>
                                <div className="pull-right">
                                    <div className="box-btn" onClick={this.toggleAddUser}>
                                        <ButtonPrimary name="Tambah Petani" />
                                    </div>
                                </div>
                            </div>

                            <div className="box-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nama Lengkap</th>
                                            <th>No. Telp</th>
                                            <th>Alamat</th>
                                            <th>Tempat Tanggal Lahir</th>
                                            <th>Nama Ibu Kandung</th>
                                            <th>Rek. Bank</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DataHere.map((datahere, i) => {
                                            if(i % 2 === 1){
                                                return(
                                                    <tr key={i} className='list-grey'>
                                                        <td>{datahere.user_role_id}</td>
                                                        <td>{datahere.name}</td>
                                                        <td>{datahere.ktp_number}</td>
                                                        <td>{datahere.email}</td>
                                                        <td>{datahere.phone_number}</td>
                                                        <td>{datahere.city}</td>
                                                        <td className="text-center">
                                                        	<div className="row-flex flex-center">
                                                        		<div className="box-btn" onClick={this.handleCreate}>
                                                        			<ButtonIcon class="btn-outline-sm" icon="icon-create"/>
                                                        		</div>
                                                        		 <div className="box-btn" onClick={this.toggleDeletePopup}>
																	 <ButtonIcon class="btn-red-sm" icon="icon-delete"/>
                                                        		 </div>
                                                        	</div>	
                                                        </td>
                                                    </tr>
                                                )
                                            }else{
                                                return(
                                                    <tr key={i} >
                                                        <td>{datahere.user_role_id}</td>
                                                        <td>{datahere.name}</td>
                                                        <td>{datahere.ktp_number}</td>
                                                        <td>{datahere.email}</td>
                                                        <td>{datahere.phone_number}</td>
                                                        <td>{datahere.city}</td>
                                                        <td className="text-center">
                                                        	<div className="row-flex flex-center">
                                                        		<div className="box-btn" onClick={this.handleCreate}>
                                                        			<ButtonIcon class="btn-outline-sm" icon="icon-create"/>
                                                        		</div>
                                                        		 <div className="box-btn" onClick={this.toggleDeletePopup}>
																	 <ButtonIcon class="btn-red-sm" icon="icon-delete"/>
                                                        		 </div>
                                                        	</div>	
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="box-footer-table">
                                <div className="footer-table">
                                    <p className="text-footer">Menampilkan {this.state.totalsize} entri dari {this.state.totalElements} Anggota Kelompok Tani</p>
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
                    </div>
                </div>
            </div>
        )
    }
}