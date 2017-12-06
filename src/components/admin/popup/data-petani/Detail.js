import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
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
            zoom: 15
        }
    }

    _handleChange(id, value){

    }

    handleAddFamily(){
        const id = this.props.farmerId
        this.props.handleAddFamily(id)
    }

    componentDidMount(){
        console.log(this.props.img)
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
        console.log(this.props.lat)
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
                                                                        <td className="normal">{datahere.relationship_status}</td>
                                                                        <td>{datahere.name}</td>
                                                                        <td>{datahere.phone_number}</td>
                                                                        <td>{datahere.address}</td>
                                                                        <td>{datahere.birthdate}</td>
                                                                        <td className="text-center">{datahere.biological_mothers_name}</td>
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
                                    <div className="box-text">
                                        <p className="text-title">Koordinat: &nbsp;</p>
                                        <p className="lat-long">
                                            {this.props.lat === null || this.props.lat === undefined ? 0 : this.props.lat }, {this.props.lng === null || this.props.lng === undefined ? 0 : this.props.lng}
                                        </p>
                                    </div>
                                    <div style={{width: '100%', height: '250px'}}>
                                        <GoogleMapReact
                                        bootstrapURLKeys={{
                                        key: "AIzaSyCkN1_UcaTQ03AtUOnTNFTnc44I0FwMNsM"
                                        }}
                                            defaultCenter={this.state.center}
                                            defaultZoom={this.state.zoom}
                                        >
                                            <AnyReactComponent 
                                              lat={this.props.lat} 
                                              lng={this.props.lng} 
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