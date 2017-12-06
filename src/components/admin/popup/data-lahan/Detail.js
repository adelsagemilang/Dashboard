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

    render(){
        return(
            <div className="add-popup-map land">
                <div className="popup-container">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Detail Data Lahan: {this.props.name}</p>
                            <p className="sub-title mg-b-20">Berikut merupakan data lokasi dan foto diri dari lahan <b>{this.props.name}</b></p>
                            <Tabs>
                                <TabList>
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
                                    <div className="box-text">
                                        <p className="text-title pd-b-0">Koordinat: &nbsp;</p>
                                        <p className="lat-long">
                                            {this.props.lat === null || this.props.lat === undefined ? 0 : this.props.lat }, {this.props.lng === null || this.props.lng === undefined ? 0 : this.props.lng}
                                        </p>
                                        <br/>
                                        <p className="text-title">Lokasi: &nbsp;</p>
                                        <p className="lat-long">
                                            { this.props.address.toLowerCase()
                                              + ', Kel. '+ this.props.loc.village.toLowerCase()
                                              + ', Kec. '+ this.props.loc.district.toLowerCase()
                                              + ', '+ this.props.loc.city.toLowerCase()
                                              + ', '+ this.props.loc.province.toLowerCase()
                                             }
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
                                        { this.props.img === null || this.props.img === undefined ?
                                            <p>Foto belum tersedia</p>
                                            :
                                            <img src={this.props.img} alt=""/>
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