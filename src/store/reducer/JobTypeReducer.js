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
        case 'DELETE_JOBTYPE':
            const myjob_types = state.job_types.filter(job_type => job_type.job_type_id !== action.status);
            return {
                ...state,
                job_types: myjob_types
            }
        case 'ADD_JOBTYPE':
            const array = [...state.job_types, action.status]
            return {
                ...state,
                job_types: array
            }
        case 'UPDATE_JOBTYPE':
            const selectedJob_types = (action.status.job_type_id);
            const myupdatedjob_types = state.job_types.filter(job_type => job_type.job_type_id !== selectedJob_types);
            const arrayUpdate = [...myupdatedjob_types, action.status]
            return {
                ...state,
                job_types: arrayUpdate
            }
        default:
            return state
    }


}

export default JobTypeReducer