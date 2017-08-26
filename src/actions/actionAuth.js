import axios from 'axios'
import ReactDOM from 'react-dom'
import { API_URL } from '../containers/RootUrl'
import { AUTH_REQ } from '../actions/actionTypes'
import { router } from 'react-router'

export function authReq(props){
    console.log('login clicked')
    
    return (dispatch) => {
        axios.post(API_URL + 'login', {
            username: 'admin',
            password: '123456'
        },
        {
            headers: { 'Content-Type' : 'application/json'}
        })
            .then(res => {
                
                // this.context.router.push('/');
                console.log('succ: '+ res.data)
            })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }
}
