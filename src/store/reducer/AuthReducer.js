const initState = {
    login_state: [
        { login_state: "asdasd" }
    ]
}

const AuthReducer = (state = initState, action) => {
    // return state
    switch (action.type) {
        case 'UPDATE_STATUS':
            if (action.status === false) {
                return {
                    ...state,
                    login_state: [{ login_state: false }]
                }

            }
            else if (action.status.length > 0) {
                return {
                    ...state,
                    login_state: [{ login_state: action.status }]
                }
            }

            break;
        default:
            return state
    }


}

export default AuthReducer