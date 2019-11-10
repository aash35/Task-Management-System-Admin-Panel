import AuthReducer from "./AuthReducer"
import UsersReducer from "./UsersReducer"
import {combineReducers} from 'redux'

const RootReducer = combineReducers({
    auth:AuthReducer,
    users:UsersReducer
})

export default RootReducer