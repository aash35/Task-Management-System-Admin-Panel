import AuthReducer from "./AuthReducer"
import UsersReducer from "./UsersReducer"
import JobTypeReducer from "./JobTypeReducer"
import {combineReducers} from 'redux'

const RootReducer = combineReducers({
    auth:AuthReducer,
    users:UsersReducer,
    job_type:JobTypeReducer
})

export default RootReducer