import React, {Component, PropTypes} from 'react'
import { authReq } from '../actions/actionAuth'
import autoBind from 'react-autobind';
import { connect } from 'react-redux'
import App from '../components/App'
import NotFound from '../components/common/NotFound'

class LoginComp extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }
    handleSubmit(){
        console.log('submit login')
        console.log('ref '+ this.refs)
        this.props.authReq()
    }

    componentDidMount(){
        console.log('login')
    }

    render(){
        const { refs } = this.props
        return(
            <div>
                <p onClick={this.handleSubmit.bind(this, this.refs.username)}>klik lah</p>
                <form onSubmit={this.props.authReq()}>
                    <input type="text" placeholder="username" ref="username"  /><br/>
                    <input type="password" placeholder="password" ref="password"  /><br/>
                    <button type="submit">Login</button>
                </form>
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