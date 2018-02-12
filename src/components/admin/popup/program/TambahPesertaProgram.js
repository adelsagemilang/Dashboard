import React, { Component, PropTypes } from 'react';
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

class TambahPesertaProgram extends Component {
    constructor(props) {
        super(props);
        autoBind(this)

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userId = Cookie.load('user_id')

        this.state = {
            loading: false,
            arrayFile: [],
            arrayFileRes: [],
            arrayIndexCheck: []
        }
    }

    _handleChange(id, value){
        console.log('ini value: '+value)
    }

    removeItem(i){
        let array = this.state.arrayFile

        array.splice(i,1)

        this.setState({
            arrayFile: array
        })
    }

    handleCheck(id){
        var elem = document.getElementById(id)
        var index = this.state.arrayIndexCheck
        if (elem.checked){
            index.push(id)
        } else {
            index.splice(id,1)
        }
    }
        
    handleChange(e) {
        //let selDiv = document.querySelector("#selectedFiles");
        if(!e.target.files) return;
        
        let files = e.target.files;
        let arrayFile = this.state.arrayFile
        arrayFile.push(files)
        this.setState({
            statusFile: true,
            arrayFile: arrayFile
        })
    }

    handleChangeRab(e){
        this.setState({
            valueRab: e.target.value})
    }

    handleChangeRukman(e){
        let v = e.target.value
        let val = v.split(",");
        this.setState({
            valueRukman: val[0],
            valueRukmanName: val[1]}, () => {
            axios.get(API_URL+ 'farmers/spinner?query=' + this.state.valueRukman,{
                headers:{ 
                    'X-AUTH-TOKEN' : this.authToken
                }
            })
            .then(res => {
                let listfarmer = res.data
                this.setState({
                    listfarmer,
                    list_farmer: true 
                })
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
    }

    handleChangeFarmer(e){
        let v = e.target.value
        let val = v.split(",");
        this.setState({
            valueFarmer: val[0],
            valueFarmerName: val[1]
        }, () => {
            axios.get(API_URL+ 'lands/'+ this.state.valueFarmer +'/program-member',{
                headers:{ 
                    'X-AUTH-TOKEN' : this.authToken
                }
            })
            .then(res => {
                let listLahan = res.data
                this.setState({
                    listLahan,
                    statusLahan: true
                })
                
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        })
    }

    renderloading(){
        if(this.state.loading){
            return(
                <div className="add-popup" style={{zIndex: 4}}>
                    <div className="popup-container" style={{width: '500px', background: '#fff', marginTop: '50px', padding: '40px', borderRadius: '5px'}}>
                        <div className="pd-40 text-center">
                            <img src="../images/loading.gif" alt=""/>
                            <p className="mg-t-10">Mengunggah data..</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

     handleSubmit(e){
        // const doc = document.getElementById
        e.preventDefault();
        
        var formdata = new FormData()

        var files = this.state.arrayFile

        for(var i=0; i<files.length; i++) {
            this.setState({loading: true})
            var f = files[i][0]
            formdata.append("file", f)
            axios.post('http://air.qelisa.com/qelisa-program-service/programs/document/upload?path=documents&ext=pdf', formdata,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                auth: {
                        username: 'username',
                        password: 'password'
                }

            })
            .then(res => {
                let resFile = res.data
                let arrayFileRes = this.state.arrayFileRes
                arrayFileRes.push(resFile)
            })
            .catch((error) => {
                console.log('err: '+ error)
            })
        }

        var lahan = this.state.arrayIndexCheck
        var arrayLahan = []
        var number = 1;
        var i = 0;
        while (number<=lahan.length) {
            arrayLahan.push({
                      "land_id" : lahan[i],
                      "land_name" : document.getElementById('lahan-name'+lahan[i]).value,
                      "farm_area": document.getElementById('luas'+lahan[i]).value,
                      "plant_capacity": document.getElementById('jumlah'+lahan[i]).value,
                      "commodity_id": (document.getElementById('select'+lahan[i]).value).split(",")[0],
                      "commodity_name" : (document.getElementById('select'+lahan[i]).value).split(",")[1]
            })
          number++;
          i++;       
        }

        var fileres = this.state.arrayFileRes

        var post = setInterval(function(){ 
            if(files.length == fileres.length){
                axios.post(API_URL + 'programs/members', {
                          program_id: this.props.id,
                          farmer_group_id: this.state.valueRukman,
                          farmer_id: this.state.valueFarmer,
                          farmer_group_name : this.state.valueRukmanName,
                          farmer_name : this.state.valueFarmerName,
                          cost: document.getElementById('biaya').value,
                          description: document.getElementById('description').value,
                          reason: document.getElementById('reason').value,
                          documents: this.state.arrayFileRes,
                          lands: arrayLahan,
                          rab_id : this.state.valueRab
                },
                {
                    headers: {
                        'X-AUTH-TOKEN' : this.authToken,
                        'Content-Type' : 'application/json'
                    }
                })
                .then(res => {
                    clearInterval(post)
                    this.setState({
                        loading: false
                    })
                    window.location.reload()
                })
                .catch((error) => {
                    clearInterval(post)
                    this.setState({
                        loading: true
                    })
                })
            }
         }.bind(this), 3000);

    }


    componentDidMount(){
        axios.get(API_URL+ 'farmer_groups/spinner_by_surveyor?active=true',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            let listrukman = res.data
            this.setState({
                listrukman,
                list_rukman: true
            })

        })
        .catch((error) => {
            console.log('err: '+ error)
        })

        axios.get('http://air.qelisa.com/qelisa-program-service/programs/rabs/list-spinner?userId='+this.userId,{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            },
            auth: {
                username: 'username',
                password: 'password'
            }
        })
        .then(res => {
            let listrab = res.data
            this.setState({
                listrab,
                list_rab: true
            })

        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }
    


    render() {
        const { 
            list_rukman,
            listrukman,

            list_farmer,
            listfarmer

         } = this.state
        return (
            <div>
                {this.renderloading()}
                <div className="add-popup">
                    <div className="popup-container popup-peserta">
                        <div className="box-content">
                            <div className="content">
                                <p className="title">Tambah Peserta Program</p>
                                <p className="sub-title">Silahkan masukkan data peserta program.</p>
                                <div className="row-flex col-2 mg-t-10">
                                    <div className="select-wrapper">
                                         <select className="form-control select-option input-sm mg-r-10" value={ this.state.value } onChange={this.handleChangeRukman}>
                                            <option value="">Pilih kelompok tani</option>
                                            {list_rukman ?
                                                listrukman.map(rukman => 
                                                    <option
                                                        key={rukman.farmer_group_id}
                                                        value={[rukman.farmer_group_id,rukman.name]}>
                                                        {rukman.name}
                                                    </option>
                                                ) : null
                                            }
                                        </select>
                                    </div>

                                    <div className="select-wrapper">
                                         <select className="form-control select-option input-sm mg-r-10" value={ this.state.value } onChange={this.handleChangeFarmer}>
                                            <option value="">Pilih petani</option>
                                            {list_farmer ?
                                                listfarmer.map(farmer => 
                                                    <option
                                                        key={farmer.farmer_id}
                                                        value={[farmer.farmer_id,farmer.name]}>
                                                        {farmer.name}
                                                    </option>
                                                ) : null
                                            }
                                        </select>
                                    </div>

                                    <div className="select-wrapper">
                                         <select className="form-control select-option input-sm mg-r-10" value={ this.state.value } onChange={this.handleChangeRab}>
                                            <option value="">Pilih RAB</option>
                                            {this.state.list_rab ?
                                                this.state.listrab.map(rab => 
                                                    <option
                                                        key={rab.rab_id}
                                                        value={rab.rab_id}>
                                                        {rab.name}
                                                    </option>
                                                ) : null
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row-flex col-2 mg-t-10">
                                    <InputForm 
                                        inputId="biaya"
                                        type="text"
                                        placeholder="Tentukan biaya yang dibutuhkan (Rp.)"
                                        class="form-control"
                                        handleChange={this._handleChange}
                                    />
                                </div>
                                <TextArea idtextarea="description" title="Jelaskan secara singkat program anda, tidak lebih dari 140 karakter.
    								Penjelasan ini untuk membantu kami mempromosikan program anda." class="form-control"/>

    							<TextArea idtextarea="reason" title="Jelaskan dampak atau perubahan setelah program ini selesai" class="form-control"/>

    							<p className="strong">Dokumen</p>
                                
                                <div className="row-flex mg-t-5" style={{flexWrap: 'wrap'}}>
                                    { this.state.statusFile ?
                                        this.state.arrayFile.map((files,i) =>
                                            <span key={i}  style={{marginTop: '5px',marginRight: '10px', padding: '8px 20px 8px 15px', backgroundColor: '#f5f5f5', borderRadius: '5px', whiteSpace: 'nowrap', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', position: 'relative'}}>
                                                {files[0].name}
                                                <span className="delete-doc" onClick={this.removeItem.bind(this, i)}>
                                                    <img src="/images/icon/button_icon/icon_x_red.svg"/>
                                                </span>
                                            </span>
                                        )
                                        :null
                                    }
                                    <span className="btn-file mg-t-10">
                                        <img src="/images/icon/button_icon/icon_plus.svg"/> Tambah Dokumen 
                                        <input id="file" type="file" onChange={this.handleChange.bind(this)}/>
                                    </span>
                                </div>

                                <p className="strong">Lahan</p>

                                <div className="box-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nama Lahan</th>
                                                <th>Luas Tersedia</th>
                                                <th>Komoditas</th>
                                                <th>Luas Lahan Tanam</th>
                                                <th>Jumlah Pohon</th>
                                            </tr>
                                        </thead>
                                        { this.state.statusLahan ? 
                                            <tbody>
                                                {
                                                    this.state.listLahan.map((lahan,i) =>
                                                        <tr key={i}>
                                                            <td className="normal">
                                                                <input type="checkbox" id={lahan.land_id} onChange={this.handleCheck.bind(this, lahan.land_id)}/>
                                                                <label htmlFor={lahan.land_id}>{lahan.name}</label>
                                                                <input type="hidden" value={lahan.name} id={'lahan-name'+lahan.land_id}/>
                                                            </td>
                                                            <td>
                                                                {lahan.area}m<sup>2</sup>
                                                            </td>
                                                            <td>
                                                                <div className="select-wrapper">
                                                                     <select className="form-control select-option input-sm" id={'select'+lahan.land_id}>
                                                                        <option value="">Pilih Komoditas</option>
                                                                        {
                                                                            lahan.commodity ? 
                                                                                lahan.commodity.map((com,i)=>
                                                                                    <option key={i} value={[com.commodity_id,com.name]}>{com.name}</option> 
                                                                            )
                                                                            :null
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="input-form"> 
                                                                    <input
                                                                    id={'luas'+lahan.land_id} 
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Luas lahan"
                                                                    />   
                                                                </div>
                                                            </td>
                                                            <td>
                                                             <div className="input-form"> 
                                                                <input
                                                                id={'jumlah'+lahan.land_id} 
                                                                placeholder="Jumlah Pohon"
                                                                className="form-control"
                                                                type="text"
                                                                />   
                                                            </div>
                                                          </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr>
                                                    <td colSpan="5" className="text-center normal">Anda belum memiliki lahan</td>
                                                </tr>
                                            </tbody>
                                        }
                                    </table>
                                </div>

                                <div className="box-btn auto" onClick={this.handleSubmit}>
                                <ButtonPrimary
                                    class="button-primary"
                                    type="submit"
                                    name="Buat Program" />
                                </div>
                                <div className="box-btn auto" onClick={this.props.toggleTambahPesertaProgram}>
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
            </div>
        );
    }
}

export default TambahPesertaProgram;
