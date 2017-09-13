import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import Header from '../common/Header'
import InputForm from '../common/InputForm'
import ReactPaginate from 'react-paginate'

class AjukanProgram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataHere: [],
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
            	<div className="main-content">
                    <Header title="Ajukan Program" backprogram="true" link="/admin/program" />
                    <div className="user-access ajukan-program">
                        <div className="user-access-container">
							<div className="pd-25">
								<div className="box-top">
									<div className="row-flex">
										<div className="w-60 row-flex">
											<div className="w-33">
												<p className="strong">Judul Program</p>
												<p>Penanaman Cabai 1 Hektar</p>
											</div>
											<div className="w-33">
												<p className="strong">Kategori</p>
												<p>Sarana dan Prasarana</p>
											</div>
											<div className="w-33">
												<p className="strong">Periode</p>
												<p>20 Januari 2017 - 20 Agustus 2017</p>
											</div>
										</div>
										<div className="w-40 row-flex">
											<div className="w-50">
												<p className="strong">Model Bisnis</p>
												<p>Bagi Hasil</p>
											</div>
											<div className="w-50">
												<p className="strong">Minimal Pemberian Dana</p>
												<p>25%</p>
											</div>
										</div>
									</div>
									<div className="row-flex">
										<div className="w-60">
											<div className="pd-l-10">
												<p className="strong">Deskripsi</p>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales sollicitudin tincidunt.
												Phasellus sapien risus, aliquet vitae lacinia sit amet, pulvinar vitae erat. Praesent finibus laoreet tempus.
												Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
												</div>
										</div>
										<div className="w-40">
											<div className="pd-l-10">
												<p className="strong">Link Youtube</p>
												<a href="http://www.youtube.com/babyshark" className="text-info">www.youtube.com/babyshark</a>
											</div>
										</div>
									</div>
								</div>
								<p className="strong row-flex mg-b-10 pd-l-20">Daftar Petani Peserta Program <a href="" className="mg-l-10 text-info">(Edit)</a></p>
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
															<td className="text-center">1</td>
															<td className="text-center">1</td>
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
															<td className="text-center">1</td>
															<td className="text-center">1</td>
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

	                            <div className="pull-left row-flex">
									<div className="box-btn">
		                            <ButtonPrimary
		                                class="button-primary"
		                                type="submit"
		                                name="Ajukan Program" />
		                            </div>
		                            <div className="box-btn">
		                                <ButtonPrimary
		                                class="button-secondary"
		                                type="button"
		                                name="Batal" />
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

export default AjukanProgram;
