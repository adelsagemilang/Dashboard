import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import InputForm from '../common/InputForm'

import Success from './popup/common-popup/Success'
import HapusData from './popup/common-popup/HapusData'

export default class RABDetail extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            salinRab: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    componentDidMount(){
        axios.get(API_URL + 'farmers?pagination=true&text=&page=0&size=10&member=false',{
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
                    <Header title="Rencana Anggaran Tanam (RAB)" />
                    {
                    DataHere ?
                        <div className="user-access rab-detail">
                        {   this.state.totalElements ?
                            (
                                <div className="user-access-container">
                                    <div className="box-top row-flex flex-space">
                                        <div className="pull-left">
                                            <h4 className="text-info">RAB Gua Tea Wa Euy</h4>
                                            <div class="edit-rab">
                                                
                                            </div>
                                        </div>
                                        <div className="pull-right">
                                            <div className="box-btn auto">
                                                <ButtonPrimary name="Hapus RAB" class="button-danger" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="box-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Kuantitas</th>
                                                    <th>Satuan</th>
                                                    <th>Harga</th>
                                                    <th>Subtotal</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                           
                                            <tbody>
                                                    {DataHere.map((datahere, i) => {
                                                        return(
                                                            <tr key={i}>
                                                                <td>Item #1</td>
                                                                <td>1000</td>
                                                                <td>KG</td>
                                                                <td>Rp. 10.000</td>
                                                                <td>Rp. 100.000</td>
                                                                <td>
                                                                    <div className="row-flex flex-center flex-xs">
                                                                        <div className="box-btn">
                                                                            <ButtonIcon class="btn-outline-sm" icon="icon-create"/>
                                                                        </div>
                                                                         <div className="box-btn">
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
                                </div>
                            )
                            : 
                            this.state.searchNull ? 
                                (
                                     <div className="user-access-container text-center no-content">
                                        <img src="../images/empty_state.svg" alt="" height="180"/>
                                        <h3 className="mg-t-20 normal">Data RAB masih kosong</h3>
                                        <div className="box-btn auto mg-t-40">
                                            <ButtonPrimary name="Tambah RAB" />
                                        </div>
                                     </div>
                                )
                                :
                                (
                                    <div className="user-access-container">
                                        <div className="box-top row-flex flex-space">
                                            <div className="pull-left row-flex">
                                                
                                            </div>
                                            <div className="pull-right">
                                                <div className="box-btn auto">
                                                    <ButtonPrimary name="Hapus RAB" class="button-danger"/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="box-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
	                                                    <th>Kuantitas</th>
	                                                    <th>Satuan</th>
	                                                    <th>Harga</th>
	                                                    <th>Subtotal</th>
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