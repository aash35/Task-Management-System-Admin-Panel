export const UsersActions = (status) => {
    return {
        type:"UPDATE_USERS",
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