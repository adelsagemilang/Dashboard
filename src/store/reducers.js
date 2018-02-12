import { combineReducers } from 'redux'
import reducerAuth from '../store/reducerAuth'

const rootReducer = combineReducers({
    auth: reducerAuth
})
export default rootReducer