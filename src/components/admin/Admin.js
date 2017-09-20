import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import TambahPetani from './popup/data-petani/TambahPetani'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import ReactPaginate from 'react-paginate'

export default class Admin extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: [],
            classBgColor: '',
            toggleAddUser: false
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userName = Crypto.AES.decrypt(Base64.decode(Cookie.load('username')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userEmail = Crypto.AES.decrypt(Base64.decode(Cookie.load('email')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handleAdd(){
        this.setState({
            toggleAddUser : !this.state.toggleAddUser
        })
        console.log(this.state.toggleAddUser)
    }

    renderPopupAddUser(){
        let { toggleAddUser } = this.state

        if( toggleAddUser === true ){
            return (
                <TambahPetani />
            )
        }
        else{
            return null;
        }
    }

    componentDidMount(){
        console.log(this.authToken)
        // axios.get(API_URL + 'user_access?page=0&size=100&text=&user_role=1',{
        axios.get(API_URL + 'user_access?page=0&size=100&text=&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
            this.setState({dataHere})
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
                <div className="outer-container">
                    <ResponsiveHeader />
                    <div id="page-wrap" className="main-content">
                        <Header title="Data Petani" />
                        <div className="user-access">
                            <div className="user-access-container">
                                <div className="box-top">
                                    <p className="count-item">30 Users</p>
                                    <select className="per-page option-input">
                                        <option>10 entri per halaman</option>
                                        <option>10 entri per halaman</option>
                                    </select>
                                    <input className="search-item" type="text" placeholder="Cari .." />
                                    <select className="role-filter option-input">
                                        <option>Semua Role</option>
                                        <option>Semua Role</option>
                                    </select>
                                    <div className="box-btn" onClick={this.handleAdd}>
                                        <ButtonPrimary name="Tambah User" />
                                    </div>
                                </div>

                                <div className="box-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Nama</th>
                                                <th>No. KTP</th>
                                                <th>Email</th>
                                                <th>No. Telepon</th>
                                                <th>Kota</th>
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
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="box-footer-table">
                                    <div className="footer-table">
                                        <p className="text-footer">Menampilkan 10 entri dari 30 Anggota Kelompok Tani</p>
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