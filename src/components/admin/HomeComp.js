import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import { actionAuth } from '../../actions/actionAuth'
import ReactPaginate from 'react-paginate'
import Doughnut from './chart/doughnut'


export default class HomeComp extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: [],
            classBgColor: '',
            toggleAddUser: false
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    componentDidMount(){
        
        axios.get(API_URL,{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const data = res.data
            this.setState({
                countFarmer: data.farmer_count,
                countRukman: data.farmer_group_count,
                countLand: data.sum_large_land,
                countFarmerProgram: data.count_farmer_in_program

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
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.svg" height="35"/>
                    </div>
                    <Header title="Dashboard" />
                    <div className="dashboard">
                        <div className="dashboard-top">
                            <div className="box-stat">
                                <div className="box text-center">
                                    <h3>{ this.state.countFarmer ? this.state.countFarmer : '0' }</h3>
                                    <p>Jumlah Petani</p>
                                </div>
                                <div className="box text-center">
                                    <h3>{ this.state.countRukman ? this.state.countRukman : '0' }</h3>
                                    <p>Jumlah Kelompok Petani</p>
                                </div>
                                <div className="box text-center">
                                    <h3>{ this.state.countFarmerProgram ? this.state.countFarmerProgram : '0' }<span className="text-muted">/ { this.state.countFarmer ? this.state.countFarmer : '0' }</span></h3>
                                    <p>Keikutsertaan Petani pada Program</p>
                                </div>
                            </div>
                            <div className="box-tiket pd-r-0">
                                <Doughnut/>
                            </div>
                        </div>
                        <div className="dashboard-middle">
                            <div className="box-program-wrapper">
                                <div className="box-program pd-r-0">
                                    <Doughnut/>
                                </div>
                                <div className="box box-program-active text-center">
                                    <h3>0<span className="text-muted">/ 0</span></h3>
                                    <p>Program Aktif</p>
                                </div>
                            </div>
                            <div className="box box-stat-lahan text-center">
                                <h3>0 m<sup>2</sup><span className="text-muted">/ { this.state.countFarmerProgram ? this.state.countFarmerProgram : '0' } m<sup>2</sup></span></h3>
                                <p>Lahan telah digunakan</p>
                            </div>
                        </div>
                        {/*}
                        <div className="dashboard-bottom">
                            <div className="box-kegiatan">
                                <div className="box-top">
                                    <div className="table-heading">
                                        <p className="strong">Kegiatan Petani Yang Belum Selesai</p>
                                    </div>
                                    <div className="search-wrapper">
                                        <input className="search-item form-control" type="text" placeholder="Cari .." />
                                    </div>
                                </div>
                                <div className="box-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Kel. Tani</th>
                                                <th>Nama Petani</th>
                                                <th>Program</th>
                                                <th>Tanggal Kegiatan</th>
                                                <th>Status</th>
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
                            <div className="box-petani-nganggur">
                                <div className="box-top">
                                    <div className="table-heading">
                                        <p className="strong">Daftar Petani Menganggur</p>
                                    </div>
                                    <div className="search-wrapper">
                                        <input className="search-item form-control" type="text" placeholder="Cari .." />
                                    </div>
                                </div>
                                <div className="box-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Petani</th>
                                                <th>Kelompok Petani</th>
                                                <th>Program</th>
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
                                                        </tr>
                                                    )
                                                }else{
                                                    return(
                                                        <tr key={i} >
                                                            <td>{datahere.user_role_id}</td>
                                                            <td>{datahere.name}</td>
                                                            <td>{datahere.ktp_number}</td>
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
                        */}
                    </div>
                </div>
            </div>
        )
    }
}