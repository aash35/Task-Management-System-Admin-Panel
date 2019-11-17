import React, { Component } from "react";
import { connect } from 'react-redux'
import M from 'materialize-css'
import CreateNewForm from './CreateNewForm'
import UpdateForm from './UpdateForm'
import { UsersActionsDelete } from "../../actions/UsersActions"

class UsersDisplayer extends Component {
    componentDidUpdate() {
        M.AutoInit();
    };
    handleClick = (e) =>{

        var that = this;
        const {value} = e.target;
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'delete_users');
        formData.append('admin_delete_id', value);
        formData.append('admin_user', this.props.status[0].login_state);
        fetch(url, {
            method: "POST",
            body: formData,
            // credentials: 'include'
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }
                response.json().then(function (data) {
                    if (!data.error) {
                        that.props.UsersActionsDelete(value);
                        M.toast({ html: "User Deleted", displayLength: 10000 });
                    } else {
                        M.toast({ html: "Error", displayLength: 10000 });
                        // document.getElementById("toast-container").addEventListener("click", toasthide)
                    }
                });
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }
    render() {
        const { users } = this.props
        const usersList = users.length ? (
            users.map(user => {
                return (
                    <ul className="collapsible margin_medium" key={user.users_id}>
                        <li>
                            <div className="collapsible-header padding_little coll_header_colour">
                                <div className="row margin_little">
                                    <div className="content_width">User ID: {user.users_id}</div>
                                    <div className="divide_vert"></div>
                                    <div className="content_width">Name: {user.first_name + " " + user.last_name}</div>
                                    <div className="divide_vert"></div>
                                    <div className="content_width">Username: {user.username}</div>
                                </div>
                                <div className="row margin_little">
                                    <div className="content_width">Phone: {user.phone}</div>
                                </div>
                                <div className="row margin_little">
                                    <div className="content_width">Email: {user.email}</div>
                                    <div className="divide_vert"></div>
                                    <div className="content_width">Access Rights: {user.access_rights}</div>
                                </div>
                            </div>
                            <div className="collapsible-body coll_body_colour padding_top">
                                <div className="row margin_medium">
                                    <button className="right delete_button waves-effect btn modal-trigger" data-target={"model" + user.users_id}>Delete User</button>
                                    <div  id={"model" + user.users_id} className="modal">
                                        <div className="modal-content padding_medium">
                                            <h5>Delete User: {user.users_id}</h5>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="modal-close waves-effect waves-green btn-flat" key={user.users_id} value={user.users_id} onClick={this.handleClick}>Yes</button>
                                            <div className="divide_vert"></div>
                                            <button className="modal-close waves-effect waves-green btn-flat">No</button>
                                        </div>
                                    </div>
                                </div>
                                <UpdateForm updatetype="User" user={user} />
                            </div>
                        </li>
                    </ul>
                )
            })
        ) : (
                <div className='center'>No Users Yet</div>
            )
            
        return (
            <div className="displayers">
                <div className="text_left">
                    <h6>Users:</h6>
                </div>
                <CreateNewForm formtype="User"/>
                {usersList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        status: state.auth.login_state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UsersActionsDelete: (status) => { dispatch(UsersActionsDelete(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersDisplayer);