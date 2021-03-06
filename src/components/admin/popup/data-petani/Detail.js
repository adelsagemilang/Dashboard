import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import { ButtonIcon } from '../../../common/ButtonIcon'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, API_LIST_URL, TK_KEY } from '../../../../containers/RootUrl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => 
    <div style={{
        position: 'relative', color: 'white', background: 'white',
        height: 10, width: 10, borderRadius: 10,  top: -20, left: -30,
        textAlign: 'center', border:'5px solid #DD4A4A',
    }}>
        {text}
    </div>;

export default class Detail extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.state = {
            username: '',
            center: {
                lat: this.props.lat === null || this.props.lat === undefined ? 0 : this.props.lat,
                lng: this.props.lng === null || this.props.lng === undefined ? 0 : this.props.lng
            },
            zoom: 15,
            showEditLat: false
        }
    }

    toggleEditLat(){
      this.setState({
        showEditLat: !this.state.showEditLat
      })
    }

    _handleChange(id, value){

    }

    handleAddFamily(){
        const id = this.props.farmerId
        this.props.handleAddFamily(id)
    }

    handleEditLat(){
      var koor1 = document.getElementById('koordinat1').value
      var koor2 = document.getElementById('koordinat2').value
      this.setState({
        center: {
          lat: parseFloat(koor1),
          lng: parseFloat(koor2)
        }
      })
      axios.put(API_URL + 'farmers/'+ this.props.farmerId +'/update-coordinate', {
          lat : koor1,
          lng : koor2
      },
      {
          headers: {
              'X-AUTH-TOKEN' : this.authToken,
              'Content-Type' : 'application/json'
          }
      })
      .then(res => {
          this.setState({
            showEditLat: false
          })
      })
      .catch((error) => {
          console.log(error)
      })
    }

    componentDidMount(){
        axios.get(API_URL + 'farmers/' + this.props.farmerId +'/families',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const {
                dataHere = res.data,
                statusCode = res.status
            } = this
            
            this.setState({
                dataHere,
                statusCode,
                listStatus: true
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
            const statusCode = error.response.status
            const errorMessage = error.response.data
            this.setState({ statusCode,errorMessage })
        })
    }

    render(){
        return(
            <div className="add-popup-map">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Detail Data Petani: {this.props.farmerName}</p>
                            <p className="sub-title mg-b-20">Berikut merupakan data keluarga, lokasi, dan foto diri dari petani <b>{this.props.farmerName}</b></p>

                            <Tabs>
                                <TabList>
                                    <Tab>
                                        <div className="tab-title">
                                            <p>Keluarga Petani</p>
                                        </div>
                                    </Tab>
                                    <Tab>
                                        <div className="tab-title">
                                            <p>Koordinat dan Peta</p>
                                        </div>
                                    </Tab>
                                    <Tab>
                                        <div className="tab-title">
                                            <p>Foto</p>
                                        </div>
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                <div className="box-fam">
                                    <div className="text-right">
                                        <div className="box-btn auto mg-b-20" onClick={this.handleAddFamily}>
                                            <ButtonPrimary
                                                class="button-primary"
                                                type="submit"
                                                name="Tambah Anggota Keluarga" />
                                        </div>
                                    </div>
                                    <div className="user-access-container">
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
                                                <tbody>
                                                {this.state.statusCode === 204 ? (
                                                    <tr>
                                                        <td className="text-center normal pd-t-10 no-content" colSpan="6">
                                                            Tidak ada data
                                                        </td>
                                                    </tr>
                                                ) : 
                                                this.state.statusCode === 200 ? (
                                                        this.state.dataHere.map((datahere, i) => {
                                                                return(
                                                                    <tr key={i}>
                                                                        <td data-th="Status" className="normal">{datahere.relationship_status}</td>
                                                                        <td data-th="Nama">{datahere.name}</td>
                                                                        <td data-th="No. Handphone">{datahere.phone_number}</td>
                                                                        <td data-th="Alamat">{datahere.address}</td>
                                                                        <td data-th="Tempat Tanggal Lahir">{datahere.birthdate}</td>
                                                                        <td data-th="Ibu Kandung" className="text-center">{datahere.biological_mothers_name}</td>
                                                                    </tr>
                                                                )
                                                        })
                                                    ) :(
                                                        <tr>
                                                            <td colSpan="6">
                                                                <p className="text-center normal pd-t-10 no-content">Mohon Tunggu...</p>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="box-text mg-b-10">
                                        <span className="text-title">Koordinat: &nbsp;</span>
                                        <span className="lat-long">
                                            <span>{this.state.center.lat},{this.state.center.lng}</span>
                                            <div className="edit-lat" onClick={this.toggleEditLat}>
                                              <img src="../images/edit.png" alt=""/>
                                            </div>
                                        </span>
                                        {this.state.showEditLat ? 
                                          <div className="form-edit-lat">
                                              <div className="row-flex col-3 table">
                                                  <span className="text-title">Edit Koordinat Pusat:</span>
                                                  <div className="input-form mg-l-20">
                                                    <input type="text"
                                                     defaultValue={this.state.center.lat}
                                                     id="koordinat1"
                                                     className="form-control"
                                                     placeholder="Koordinat"
                                                    />
                                                  </div>
                                                  <div className="input-form mg-r-0">
                                                    <input type="text"
                                                     defaultValue={this.state.center.lng}
                                                     id="koordinat2"
                                                     className="form-control"
                                                     placeholder="Koordinat 2"
                                                    />
                                                  </div>
                                                  <div className="box-btn" onClick={this.handleEditLat}>
                                                       <ButtonIcon class="btn-outline-blue-sm" icon="icon-check-blue"/>
                                                   </div>
                                              </div>
                                          </div>
                                          : null
                                        }
                                    </div>
                                    <div style={{width: '100%', height: '250px'}}>
                                        <GoogleMapReact
                                        bootstrapURLKeys={{
                                        key: "AIzaSyCkN1_UcaTQ03AtUOnTNFTnc44I0FwMNsM"
                                        }}
                                            center={this.state.center}
                                            defaultZoom={this.state.zoom}
                                        >
                                            <AnyReactComponent 
                                              lat={this.state.center.lat} 
                                              lng={this.state.center.lng} 
                                              text={' '} 
                                            />
                                        </GoogleMapReact>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="box-foto text-center">
                                        { this.props.img === null || this.props.img === undefined || this.props.img2 === null || this.props.img2 === undefined || this.props.img3 === null || this.props.img3 === undefined || this.props.img4 === null || this.props.img4 === undefined ?
                                            <p>Foto belum tersedia</p>
                                            :
                                            <div>
                                                <img src={this.props.img} alt=""/>
                                                <img src={this.props.img2} alt=""/>
                                                <img src={this.props.img3} alt=""/>
                                                <img src={this.props.img4} alt=""/>
                                            </div>
                                        }
                                    </div>
                                </TabPanel>
                            </Tabs>
                            <div className="cancel box-btn auto" onClick={this.props.togglePopupDetail}>
                                <ButtonPrimary
                                class="button-secondary"
                                type="button"
                                name="Batal" />
                            </div>
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}