import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { API_URL, TK_KEY } from '../containers/RootUrl'
import actionAuth, { authReq } from '../actions/actionAuth'
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
            password: '',
            user: {}
        }
    }

    handleChangeUsername(e){
        this.setState({ username: e.target.value })
    }

    handleChangePassword(e){
        this.setState({ password: e.target.value })
    }

    handleSubmit(e){
        e.preventDefault();
        // this.props.authReq()
        const { cookies } = this.props;
        console.log('username: ' + this.state.username)
        console.log('password: ' + this.state.password)
        
        axios.post(API_URL + 'login', {
            username: this.state.username,
            password: this.state.password
        },
        {
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(res => {
            const data = res.data.token
            const userName = res.data.user.name
            const userEmail = res.data.user.email
            this.setState({data})
            console.log('succ: '+ this.state.data)

            Cookie.save('TK', Base64.encode(Crypto.AES.encrypt(data, TK_KEY)))
            Cookie.save('username', Base64.encode(Crypto.AES.encrypt(userName, TK_KEY)))
            Cookie.save('email', Base64.encode(Crypto.AES.encrypt(userEmail, TK_KEY)))
            this.props.history.push('/dashboard');
        })
        .catch((error) => {
            console.log('err: '+ error)
        })

    }

    componentDidMount(){
        console.log(window.location.pathname)
    }

    render(){
        
        return(
            <div className="login-comp">
                <div className="container-login">
                    <div className="box-form-login">
                        <div className="content">
                            <div className="box-typeface-image">
                                <img className="typeface-image" src="./images/img_typeface.svg" />
                            </div>
                            <p className="title">Pemandu Rukman</p>
                            <div className="form">
                                <form onSubmit={this.handleSubmit}>
                                    <input 
                                    onChange={this.handleChangeUsername}
                                    className="add-username form-input"
                                    name="username"
                                    type="text"
                                    placeholder="Email atau Username"
                                    ref="username"
                                    value={this.state.username}/><br/>

                                    <input
                                    onChange={this.handleChangePassword}
                                    className="add-paddword form-input"
                                    type="password"
                                    placeholder="Password"
                                    ref="password"
                                    value={this.state.password} /><br/>

                                    <input
                                    className="add-checkbox"
                                    type="checkbox"
                                    placeholder="Password"
                                    ref="password"  />
                                    <p className="remember-me">Remember Me</p> <br/>
                                    <ButtonPrimary name="Login"/>
                                </form>
                            </div>
                            <p className="forgot-password"><a href="">Lupa Password?</a></p>
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

// export default connect(mapStateToProps, { authReq })( LoginComp );
// export default withRouter(LoginComp)
// export default withRouter(LoginComp)
export default LoginComp