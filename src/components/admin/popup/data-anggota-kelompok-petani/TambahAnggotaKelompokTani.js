import React, { Component, PropTypes } from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import InputForm from '../../../common/InputForm'
import TextArea from '../../../common/TextArea'
import { ButtonPrimary } from '../../../common/ButtonPrimary'
import '../../../../stylesheet/component/admin/_popup.scss'
import { API_URL, TK_KEY } from '../../../../containers/RootUrl'


class TambahAnggotaKelompokTani extends Component {
     constructor(props) {
        super(props)
        autoBind(this)

        this.state = {
            listFarmer: {},
            listGroup: {},
            activeFarmer: false,
            activeGroup: false
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    handleChangeFarmer(e){
        this.setState({
            farmer_id: e.target.value
        })

        if( e.target.value !== '' ){
            this.setState({activeFarmer: true})
        }
        else{
            this.setState({activeFarmer: false})
        }
    }

     handleChangeGroup(e){
        this.setState({
            farmer_group_id: e.target.value
        })

        if( e.target.value !== '' ){
            this.setState({activeGroup: true})
        }
        else{
            this.setState({activeGroup: false})
        }
    }

     handleSubmit(e){
        // const doc = document.getElementById
        e.preventDefault();
        const { cookies } = this.props;
        
        axios.post(API_URL + 'farmers/add_to_farmer_group', {
            farmer_id: this.state.farmer_id,
            farmer_group_id: this.state.farmer_group_id            
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            const data = res.data
            this.setState({data})
            console.log('succ: '+ this.state.data)
            window.location.reload();
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    componentDidMount(){
        axios.get(API_URL+ 'farmers/spinner_to_farmer_group',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            let listFarmer = res.data
            this.setState({
                listFarmer,
                listStatus: true
            })
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

        axios.get(API_URL+ 'farmer_groups/spinner_by_surveyor?active=true',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            let listGroup = res.data
            this.setState({
                listGroup,
                listFarmerGroup: true
            })
        })
        .catch((error) => {
            
        })
    }

    render() {
        let{
            listStatus,
            listFarmer,

            listFarmerGroup,
            listGroup
        } = this.state
        return (
            <div className="add-popup">
                <div className="popup-container sm">
                    <div className="box-content">
                        <div className="content">
                            <p className="title">Tambah Anggota Kelompok Tani</p>
                            <p className="sub-title">Silakan masukkan data anggota kelompok tani dengan benar.</p>
                            <div className="select-wrapper w-100">
                                 <select className={ this.state.activeFarmer ? "text-color form-control select-option w-100" : "form-control select-option w-100" } value={this.state.value} onChange={this.handleChangeFarmer}>
                                    <option value="">Pilih Petani</option>
                                    {listStatus ?
                                            listFarmer.map(farmer => 
                                            <option key={farmer.farmer_id} value={farmer.farmer_id}>{farmer.name}</option>
                                        )
                                        :
                                        null
                                     }
                                </select>
                            </div>
                            <div className="select-wrapper w-100">
                                 <select className={ this.state.activeGroup ? "text-color form-control select-option w-100" : "form-control select-option w-100" } value={this.state.value} onChange={this.handleChangeGroup}>
                                 <option value="">Pilih Kelompok Tani</option>
                                 {listFarmerGroup ?
                                        listGroup.map(group => 
                                        <option key={group.farmer_group_id} value={group.farmer_group_id}>{group.name}</option>
                                    )
                                    :
                                    null
                                 }
                                </select>
                            </div>
                            <div className="box-btn auto" onClick={this.handleSubmit}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Tambah Anggota" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.toggleTambahAnggotaKelompokTani}>
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
        );
    }
}

export default TambahAnggotaKelompokTani;
