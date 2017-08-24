import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { authReq } from '../actions/actionAuth'
import autoBind from 'react-autobind';
import { connect } from 'react-redux'
import '../stylesheet/component/_login_comp.scss'
import ButtonPrimary from './common/ButtonPrimary'
import InputForm from './common/InputForm'

class LoginComp extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }
    handleSubmit(){
        console.log('submit login')
        this.props.authReq()

    }

    componentDidMount(){
        console.log('refs' + ReactDOM.findDOMNode(this.refs.username).value)
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
                                <form onSubmit={this.handleSubmit()}>
                                    <input className="add-username form-input" type="text" placeholder="Email atau Username" ref="username"  /><br/>
                                    <input className="add-paddword form-input" type="password" placeholder="Password" ref="password"  /><br/>
                                    <input className="add-checkbox" type="checkbox" placeholder="Password" ref="password"  /> <p className="remember-me">Remember Me</p> <br/>
                                    <ButtonPrimary />
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

export default connect(mapStateToProps, { authReq })( LoginComp );