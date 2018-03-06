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
//import GoogleMapReact from 'google-map-react';
import { withScriptjs, withGoogleMap, GoogleMap, Polygon } from "react-google-maps";

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
            center: this.props.lat && this.props.lng ? {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)} : {lat: 0, lng: 0},
            coords: [],
            zoom: 15,
            hideButton: false,
            showEditLat: false
        }
    }

    _handleChange(id, value){

    }

    hideButton(){
      this.setState({
        hideButton: true
      })
    }

    showButton(){
      this.setState({
        hideButton: false
      })
    }

    toggleEditLat(){
      this.setState({
        showEditLat: !this.state.showEditLat
      })
    }

    handleEditLat(){
      var koor1 = document.getElementById('koordinat1').value
      var koor2 = document.getElementById('koordinat2').value
      axios.put(API_URL + 'lands/'+this.props.landId+'/land-coordinate', {
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
            center: {
              lat: koor1,
              lng: koor2
            },
            showEditLat: false
          })
      })
      .catch((error) => {
          console.log(error)
      })
    }

    componentDidMount(){
      console.log(this.props.lat)
      var coords = this.props.geolocations
      var arrayCoords = []
      var number = 1;
      var i = 0;
      while (number<=coords.length) {
          arrayCoords.push({
                    "lat" : parseFloat(coords[i].lat),
                    "lng" : parseFloat(coords[i].lng),
          })
        number++;
        i++;       
      }
     this.setState({
        coords: arrayCoords
     })
    }

    togglePopupKoordinat(){
      this.props.togglePopupKoordinat(this.props.landId)
    }

    render(){
        const MapWithAMarker = withScriptjs(
        withGoogleMap(props => (
            <GoogleMap
              defaultCenter={this.state.center}
              defaultZoom={8}
            >
                  <Polygon 
                    path={this.state.coords}
                    options={{
                        fillColor: "transparent",
                        strokeColor: "red",
                        strokeOpacity: 1,
                        strokeWeight: 1.5
                    }}
                  />
            </GoogleMap>
         ))
        );
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
                                        <div className="tab-title" onClick={this.showButton}>
                                            <p>Koordinat dan Peta</p>
                                        </div>
                                    </Tab>
                                    <Tab>
                                        <div className="tab-title" onClick={this.hideButton}>
                                            <p>Foto</p>
                                        </div>
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="box-text">
                                        <span className="text-title pd-b-0">Koordinat Awal: &nbsp;</span>
                                        <span className="lat-long">
                                            {this.props.geolocations ? 
                                              <span>{this.state.center.lat},{this.state.center.lng}</span>
                                              : 
                                              <span>0,0</span>
                                            }
                                            <div className="edit-lat" onClick={this.toggleEditLat}>
                                              <img src="../images/edit.png" alt=""/>
                                            </div>
                                        </span>
                                        <br/>
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
                                        <div className="row-flex"> 
                                                <span className="text-title">Lokasi: &nbsp;</span>
                                                <span className="lat-long">
                                                    { this.props.address.toLowerCase()
                                                      + ', Kel. '+ this.props.loc.village.toLowerCase()
                                                      + ', Kec. '+ this.props.loc.district.toLowerCase()
                                                      + ', '+ this.props.loc.city.toLowerCase()
                                                      + ', '+ this.props.loc.province.toLowerCase()
                                                     }
                                                </span>
                                        </div>
                                    </div>
                                        
                                        <MapWithAMarker
                                          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkN1_UcaTQ03AtUOnTNFTnc44I0FwMNsM"
                                          loadingElement={<div style={{ height: `100%` }} />}
                                          containerElement={<div style={{ height: `250px` }} />}
                                          mapElement={<div style={{ height: `100%` }} />}
                                          coords={this.state.coords}
                                        />
                                        {/*
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
                                        */}
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
                            <div className="row-flex flex-sm mg-t-20 mg-l-10">
                              { this.state.hideButton ?
                                null
                                :
                                <div className="box-btn auto mg-0" onClick={this.togglePopupKoordinat}>
                                    <ButtonPrimary
                                    class="button-primary"
                                    type="button"
                                    name="Atur Koordinat" />
                                </div>
                              }
                              <div className="box-btn auto mg-0" onClick={this.props.togglePopupDetail}>
                                  <ButtonPrimary
                                  class="button-secondary"
                                  type="button"
                                  name="Batal" />
                              </div>
                            </div>
                        </div>
                        <div className="footer-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}