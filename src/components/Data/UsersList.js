import React, { Component } from "react";
import { connect } from 'react-redux'
import UpdateForm from './UpdateForm'

class UsersList extends Component {
    render() {
        const { users } = this.props
        users.length ? (
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
                                    <div id={"model" + user.users_id} className="modal">
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
                                <UpdateForm updatetype="User" />
                            </div>
                        </li>
                    </ul>
                )

            })
        ) : (
                <div className='center'>No Posts Yet</div>
            )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

export default connect(mapStateToProps)(UsersList);