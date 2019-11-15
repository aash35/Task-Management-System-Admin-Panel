const initState = {
    users: []
}

const UsersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SELECT_USERS':
            return {
                ...state,
                users: action.status
            }
        case 'DELETE_USER':
            const myusers = state.users.filter(user => user.users_id !== action.status);
            return {
                ...state,
                users: myusers
            }
        case 'ADD_USER':
            const array = [...state.users, action.status]
            return {
                ...state,
                users: array
            }
        case 'UPDATE_USER':
            const selectedUser =(action.status.users_id);
            const myupdatedusers = state.users.filter(user => user.users_id !== selectedUser);
            const arrayUpdate = [...myupdatedusers, action.status]
            return {
                ...state,
                users: arrayUpdate
            }
        default:
            return state
    }
}

export default UsersReducer