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
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

export default class TiketProgram extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: [],
            classBgColor: '',
            toggleTambahTiket: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
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


    toggleTambahTiket(){
        this.setState({
            toggleTambahTiket : !this.state.toggleTambahTiket
        })
    }

    renderPopupTambahTiket(){
        let { toggleTambahTiket } = this.state

        if( toggleTambahTiket === true ){
            return (
                <TambahTiketProgram toggleTambahTiket={this.toggleTambahTiket} />
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
                {this.renderPopupTambahTiket()}
                <div className="main-content">
                    <Header title="Tiket Program" />
                    <div className="user-access tiket-program">
                        <div className="user-access-container">
                            <div className="box-status row-flex">
                                <div className="col-3 text-center">
                                    <h3 className="text-success">2</h3>
                                    <p>Disetujui</p>
                                </div>
                                <div className="col-3 text-center">
                                    <h3 className="text-info">31</h3>
                                    <p>Menunggu Persetujuan</p>
                                </div>
                                <div className="col-3 text-center">
                                    <h3 className="text-danger">3</h3>
                                    <p>Ditolak</p>
                                </div>
                            </div>
                            <div className="box-top row-flex flex-space">
                                <div className="pull-left row-flex col-5">
                                    <p className="count-item">35 Tiket Program</p>
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
                                    class="search-item"
                                    type="text"/>
                                    <InputForm
                                    handleChange={this.handleSearch}
                                    placeholder="Tanggal Pengajuan"
                                    class="search-item"
                                    type="text"
                                    icon="true"
                                    src="../images/icon/button_icon/icon-datepicker.svg"/>
                                    <div className="select-wrapper">
                                         <select className="option-input">
                                            <option value="">Status</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pull-right">
                                    <div className="box-btn auto" onClick={this.toggleTambahTiket}>
                                        <ButtonPrimary name="Tambah Tiket Program" />
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
                                            if(i % 2 === 1){
                                                return(
                                                    <tr key={i} className='list-grey'>
                                                        <td className="strong">020671</td>
                                                        <td>Penanaman Cabai 1 Hektar</td>
                                                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus hic quisquam ducimus architecto iure explicabo!</td>
                                                        <td>13:55:11 - 14 Aug 2017</td>
                                                        <td>Pending</td>
                                                        <td>Qelisa</td>
                                                         <td>
                                                            <div className="row-flex flex-center">
                                                                 <div className="box-btn" onClick={this.handleDelete}>
                                                                     <ButtonIcon class="btn-red-sm" icon="icon-delete"/>
                                                                 </div>
                                                            </div>  
                                                        </td>
                                                    </tr>
                                                )
                                            }else{
                                                return(
                                                    <tr key={i} >
                                                        <td className="strong">020671</td>
                                                        <td>Penanaman Cabai 1 Hektar</td>
                                                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus hic quisquam ducimus architecto iure explicabo!</td>
                                                        <td>13:55:11 - 14 Aug 2017</td>
                                                        <td>Pending</td>
                                                        <td>Qelisa</td>
                                                         <td>
                                                            <div className="row-flex flex-center">
                                                                 <div className="box-btn" onClick={this.handleDelete}>
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