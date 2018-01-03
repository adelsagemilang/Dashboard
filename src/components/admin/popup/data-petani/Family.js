import React, { Component, PropTypes } from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, API_LIST_URL, TK_KEY } from '../../../../containers/RootUrl'
import ReactPaginate from 'react-paginate'


export default class Family extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)

    }

    handleAddFamily(){
        const id = this.props.farmerId
        this.props.handleAddFamily(id)
    }

    componentDidMount(){

        axios.get(API_URL + 'farmers/' + this.props.farmerId +'/families',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data
            
            this.setState({
                dataHere,
                listStatus: true
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render(){
        const DataHere = this.state.dataHere

        return(
            <div className="add-popup">
                <div className="popup-container popup-table">
                    <div className="box-content">
                        <div className="content">
                            <p className="title mg-b-20">Data Keluarga {this.props.farmerName}</p>
                             <div className="box-table mg-t-15">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Nama</th>
                                            <th>No. Handphone</th>
                                            <th>Alamat</th>
                                            <th>Tempat Tanggal Lahir</th>
                                            <th>Ibu Kandung</th>
                                        </tr>
                                    </thead>
                                    {  DataHere ? 
                                        <tbody>
                                            {DataHere.map((datahere, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <td data-th="Status">{datahere.relationship_status}</td>
                                                        <td data-th="Nama">{datahere.name}</td>
                                                        <td data-th="No.Handphone">{datahere.phone_number}</td>
                                                        <td data-th="Alamat">{datahere.address}</td>
                                                        <td data-th="Tempat Tanggal Lahir">{datahere.birthdate}</td>
                                                        <td data-th="Ibu Kandung">{datahere.biological_mothers_name}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        :
                                        <tbody>
                                            <tr>
                                                <td className="text-center normal pd-t-10 no-content" colSpan="6">
                                                    Tidak ada data
                                                </td>
                                            </tr>
                                        </tbody>

                                    }
                                </table>
                            </div>
                            <div className="box-footer-table row-flex flex-space">
                                <div className="pull-left">
                                    <div className="box-btn auto" onClick={this.props.togglePopupFamily}>
                                        <ButtonPrimary
                                        class="button-secondary"
                                        type="button"
                                        name="Batal" />
                                    </div>
                                </div>
                                
                                <div className="pull-right">
                                    <div className="box-btn" onClick={this.handleAddFamily}>
                                        <ButtonPrimary
                                            class="button-primary"
                                            type="submit"
                                            name="Tambah Anggota Keluarga" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}