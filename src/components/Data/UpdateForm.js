import React, { Component } from "react";
import { connect } from 'react-redux'
import { UsersActionsUpdate } from "../../actions/UsersActions";

class UpdateForm extends Component {
    handlePassClick = (e) => {
        e.preventDefault();
        if (e.currentTarget.parentNode.firstChild.firstChild.value === "***") {
            e.currentTarget.parentNode.firstChild.firstChild.value = "No Password"
        } else {
            e.currentTarget.parentNode.firstChild.firstChild.value = "***"
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var that = this;
        const updateUser = {
            users_id: e.target.update_id.value, 
            username: e.target.update_username.value, 
            password: e.target.update_password.value, 
            first_name: e.target.update_first.value,
            last_name: e.target.update_last.value, 
            email: e.target.update_email.value,
            phone: e.target.update_phone.value, 
            job_type_id: e.target.update_job_type_user.value, 
            access_rights: e.target.access_rights_user.value
        }
        that.props.UsersActionsUpdate(updateUser);

    }

    render() {
        const { user } = this.props
        const { updatetype } = this.props;
        const { job_type } = this.props;

        const JobTypeList = job_type.length ? (
            job_type.map(job_type_details => {
                return (
                    <option key={job_type_details.job_type_id} value={job_type_details.job_type_id}>{job_type_details.job_name}</option>
                )
            })
        ) : (
                <option disabled>No Job Types</option>
            )

        return (
            <div>
                <form onSubmit={this.handleSubmit} id="form_update_user" className="border-top2 row main_color_three"
                    action="model/ws.php" method="POST">
                    <h5 className="main_text">Update {updatetype}</h5>
                    <input type="hidden" name="error" />
                    <input name="update_id" id="update_id" hidden  defaultValue={user.users_id}/>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="update_username" id="update_username"
                                defaultValue={user.username} required />
                            <label className="active" htmlFor="update_username">Username</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field main_color_four col s10">
                            <input type="text" className="input-boxes2" name="password" id="update_password" readOnly value={user.password} required />
                            <label className="active" htmlFor="update_password">Password</label>
                            <div className="error_message"></div>
                        </div>
                        <button onClick={this.handlePassClick} className="btn col s2  yellow darken-2"><i className="material-icons">autorenew</i></button>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="first" id="update_first"
                                defaultValue={user.first_name} required />
                            <label className="active" htmlFor="update_first">First Name</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="last" id="update_last"
                                defaultValue={user.last_name} required />
                            <label className="active" htmlFor="update_last">Last Name</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="email" id="update_email"
                                defaultValue={user.email} required />
                            <label className="active" htmlFor="update_email">Email</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="phone" id="update_phone" defaultValue={user.phone} required />
                            <label className="active" htmlFor="update_phone">Phone</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <select name="update_job_type_user" className="browser-default" id="update_job_type_user"
                                required>
                                {JobTypeList}
                            </select>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <select name="access_rights_user" className="browser-default" id="access_rights_user"
                                required>
                                <option value="1">Employee: 1</option>
                                <option value="2">Manager: 2</option>
                                <option value="3">Admin: 3</option>
                            </select>
                            <div className="error_message"></div>
                        </div>
                    </div>

                    <button className="btn waves-effect waves-light main_color_five" type="submit"
                        name="action">Submit
                            <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        job_type: state.job_type.job_types
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UsersActionsUpdate: (status) => { dispatch(UsersActionsUpdate(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);