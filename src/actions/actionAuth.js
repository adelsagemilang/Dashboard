import axios from 'axios'
import ReactDOM from 'react-dom'
import { API_URL } from '../containers/RootUrl'
import { AUTH_REQ } from '../actions/actionTypes'
import { router } from 'react-router';

export function authReq(){
    console.log('login clicked')
    console.log('ref '+ this)
    
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

// export function authReq(){
//     console.log('login clicked')
//     return (dispatch) => {
//         axios.get(API_URL)
//             .then(res => {
//                 dispatch({
//                     type: AUTH_REQ,
//                     payload: res.data
//                 })

//                 // this.context.router.push('/');
//                 console.log('succ: '+ res.data)
//             })
//         .catch((error) => {
//             console.log('err: '+ error)
//         })
//     }
// }