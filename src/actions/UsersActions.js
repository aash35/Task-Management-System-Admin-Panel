export const UsersActionsSelect = (status) => {
    return {
        type:"SELECT_USERS",
        status
    }

    // return (dispatch) => {
    //     // make async calls to database here
    //     dispatch({
    //         type: "UPDATE_STATUS",
    //         status
    //     });
    // }

};

export const UsersActionsDelete = (status) => {
    return {
        type: "DELETE_USER",
        status
    }


};
export const UsersActionsAdd = (status) => {
    return {
        type: "ADD_USER",
        status
    }


};
export const UsersActionsUpdate = (status) => {
    return {
        type: "UPDATE_USER",
        status
    }


};