import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import '../../stylesheet/component/admin/_admin.scss'
import Header from '../common/Header'

export default class Admin extends Component{
    constructor(props){
        super(props)

        this.state = {
            dataHere: [],
            classBgColor: ''
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userName = Crypto.AES.decrypt(Base64.decode(Cookie.load('username')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userEmail = Crypto.AES.decrypt(Base64.decode(Cookie.load('email')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    componentDidMount(){
        console.log(this.authToken)
        // axios.get(API_URL + 'user_access?page=0&size=100&text=&user_role=1',{
        axios.get(API_URL + 'user_access?page=0&size=100&text=&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const dataHere = res.data.content
            this.setState({dataHere})
            console.log('data here: '+
            dataHere.map( datas => {
                return datas.email
            }))
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render(){
        const DataHere = this.state.dataHere
        let ClassBgColor = this.state.classBgColor

        return(
            <div>
                <Header title="Akses User - Admin" />
                <div className="user-access">
                    <div className="user-access-container">
                        <div className="box-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Nama</th>
                                        <th>No. KTP</th>
                                        <th>Email</th>
                                        <th>No. Telepon</th>
                                        <th>Kota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DataHere.map((datahere, i) => {
                                        if(i % 2 === 1){
                                            return(
                                                <tr key={i} className='list-grey'>
                                                    <td>{datahere.user_role_id}</td>
                                                    <td>{datahere.name}</td>
                                                    <td>{datahere.ktp_number}</td>
                                                    <td>{datahere.email}</td>
                                                    <td>{datahere.phone_number}</td>
                                                    <td>{datahere.city}</td>
                                                </tr>
                                            )
                                        }else{
                                            return(
                                                <tr key={i} >
                                                    <td>{datahere.user_role_id}</td>
                                                    <td>{datahere.name}</td>
                                                    <td>{datahere.ktp_number}</td>
                                                    <td>{datahere.email}</td>
                                                    <td>{datahere.phone_number}</td>
                                                    <td>{datahere.city}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}