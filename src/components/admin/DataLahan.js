import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import Detail from './popup/data-lahan/Detail'
import TambahLahan from './popup/data-lahan/TambahLahan'
import HapusData from './popup/common-popup/HapusData'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

export default class Datalahan extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            classBgColor: '',
            toggleTambahLahan: false,
            toggleDeleteLahan: false,
            togglePopupDetail: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handleSearch(id, value){

        axios.get(API_URL + 'lands?page=0&size=10&text='+value,{
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

        axios.get(API_URL + 'lands?page=0&size='+ valueEntri +'&text=',{
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

    handlePageClick(dataHere){
        console.log('clicked')
        let selected = dataHere.selected
        console.log(selected)

        axios.get(API_URL + 'lands?page='+ selected +'&size=10&text=',{
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

    handleDetail(name, id, lat, lng, img, address, loc){
        this.setState({
            landName: name,
            landId: id,
            lat: lat,
            lng: lng,
            img: img,
            address: address,
            loc: loc,
            togglePopupDetail: !this.state.togglePopupDetail
        })
    }

    toggleTambahLahan(){
        this.setState({
            toggleTambahLahan : !this.state.toggleTambahLahan
        })
    }

    toggleDeleteLahan(){
        this.setState({
            toggleDeleteLahan: !this.state.toggleDeleteLahan
        })
    }

    togglePopupDetail(){
        this.setState({
            togglePopupDetail: !this.state.togglePopupDetail
        })
    }

    renderPopupTambahLahan(){

        if( this.state.toggleTambahLahan ){
            return (
                <TambahLahan toggleTambahLahan={this.toggleTambahLahan}
                />
            )
        }
    }

    renderPopupDeleteLahan(){
        if( this.state.toggleDeleteLahan ){
            return (
                <HapusData 
                    title="Hapus Data Lahan"
                    url={'lands/delete/'+this.state.land_id}
                    name={this.state.name}
                    farmerId={this.state.land_id}
                    handleDelete={this.handleDelete} 
                    toggleDeletePopup={this.toggleDeleteLahan} 
            />
            )
        }
    }

    renderPopupDetail(){
        if (this.state.togglePopupDetail) {
            return(
                <Detail
                    name={this.state.landName}
                    landId={this.state.landId}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    img={this.state.img}
                    loc={this.state.loc}
                    address={this.state.address}
                    togglePopupDetail={this.togglePopupDetail} 
                />
            )
        }
    }

    handleCancel(){
        console.log('canceled')
        this.setState({
            toggleTambahLahan: false
        })
    }

    handleDelete(land_id, name){
        this.setState({
            land_id: land_id,
            name: name,
            toggleDeleteLahan: !this.state.toggleDeleteLahan
        })
    }

    componentDidMount(){
        axios.get(API_URL + 'lands?page=0&size=10&text=',{
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
                {this.renderPopupTambahLahan()}
                {this.renderPopupDeleteLahan()}
                {this.renderPopupDetail()}
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Data Lahan" />
                    { DataHere ? 
                    <div className="user-access">
                        {   this.state.totalElements ?

                        (
                        <div className="user-access-container">
                            <div className="box-top row-flex flex-space">
                                <div className="pull-left row-flex">
                                    <p className="count-item">{ this.state.totalElements ? this.state.totalElements : '0' } Lahan Petani</p>
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
                                    class="form-control search-item"
                                    type="text"/>
                                </div>
                                <div className="pull-right">
                                    <div className="box-btn auto" onClick={this.toggleTambahLahan}>
                                        <ButtonPrimary name="Tambah Lahan" />
                                    </div>
                                </div>
                            </div>

                            <div className="box-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nama Petani</th>
                                            <th>Nama lahan</th>
                                            <th>Luas</th>
                                            <th>Ketinggian</th>
                                            <th>Sumber Pengairan</th>
                                            <th>Komoditas Tanam</th>
                                            <th>Hama Dominan</th>
                                            <th>Penyakit Dominan</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {DataHere.map((datahere, i) => {
                                            return(
                                                <tr key={i}>
                                                    <td data-th="Nama Petani" className="strong">{ datahere.farmer_name }</td>
                                                    <td data-th="Nama Lahan">
                                                        <div className="block">
                                                            <p>{ datahere.name }</p>
                                                            { datahere.is_surveyed ? 
                                                                <p className="text-success text-small nowrap">Sudah Diverifikasi</p>
                                                                :
                                                                <p className="text-danger text-small nowrap">Belum Diverifikasi</p>
                                                             }
                                                             <p className="text-info normal pointer" 
                                                                onClick={this.handleDetail.bind(
                                                                    this,
                                                                    datahere.name,
                                                                    datahere.land_id,
                                                                    datahere.lat,
                                                                    datahere.lng,
                                                                    datahere.image,
                                                                    datahere.address,
                                                                    datahere.location
                                                                )}
                                                            >Lihat Detail</p>
                                                        </div>
                                                    </td>
                                                    <td data-th="Luas">{ datahere.large }m<sup>2</sup></td>
                                                    <td data-th="Ketinggian">{ datahere.height }mdpl</td>
                                                    <td data-th="Sumber Pengairan">{ datahere.irigation }</td>
                                                    <td data-th="Komoditas Tanam">
                                                    { 
                                                        datahere.commodities !== null ?
                                                            datahere.commodities.map((comodities,i) => 
                                                              <span key={i} className="mg-r-5">{comodities.name + (i === datahere.commodities.length-1 ? '.' : ', ')}</span>
                                                            )
                                                        :
                                                        (
                                                            <span>Tidak memiliki komoditas</span>
                                                        )
                                                    }
                                                    </td>
                                                    <td data-th="Hama Dominan">{ datahere.pest }</td>
                                                    <td data-th="Penyakit Dominan">{ datahere.disease }</td>
                                                     <td data-th="Aksi">
                                                        <div className="row-flex flex-center flex-xs">
                                                             <div className="box-btn" onClick={this.handleDelete.bind(this,datahere.land_id,datahere.name)}>
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
                                    <p className="text-footer">Menampilkan {this.state.totalElements >=10 ? this.state.totalsize : this.state.totalElements} entri dari {this.state.totalElements} Data Lahan</p>
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
                                    <h3 className="mg-t-20 normal">Data lahan masih kosong</h3>
                                    <div className="box-btn auto mg-t-40" onClick={this.toggleTambahLahan}>
                                            <ButtonPrimary name="Tambah Lahan" />
                                    </div>
                                 </div>
                            )
                            :
                            (
                                <div className="user-access-container">
                                    <div className="box-top row-flex flex-space">
                                        <div className="pull-left row-flex">
                                            <p className="count-item">0 Lahan Petani</p>
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
                                            class="form-control search-item"
                                            type="text"/>
                                        </div>
                                        <div className="pull-right">
                                            <div className="box-btn auto" onClick={this.toggleTambahLahan}>
                                                <ButtonPrimary name="Tambah Lahan" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nama Petani</th>
                                                    <th>Nama lahan</th>
                                                    <th>Luas</th>
                                                    <th>Ketinggian</th>
                                                    <th>Sumber Pengairan</th>
                                                    <th>Komoditas Tanam</th>
                                                    <th>Hama Dominan</th>
                                                    <th>Penyakit Dominan</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                <tr>
                                                    <td className="text-center normal" colSpan="9">Data tidak ditemukan</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="box-footer-table">
                                        <div className="footer-table">
                                            <p className="text-footer">Menampilkan 0 Data Lahan</p>
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