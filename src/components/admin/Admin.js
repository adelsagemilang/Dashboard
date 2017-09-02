import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import '../../stylesheet/component/admin/_admin.scss'

export default class Admin extends Component{
    constructor(props){
        super(props)
        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userName = Crypto.AES.decrypt(Base64.decode(Cookie.load('username')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userEmail = Crypto.AES.decrypt(Base64.decode(Cookie.load('email')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    componentDidMount(){
        
        console.log(this.authToken)
        axios.get(API_URL + 'user_access?page=0&size=100&text=&user_role=1',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const data = res.data.content
            this.setState({data})
            console.log('data here: '+data)
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render(){
        return(
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
                                <tr>
                                    <td>User ID</td>
                                    <td>Nama</td>
                                    <td>No. KTP</td>
                                    <td>Email</td>
                                    <td>No. Telepon</td>
                                    <td>Kota</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}