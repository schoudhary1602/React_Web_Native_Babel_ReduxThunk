import { combineReducers } from 'redux'
import { toggleReducer } from './toggle'
import { loginReducer } from './login'

export default combineReducers({
    toggleReducer,
    loginReducer
})