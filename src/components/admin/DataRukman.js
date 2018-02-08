import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import TambahKelompokPetani from './popup/data-kelompok-petani/TambahKelompokPetani'
import EditRukman from './popup/data-kelompok-petani/EditRukman'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

export default class DataRukman extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handleSearch(id, value){
        console.log('ini value: '+value)

        axios.get(API_URL + 'rukmans?pagination=true&text=' + value + '&page=0&size=10',{
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

        axios.get(API_URL + 'rukmans?pagination=true&text=&page=0&size=' + valueEntri ,{
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

        axios.get(API_URL + 'rukmans?pagination=true&text=&page='+ selected +'&size=10',{
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

    componentDidMount(){
        console.log(this.authToken)
        axios.get(API_URL + 'rukmans?pagination=true&text=&page=0&size=10',{
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
        let ClassBgColor = this.state.classBgColor

        return(
            <div id="outer-container">
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Data Rukman" />
                    {
                    DataHere ?
                    <div className="user-access">
                        {this.state.totalElements ?
                        (
                        <div className="user-access-container">
                            <div className="box-top row-flex flex-space">
                                <div className="pull-left row-flex">
                                    <p className="count-item"> { this.state.totalElements ? this.state.totalElements : '0' } Rukman</p>
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
                                </div>
                            </div>

                            <div className="box-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Kelompok Tani</th>
                                            <th>Alamat</th>
                                            <th className="text-center">Data Ketua</th>
                                        </tr>
                                    </thead>
                                  
                                       
                                    <tbody>
                                        {DataHere.map((datahere, i) => {
                                            return(
                                                <tr key={i}>
                                                    <td data-th="ID" className="strong">{datahere.rukman_id}</td>
                                                    <td data-th="Nama Kelompok Tani">{datahere.rukman_name}</td>
                                                    <td data-th="Alamat">
                                                        {   ( 
                                                            <div className="block lower">
                                                                <p>{ datahere.address}</p>
                                                                <p>{datahere.village} ,
                                                                {datahere.district}</p>
                                                                <p>{datahere.city} ,
                                                                {datahere.province}</p>
                                                            </div>
                                                            )
                                                        }
                                                    </td>
                                                    <td className="text-center" data-th="Data Ketua">{datahere.pic_name}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                         
                                </table>
                            </div>

                            <div className="box-footer-table">
                                <div className="footer-table">
                                    <p className="text-footer">Menampilkan {this.state.totalElements >=10 ? this.state.totalsize : this.state.totalElements} entri dari {this.state.totalElements} Data Rukman</p>
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
                                <h3 className="mg-t-20 normal">Data rukman masih kosong</h3>
                             </div>
                            )
                            :
                            (
                            <div className="user-access-container">
                                <div className="box-top row-flex flex-space">
                                    <div className="pull-left row-flex">
                                        <p className="count-item"> 0 Rukman</p>
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
                                    </div>
                                </div>

                                <div className="box-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nama Kelompok Tani</th>
                                                <th>Alamat</th>
                                                <th className="text-center">Data Ketua</th>
                                            </tr>
                                        </thead>
                                      
                                           
                                        <tbody>
                                            <tr>
                                                <td className="text-center normal" colSpan="4">Tidak ada data</td>
                                            </tr>
                                        </tbody>
                                             
                                    </table>
                                </div>

                                <div className="box-footer-table">
                                    <div className="footer-table">
                                        <p className="text-footer">Menampilkan 0 Data Rukman</p>
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