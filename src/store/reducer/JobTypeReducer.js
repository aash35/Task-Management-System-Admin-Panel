const initState = {
    job_types: [
    ]
}

const JobTypeReducer = (state = initState, action) => {
    // return state
    switch (action.type) {
        case 'SELECT_JOBTYPES':
            return {
                ...state,
                job_types: action.status
            }
        default:
            return state
    }


}

export default JobTypeReducer