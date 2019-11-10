import React, { Component } from "react";

class UsersDisplayer extends Component {
    
    render() {
        return ( 
            <div>
                <h1>User</h1>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

export default UsersDisplayer;