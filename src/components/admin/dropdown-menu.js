import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { Link } from 'react-router-dom'

class DropdownMenu extends Component {
     constructor(props) {
        super(props);
        autoBind(this)

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handleAjukan(){
        axios.get(API_URL + 'programs/approve/' + this.props.id_program,
        {
            headers: {
                'X-AUTH-TOKEN' : this.authToken,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            this.props.success()
        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

    render() {
        return (
            <div id={this.props.id} className="dropdown-collapse" >
                <ul className="list-unstyled">
                    <li >
                    	<Link to={'/admin/peserta-program/' + this.props.id}>Peserta Program</Link>
                    </li>
                    {
                        this.props.status === 0 ?
                        
                        (
                            <li onClick={this.handleAjukan}>
                                Ajukan Program
                            </li>
                        )
                        :
                        null
                    }
                    <li className="text-danger" onClick={this.props.HapusProgram}>Hapus</li>
                    <li onClick={this.props.TolakProgram}>Tolak</li>
                </ul>
            </div>
        );
    }
}

export default DropdownMenu;
