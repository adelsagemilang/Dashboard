import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import { ButtonIcon } from '../../../common/ButtonIcon'
import { API_URL, API_LIST_URL, TK_KEY } from '../../../../containers/RootUrl'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'

class Koordinat extends Component {
    constructor(props) {
        super(props);
        autoBind(this)

        this.state = {
            dataHere: false
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handlePageClick(dataHere){
        let selected = dataHere.selected

        axios.get(API_URL + 'lands/'+this.props.id+'/geolocations?page='+ selected +'&size=5&text=',{
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

    appendObjTo(thatArray, objToAppend) {
        return Object.freeze(thatArray.concat(objToAppend))
    }

    handleAdd(){
        var geo = []
        var koor1 = document.getElementById('koordinat1').value
        var koor2 = document.getElementById('koordinat2').value
        geo.push({
            "lat" : koor1,
            "lng" : koor2
        })
        axios.post(API_URL + 'lands/add-geo-location', {
            land_id: this.props.id,
            geolocations: geo
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            var datahere = this.state.dataHere
            var result = this.appendObjTo(datahere, geo)
            this.setState({dataHere: result},function(){
                document.getElementById('koordinat1').value = ""
                document.getElementById('koordinat2').value = ""
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentDidMount(){
        axios.get(API_URL + 'lands/'+this.props.id+'/geolocations?page=0&size=5&text=',{
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
            console.log(res.data.content)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render() {
        return (
             <div className="add-popup-map koordinat">
                <div className="popup-container md">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Koordinat: Lahan Pipit Chandra</p>
                            <p className="sub-title">Silahkan isi koordinat dengan benar!</p>
                            <div className="row-flex col-3 table">
                                <div className="input-form mg-l-20">
									<input type="text"
									 id="koordinat1"
									 className="form-control"
									 placeholder="Koordinat"
									/>
                                </div>
                                <div className="input-form mg-r-0">
									<input type="text"
									 id="koordinat2"
									 className="form-control"
									 placeholder="Koordinat 2"
									/>
                                </div>
                                <div className="box-btn" onClick={this.handleAdd}>
                                     <ButtonIcon class="btn-primary-sm" icon="icon-plus"/>
                                 </div>
                            </div>

                            <div className="user-access-container">
                                <div className="box-table mg-t-15">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Longitude</th>
                                                <th className="text-left">Latitude</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.dataHere ? 
                                                (
                                                this.state.totalElements !== 0 ?
                                                    this.state.dataHere.map((datahere, i) => {
                                                        return(
                                                        <tr key={i}>
                                                            <td data-th="Longitude" className="normal">{datahere.lat}</td>
                                                            <td data-th="Latitude">{datahere.lng}</td>
                                                        </tr>
                                                        )
                                                     })
                                                
                                                :
                                                <tr>
                                                    <td colSpan="2" className="text-center normal">Belum ada koordinat</td>
                                                </tr>
                                                )
                                            :
                                            <tr>
                                                <td colSpan="2" className="text-center normal">Loading..</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="box-footer-table">
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
                            
                            {/*<div className="box-btn auto mg-l-20" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Simpan Koordinat" />
                            </div>*/}
                            <div className="box-btn auto mg-l-20" onClick={this.props.togglePopupKoordinat}>
                                <ButtonPrimary
                                class="button-secondary"
                                type="button"
                                name="Tutup" />
                            </div>
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Koordinat;
