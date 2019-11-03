const initState = {
    user: [
        {id: '1', username: 'super_admin', password: 'super_admin'}
    ],
    login_state: [
        {login_state : false}
    ]
}

const auth_reducer = (state = initState, action) => {
    return state
}

export default auth_reducer