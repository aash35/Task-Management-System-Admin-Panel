export const JobTypeActionsSelect = (status) => {
    return {
        type:"SELECT_JOBTYPES",
        status
    }
};

export const JobTypeActionsDelete = (status) => {
    return {
        type: "DELETE_JOBTYPE",
        status
    }


};
export const JobTypeActionsAdd = (status) => {
    return {
        type: "ADD_JOBTYPE",
        status
    }


};
export const JobTypeActionsUpdate = (status) => {
    return {
        type: "UPDATE_JOBTYPE",
        status
    }


};