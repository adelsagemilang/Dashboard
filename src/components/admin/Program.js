import React, { Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import TambahProgram from './popup/program/TambahProgram'
import BuatProgram from './popup/program/BuatProgram'
import HapusProgram from './popup/program/HapusProgram'
import DropdownMenu from './dropdown-menu'
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

export default class Program extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: [],
            classBgColor: '',
            toggleTambahProgram: false,
            toggleBuatProgram: false,
            toggleHapusProgram: false,
            toggleDropdownFilter: false,
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


    toggleTambahProgram(){
        this.setState({
            toggleTambahProgram : !this.state.toggleTambahProgram
        })
    }

    toggleBuatProgram(){
        this.setState({
            toggleBuatProgram : !this.state.toggleBuatProgram
        })
    }

    renderPopupTambahProgram(){
        let { toggleTambahProgram } = this.state

        if( toggleTambahProgram === true ){
            return (
                <TambahProgram 
                    toggleTambahProgram={this.toggleTambahProgram}
                />
            )
        }
        else{
            return null;
        }
    }

    toggleDropdownFilter(){
        this.setState({
            toggleDropdownFilter: !this.state.toggleDropdownFilter
        })
    }

    toggleDropdownMenu(i){
        let id = document.getElementById(i)
        /*let active = document.getElementsByClassName("active")

        while (active.length){
            active[0].classList.remove("active")
        }*/
        id.classList.toggle("active")
    }

    toggleHapusProgram(){
        this.setState({
            toggleHapusProgram: !this.state.toggleHapusProgram
        })
    }

    incrementValue()
    {
        let check = document.getElementById('number')

        if (check){
            let value = document.getElementById('number').value 

            if (value != "20"){
                value ++
                document.getElementById('number').value = value
            }
        }
    }

    decrementValue()
    {
        let check = document.getElementById('number')

        if (check){
            var value = document.getElementById('number').value
            value --
            value = value < 0 ? 0 : value
            document.getElementById('number').value = value
        }
    }

    checkValue(){
        console.log()
    }

    renderPopupBuatProgram(){
        if (this.state.toggleBuatProgram){
            return(
                <BuatProgram toggleBuatProgram={this.toggleBuatProgram} />
            )
        }
    }

    renderPopupHapusProgram(){
        if (this.state.toggleHapusProgram){
            return(
                <HapusProgram toggleHapusProgram={this.toggleHapusProgram} />
            )
        }
    }

    renderDropdownFilter(){
        if(this.state.toggleDropdownFilter){
            return(
                <div className="dropdown-collapse">
                    <div className="row-flex col-2">
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Tipe Program</option>
                            </select>
                        </div>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Model Bisnis</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2">
                         <InputForm
                            handleChange={this._handleChange}
                            placeholder="Tanggal Pengajuan"
                            type="text" 
                            class="form-control" 
                            icon="true" 
                            src="../images/icon/button_icon/icon-datepicker.svg"/>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Inisiator</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2">
                         <InputForm
                            handleChange={this._handleChange}
                            placeholder="Periode"
                            type="text" 
                            class="form-control" 
                            icon="true" 
                            src="../images/icon/button_icon/icon-datepicker.svg"/>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Kelompok Tani</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2">
                        <div className="input-form row-flex input-plus-min">
                           <button className="buttonmin" type="button" onClick={this.decrementValue}>-</button>
                           <input className="form-control" type="text" id="number" value="0" max onChange={this.checkValue} />
                           <span>Petani</span>
                           <button className="buttonplus" type="button" onClick={this.incrementValue}>+</button>
                        </div>
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Biaya</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-flex col-2 mg-b-10">
                        <div className="select-wrapper">
                            <select className="per-page option-input" value={ this.state.value }>
                                <option value="">Status</option>
                            </select>
                        </div>
                    </div>
                    <div className="pull-left">
                        <div className="box-btn" onClick={this.handleFilter}>
                            <ButtonPrimary name="Filter" />
                        </div>
                    </div>
                </div>
            )
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
                {this.renderPopupTambahProgram()}
                {this.renderPopupBuatProgram()}
                {this.renderPopupHapusProgram()}
                <div className="main-content">
                    <Header title="Program" />
                    <div className="user-access tiket-program">
                        <div className="user-access-container">
                            <div className="box-status row-flex">
                                <div className="col-4 text-center">
                                    <h3 className="text-success">2</h3>
                                    <p>Disetujui</p>
                                </div>
                                <div className="col-4 text-center">
                                    <h3 className="text-info">31</h3>
                                    <p>Menunggu Persetujuan</p>
                                </div>
                                <div className="col-4 text-center">
                                    <h3>0</h3>
                                    <p>Belum Diajukan</p>
                                </div>
                                <div className="col-4 text-center">
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
                                    <div className="select-wrapper dropdown">
                                        <a href="#" className="dropdown-filter" onClick={this.toggleDropdownFilter}>
                                            Filter
                                        </a>

                                        {this.renderDropdownFilter()}
                                    </div>
                                </div>
                                <div className="pull-right">
                                    <div className="box-btn auto" onClick={this.toggleTambahProgram}>
                                        <ButtonPrimary name="Buat Program" />
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
                                                                 <div className="row-flex flex-center">
                                                                     <div className="box-btn dropdown-three">
                                                                        <div onClick={this.toggleDropdownMenu.bind(this, i) }>
                                                                            <img src="../images/icon/dropdown-three.svg" height="7"/>

                                                                            <DropdownMenu id={i} 
                                                                                toggleHapusProgram={this.toggleHapusProgram} 
                                                                            />
                                                                        </div>
                                                                     </div>
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
                                                                 <div className="box-btn dropdown-three">
                                                                    <div onClick={this.toggleDropdownMenu.bind(this, i) }>
                                                                        <img src="../images/icon/dropdown-three.svg" height="7"/>

                                                                        <DropdownMenu id={i} 
                                                                            toggleHapusProgram={this.toggleHapusProgram} 
                                                                        />
                                                                    </div>
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