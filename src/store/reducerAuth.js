import { AUTH_REQ } from '../actions/actionTypes'

// export default (state = [], action) => {
//     switch (action.type){
//         case 'FETCH_AUTH_SUCCESS' :
//             return action.auth
//         default:
//             return state
//     }
// }

const INTIAL_STATE = { message: ''}

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case AUTH_REQ:
            return {...state, message: action.payload.message}
    }
    return state
}