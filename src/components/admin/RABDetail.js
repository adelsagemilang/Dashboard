import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_QELISA_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import InputForm from '../common/InputForm'

import Success from './popup/common-popup/Success'
import HapusData from './popup/common-popup/HapusData'

import EditRab from './popup/RAB/EditRab'

export default class RABDetail extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            dataHere: false,
            searchNull: true,
            salinRab: false,
            togglePopUpEdit: false,
            toggleDeletePopup: false,
            toggleDeletePopupItem: false,
            entriPage: []
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    _handleChange(id, value){
        if(id == 'qty'){
            var total = value*document.getElementById('biaya').value
            this.setState({
                total
            })
        } else if (id == 'biaya'){
            var total = value*document.getElementById('qty').value
            this.setState({
                total
            })
        }
    }

    handleChangeEditQty(i){
        var cur_qty_id = 'qty_input'+i
        var cur_harga_id = 'harga_input'+i
        var total = document.getElementById(cur_qty_id).value*document.getElementById(cur_harga_id).value
        document.getElementById('subtotal_value'+i).innerHTML = total
        this.setState({total})
    }

    handleChangeEditHarga(i){
        var cur_qty_id = 'qty_input'+i
        var cur_harga_id = 'harga_input'+i
        var total = document.getElementById(cur_harga_id).value*document.getElementById(cur_qty_id).value
        document.getElementById('subtotal_value'+i).innerHTML = total
        this.setState({total})
    }

    handleEdit(key){
        document.getElementById('item'+key).style.display = "none";
        document.getElementById('item_form'+key).style.display = "table";
        document.getElementById('qty'+key).style.display = "none";
        document.getElementById('qty_form'+key).style.display = "table";
        document.getElementById('satuan'+key).style.display = "none";
        document.getElementById('satuan_form'+key).style.display = "block";
        document.getElementById('harga'+key).style.display = "none";
        document.getElementById('harga_form'+key).style.display = "table";
        document.getElementById('subtotal'+key).style.display = "none";
        document.getElementById('subtotal_input'+key).style.display = "block";
        document.getElementById('aksi'+key).style.display = "none";
        document.getElementById('aksi_input'+key).style.display = "flex";
    }

    handleDismissEdit(key){
        document.getElementById('item'+key).style.display = "block";
        document.getElementById('item_form'+key).style.display = "none";
        document.getElementById('qty'+key).style.display = "block";
        document.getElementById('qty_form'+key).style.display = "none";
        document.getElementById('satuan'+key).style.display = "block";
        document.getElementById('satuan_form'+key).style.display = "none";
        document.getElementById('harga'+key).style.display = "block";
        document.getElementById('harga_form'+key).style.display = "none";
        document.getElementById('subtotal'+key).style.display = "block";
        document.getElementById('subtotal_input'+key).style.display = "none";
        document.getElementById('aksi'+key).style.display = "flex";
        document.getElementById('aksi_input'+key).style.display = "none";
    }

    handleSubmitEditItem(i){
        axios.put(API_QELISA_URL + 'public/program/rab/'+this.props.match.params.id+'/detail', {
            rab_id : this.props.match.params.id,
            item : document.getElementById('item_input'+i).value,
            qty : document.getElementById('qty_input'+i).value,
            unit : document.getElementById('satuan_input'+i).value,
            price : document.getElementById('harga_input'+i).value,
            subtotal : this.state.total
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            },
            auth: {
                username: 'username',
                password: 'password'
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    edit(){
        this.setState({
            togglePopUpEdit: true
        })
    }

    toggleAdd(){
        this.setState({
            toggleAdd: true
        })
    }

    togglePopUpEdit(){
        this.setState({
            togglePopUpEdit: !this.state.togglePopUpEdit
        })
    }

    toggleDeletePopup(){
        this.setState({
            toggleDeletePopup : !this.state.toggleDeletePopup
        })
    }

    toggleDeletePopupItem(){
        this.setState({
            toggleDeletePopupItem : !this.state.toggleDeletePopupItem
        })
    }

    renderPopUpEdit(){
        if(this.state.togglePopUpEdit){
            return (
                <EditRab 
                    name={this.state.dataHere.name}
                    togglePopUpEdit={this.togglePopUpEdit}
                />
            )
        }
    }

    handleDeleteRAB(id, name){
        this.setState({
            id: id,
            name: name,
            toggleDeletePopup: !this.state.toggleDeletePopup
        })
    }

    handleDeleteItem(id, name){
        this.setState({
            id_item: id,
            name_item: name,
            toggleDeletePopupItem: !this.state.toggleDeletePopupItem
        })
    }

    handleDelete(){
        this.setState({
            toggleAdd: false,
            total: 0
        })
        document.getElementById('item').value = ''
        document.getElementById('qty').value = ''
        document.getElementById('biaya').value = ''
        document.getElementById('satuan').selectedIndes = 0
    }

    handleSubmit(e){
        e.preventDefault()
        
        axios.post(API_QELISA_URL + 'public/program/rab/detail', {
            rab_id : this.props.match.params.id,
            item : document.getElementById('item').value,
            qty : document.getElementById('qty').value,
            unit : document.getElementById('satuan').value,
            price : document.getElementById('biaya').value,
            subtotal : this.state.total
        },
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            },
            auth: {
                username: 'username',
                password: 'password'
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    renderPopupDelete(){
        if (this.state.toggleDeletePopup){
            return (
                <HapusData 
                    title="Hapus RAB"
                    url={'public/program/rab/'+this.state.id+'/delete'}
                    name={this.state.name}
                    qelisa={true}
                    toggleDeletePopup={this.toggleDeletePopup} 
            />
            )
        }
    }

    renderPopupDeleteItem(){
        if (this.state.toggleDeletePopupItem){
            return (
                <HapusData 
                    title="Hapus Item RAB"
                    url={'public/program/rab/'+this.state.id_item+'/delete'}
                    name={this.state.name_item}
                    qelisa={true}
                    toggleDeletePopup={this.toggleDeletePopupItem} 
            />
            )
        }
    }

    componentDidMount(){
        axios.get(API_QELISA_URL + '/public/program/rab/'+this.props.match.params.id+'/detail',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            },
            auth:{
                username: 'username',
                password: 'password'
            }
        })
        .then(res => {
            const dataHere = res.data !== '' ? res.data : true
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

    render(){
        const DataHere = this.state.dataHere

        return(
            <div id="outer-container">
                {this.renderPopupDelete()}
                {this.renderPopupDeleteItem()}
                {this.renderPopUpEdit()}
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.png" height="35"/>
                    </div>
                    <Header title="Rencana Anggaran Tanam (RAB)" />
                        <div className="user-access rab-detail">
                            <div className="user-access-container">
                                <div className="box-top row-flex flex-space">
                                    <div className="pull-left">
                                        <h4 className="text-info">{DataHere.name}</h4>
                                        <div className="edit-rab" onClick={this.edit}>
                                            <span>
                                                <img src="../images/edit.png" alt=""/>
                                            </span>
                                            <span>Ubah nama RAB</span>
                                        </div>
                                    </div>
                                    <div className="pull-right">
                                        <div className="box-btn auto" onClick={this.handleDeleteRAB.bind(this, this.props.match.params.id, DataHere.name)}>
                                            <ButtonPrimary name="Hapus RAB" class="button-danger" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="box-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Kuantitas</th>
                                                <th>Satuan</th>
                                                <th>Harga</th>
                                                <th>Subtotal</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                       
                                        <tbody>
                                                { DataHere.details ?
                                                    DataHere.details.map((datahere, i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td>
                                                                <p id={'item'+i}>{datahere.item}</p>
                                                                <div id={'item_form'+i} className="input-form" style={{display: 'none'}}>
                                                                    <input type="text"
                                                                        id={'item_input'+i}
                                                                        placeholder="Tuliskan Item"
                                                                        className="form-control"
                                                                        defaultValue={datahere.item}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p id={'qty'+i}>{datahere.qty.toLocaleString()}</p>
                                                                <div id={'qty_form'+i} className="input-form" style={{display: 'none'}}>
                                                                    <input type="text"
                                                                        id={'qty_input'+i}
                                                                        onChange={this.handleChangeEditQty.bind(this, i)}
                                                                        placeholder="Tuliskan Kuantitas"
                                                                        className="form-control"
                                                                        defaultValue={datahere.qty}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p id={'satuan'+i}>{datahere.unit}</p>
                                                                <div id={'satuan_form'+i} className="select-wrapper" style={{display: 'none'}}>
                                                                    <select id={'satuan_input'+i} className="form-control select-option input-sm w-100 pd-r-40" value={this.state.value}>
                                                                        <option value={datahere.unit}>{datahere.unit}</option>
                                                                        <option value="KG">Kg</option>
                                                                        <option value="TON">Ton</option>
                                                                    </select>
                                                                 </div>
                                                            </td>
                                                            <td>
                                                                <p id={'harga'+i}>Rp. {datahere.price.toLocaleString()}</p>
                                                                <div id={'harga_form'+i} className="input-form" style={{display: 'none'}}>
                                                                    <input type="text"
                                                                        id={'harga_input'+i}
                                                                        onChange={this.handleChangeEditHarga.bind(this, i)}
                                                                        placeholder="Tuliskan Harga"
                                                                        className="form-control"
                                                                        defaultValue={datahere.price}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p id={'subtotal'+i}>Rp. {datahere.subtotal.toLocaleString()}</p>
                                                                <p id={'subtotal_input'+i} style={{display: 'none'}}>Rp. <span id={'subtotal_value'+i}>{datahere.subtotal}</span></p>
                                                            </td>
                                                            <td>
                                                                <div id={'aksi'+i} className="row-flex flex-center flex-xs">
                                                                    <div className="box-btn" onClick={this.handleEdit.bind(this,i)}>
                                                                        <ButtonIcon class="btn-outline-sm" icon="icon-create"/>
                                                                    </div>
                                                                     <div className="box-btn" onClick={this.handleDeleteItem.bind(this, datahere.rab_detail_id, datahere.item)}>
                                                                         <ButtonIcon class="btn-red-sm" icon="icon-delete"/>
                                                                     </div>
                                                                </div> 
                                                                <div id={'aksi_input'+i} className="row-flex flex-center flex-xs" style={{display: 'none'}}>
                                                                    <div className="box-btn auto" onClick={this.handleSubmitEditItem.bind(this,i)}>
                                                                        <ButtonIcon class="btn-outline-blue-sm" icon="icon-check-blue" />
                                                                    </div>
                                                                     <div className="box-btn" onClick={this.handleDismissEdit.bind(this,i)}>
                                                                         <ButtonIcon class="btn-outline-red-sm" icon="icon-delete-red"/>
                                                                     </div>
                                                                </div> 
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : null
                                                }
                                                {
                                                    this.state.toggleAdd ? 
                                                        <tr>
                                                            <td>
                                                                <InputForm 
                                                                    inputId="item"
                                                                    handleChange={this._handleChange}
                                                                    type="text"
                                                                    placeholder="Tuliskan Item"
                                                                    class="form-control"
                                                                />
                                                            </td>
                                                             <td>
                                                                <InputForm 
                                                                    inputId="qty"
                                                                    handleChange={this._handleChange}
                                                                    type="text"
                                                                    placeholder="Tuliskan Kuantitas"
                                                                    class="form-control"
                                                                />
                                                            </td>
                                                            <td>
                                                                 <div className="select-wrapper">
                                                                    <select id="satuan" className="form-control select-option input-sm w-100 pd-r-40" value={this.state.value}>
                                                                        <option value="">Pilih Satuan</option>
                                                                        <option value="KG">Kg</option>
                                                                        <option value="TON">Ton</option>
                                                                    </select>
                                                                 </div>
                                                            </td>
                                                            <td>
                                                                <InputForm 
                                                                    inputId="biaya"
                                                                    handleChange={this._handleChange}
                                                                    type="text"
                                                                    placeholder="Tuliskan Harga"
                                                                    class="form-control"
                                                                />
                                                            </td>
                                                            <td>
                                                                <p className="text-info bold">Rp. {this.state.total ? this.state.total : '0'}</p>
                                                            </td>
                                                            <td>
                                                                <div className="row-flex flex-center flex-xs">
                                                                    <div className="box-btn auto" onClick={this.handleSubmit}>
                                                                        <ButtonIcon class="btn-outline-blue-sm" icon="icon-check-blue" />
                                                                    </div>
                                                                     <div className="box-btn" onClick={this.handleDelete}>
                                                                         <ButtonIcon class="btn-outline-red-sm" icon="icon-delete-red"/>
                                                                     </div>
                                                                </div> 
                                                            </td>
                                                        </tr>
                                                    : null
                                                }
                                                
                                        </tbody>
                                    </table>
                                </div>
                                <div className="box-footer-table row-flex">
                                    <div className="footer-table rab pull-left">
                                        <p className="text-footer">Total <span className="text-info">Rp. 400.000</span></p>
                                    </div>

                                    <div className="footer-table rab pull-right">
                                        <div className="box-btn auto" onClick={this.toggleAdd}>
                                            <ButtonPrimary name="Tambah Item"/>
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