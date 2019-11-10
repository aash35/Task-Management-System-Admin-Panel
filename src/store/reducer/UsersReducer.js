const initState = {
    users: []
}

const UsersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_USERS':
            return {
                ...state,
                users: [action.status]
            }
        default:
            return state
    }
}

export default UsersReducer