import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import TambahPesertaProgram from './popup/program/TambahPesertaProgram'
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

class PesertaProgram extends Component {
    constructor(props) {
        super(props);
        autoBind(this)

        this.state = {
            dataHere: [],
            toggleTambahPesertaProgram: false
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

    toggleTambahPesertaProgram(){
    	 this.setState({
    	 	toggleTambahPesertaProgram: !this.state.toggleTambahPesertaProgram
        })
    }

    renderPopupTambahPesertaProgram(){
    	if(this.state.toggleTambahPesertaProgram){
    		return(
				<TambahPesertaProgram toggleTambahPesertaProgram={this.toggleTambahPesertaProgram}/>
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

    render() {
    	const DataHere = this.state.dataHere
        let ClassBgColor = this.state.classBgColor

        return (
            <div>
            	{this.renderPopupTambahPesertaProgram()}
                <div className="main-content">
                    <Header title="Peserta Program" backprogram="true" link="/admin/program" />
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
                                    placeholder="Cari Peserta Program"
                                    class="search-item"
                                    type="text"/>
                                </div>
                                <div className="pull-right">
                                    <div className="box-btn auto" onClick={this.toggleTambahPesertaProgram}>
                                        <ButtonPrimary name="Tambah Peserta Program" />
                                    </div>
                                </div>
                            </div>

                            <div className="box-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nama Lengkap</th>
                                            <th>Kelompok Tani</th>
                                            <th>Kebutuhan Dana</th>
                                            <th>No. HP</th>
                                            <th>Keterangan Singkat</th>
                                            <th>Alasan</th>
                                            <th>Dokumen</th>
                                            <th>Lahan</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DataHere.map((datahere, i) => {
                                            if(i % 2 === 1){
                                                return(
                                                    <tr key={i} className='list-grey'>
                                                        <td>
                                                        	<p className="strong">Sri Maria</p>
                                                        	<p className="normal">382804758247502</p>
                                                        </td>
                                                        <td>Kelompok Tani Bogor</td>
                                                        <td>Rp. 100.000.000</td>
                                                        <td>087711242493</td>
                                                        <td>Lorem ipsum dolor sit
														amet, consectetur.</td>
														<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</td>
                                                        <td className="nowrap">
															<p className="text-info">Profile Petani.jpg</p>
															<p className="text-info">Profile Petani.pdf</p>
                                                        </td>
                                                        <td className="text-center">2 Lahan</td>
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
                                                        <td>
                                                        	<p className="strong">Sri Maria</p>
                                                        	<p className="normal">382804758247502</p>
                                                        </td>
                                                        <td>Kelompok Tani Bogor</td>
                                                        <td>Rp. 100.000.000</td>
                                                        <td>087711242493</td>
                                                        <td>Lorem ipsum dolor sit
														amet, consectetur.</td>
														<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</td>
                                                        <td className="nowrap">
															<p className="text-info">Profile Petani.jpg</p>
															<p className="text-info">Profile Petani.pdf</p>
                                                        </td>
                                                        <td className="text-center">2 Lahan</td>
                                                        <td>
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
        );
    }
}

export default PesertaProgram;