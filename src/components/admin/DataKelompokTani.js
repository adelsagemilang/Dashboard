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
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

export default class DataKelompokPetani extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: [],
            classBgColor: '',
            toggleTambahKelompok: false,
            updateRukman: false,
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

        axios.get(API_URL + 'rukmans?pagination=true&text=&page=0&size=' + valueEntri ,{
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

    handleUpdate(rukman_id){
        console.log('Update: ' + rukman_id)
        this.setState({
            rukman_id: rukman_id,
            updatePetani: !this.state.updatePetani
        })
    }

    toggleUpdateRukman(){
        this.setState({
            updateRukman: !this.state.updateRukman
        })
    }


    toggleTambahKelompok(){
        this.setState({
            toggleTambahKelompok : !this.state.toggleTambahKelompok
        })
    }

    renderPopupTambahKelompok(){
        let { toggleTambahKelompok } = this.state

        if( toggleTambahKelompok === true ){
            return (
               <TambahKelompokPetani toggleHandleTambah={this.toggleTambahKelompok} />
            )
        }
        else{
            return null;
        }
    }

    renderPopupUpdate(){
        if (this.state.updatePetani){
            return (
                <EditRukman 
                    urlget={'rukmans/'+this.state.rukman_id}
                    url={'rukmans/edit/'+this.state.rukman_id}
                    toggleUpdateRukman={this.toggleUpdateRukman} 
            />
            )
        }
    }

    handleCancel(){
        console.log('canceled')
        this.setState({
            toggleAddUser: false
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
                {this.renderPopupTambahKelompok()}
                {this.renderPopupUpdate()}
                <div className="main-content">
                    <Header title="Data Kelompok Tani" />
                    <div className="user-access">
                        <div className="user-access-container">
                            <div className="box-top row-flex flex-space">
                                <div className="pull-left">
                                    <p className="count-item">30 Kelompok Petani</p>
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
                                    placeholder="Cari Nama atau ID Kelompok Tani"
                                    class="search-item"
                                    type="text"/>
                                </div>

                                <div className="pull-right">
                                    <div className="box-btn auto" onClick={this.toggleTambahKelompok}>
                                        <ButtonPrimary name="Tambah Kelompok Tani" />
                                    </div>
                                </div>
                            </div>

                            <div className="box-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Kelompok Tani</th>
                                            <th>Jumlah Anggota</th>
                                            <th>Total Luas Lahan</th>
                                            <th>Alamat</th>
                                            <th>Data Ketua</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DataHere.map((datahere, i) => {
                                            if(i % 2 === 1){
                                                return(
                                                    <tr key={i} className='list-grey'>
                                                        <td className="strong">{datahere.rukman_id}</td>
                                                        <td>{datahere.rukman_name}</td>
                                                        <td className="text-center">10</td>
                                                        <td>2000m</td>
                                                        <td>{datahere.address}</td>
                                                        <td>{datahere.surveyor_name}</td>
                                                        <td>
                                                            <div className="row-flex flex-center">
                                                                <div className="box-btn" onClick={this.handleUpdate.bind(this,datahere.rukman_id)}>
                                                                    <ButtonIcon class="btn-outline-sm" icon="icon-create"/>
                                                                </div>
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
                                                        <td className="strong">{datahere.rukman_id}</td>
                                                        <td>{datahere.rukman_name}</td>
                                                        <td className="text-center">10</td>
                                                        <td>2000m</td>
                                                        <td>{datahere.address}</td>
                                                        <td>{datahere.surveyor_name}</td>
                                                        <td>
                                                            <div className="row-flex flex-center">
                                                                <div className="box-btn" onClick={this.handleUpdate.bind(this,datahere.rukman_id)}>
                                                                    <ButtonIcon class="btn-outline-sm" icon="icon-create"/>
                                                                </div>
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