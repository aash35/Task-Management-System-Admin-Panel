import auth_reducer from "./auth_reducer"
import {combineReducers} from 'redux'

const root_reducer = combineReducers({
    auth:auth_reducer
})

export default root_reducer