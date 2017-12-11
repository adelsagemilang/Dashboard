import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { API_URL, TK_KEY } from '../containers/RootUrl'
import autoBind from 'react-autobind';
import { connect } from 'react-redux'
import { hashHistory,withRouter, Redirect, router } from 'react-router';
import Cookie from 'react-cookie';
import Crypto from 'crypto-js';
import Base64 from 'base-64';
import '../stylesheet/component/_login_comp.scss'
import { ButtonPrimary } from './common/ButtonPrimary'
import InputForm from './common/InputForm'

class LoginComp extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            username: '',
            pin: '',
            error: false,
            error_resp: false
        }
    }

    handleChangeUsername(e){
        this.setState({ 
            username: e.target.value,
            error: false
        })
    }

    handleChangePassword(e){
        this.setState({ 
            pin: e.target.value,
            error: false
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const { cookies } = this.props;
        console.log('username: ' + this.state.username)
        console.log('pin: ' + this.state.pin)
        
        axios.post(API_URL + 'login', {
            username: this.state.username,
            pin: this.state.pin
        },
        {
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(res => {
            const data = res.data.token
            const userName = res.data.name
            const userLevel = res.data.user_level_name
            this.setState({data})

            Cookie.save('TK', Base64.encode(Crypto.AES.encrypt(data, TK_KEY)))
            Cookie.save('username', Base64.encode(Crypto.AES.encrypt(userName, TK_KEY)))
            Cookie.save('user_level_name', Base64.encode(Crypto.AES.encrypt(userLevel, TK_KEY)))
            this.props.history.push('/dashboard');
        })
        .catch((error) => {
            if (!error.response){
                this.setState({
                    error_resp: true
                })
            }
            else if (error.response.status === 401){
                this.setState({
                    error: true
                })
            }

        })

    }

    render(){
        
        return(
            <div className="login-comp">
                <div className="container-login">
                    <div className="box-form-login">
                        <div className="content">
                            <div className="box-typeface-image">
                            <img className="typeface-image" src="./images/img_typeface.png"/>
                            </div>
                            {/*<p className="title">Pemandu Rukman</p>*/}
                            <div className="form">
                                <form onSubmit={this.handleSubmit}>
                                    {   this.state.error ? 
                                        <p className="text-danger mg-b-10">Username dan password tidak terdaftar</p>
                                        :
                                        null
                                    }
                                    {   this.state.error_resp ? 
                                        <p className="text-danger mg-b-10 resp">Terjadi kesalahan koneksi</p>
                                        :
                                        null
                                    }
                                    <input 
                                    onChange={this.handleChangeUsername}
                                    className="add-username form-input"
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    ref="username"
                                    value={this.state.username}/><br/>

                                    <input
                                    onChange={this.handleChangePassword}
                                    className="add-paddword form-input"
                                    type="password"
                                    placeholder="Password"
                                    ref="password"
                                    value={this.state.password} /><br/>

                                    <div className="block-checkbox">
                                        <input type="checkbox" id="remember" />
                                        <label className="remember-me" htmlFor="remember">Remember Me</label>
                                    </div>
                                    <ButtonPrimary name="Login"/>
                                </form>
                            </div>
                            {/*<p className="forgot-password"><a href="">Lupa Password?</a></p>*/}
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default LoginComp