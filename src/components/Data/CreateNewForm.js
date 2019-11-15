import React, { Component } from "react";
import { connect } from 'react-redux'
import { UsersActionsAdd } from "../../actions/UsersActions";

class CreateNewForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        var that = this;
        const newUser = {users_id: "Undefined", username:e.target.create_username.value, password:"No Password", first_name: e.target.create_first.value, 
        last_name: e.target.create_last.value, email: e.target.create_email.value, 
        phone: e.target.create_phone.value, job_type_id: e.target.job_type_user.value, access_rights: e.target.access_rights_user.value}
        that.props.UsersActionsAdd(newUser);
        
    }
    render() {
        const { formtype } = this.props;
        const { job_type } = this.props
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
                <ul className="collapsible margin_medium">
                    <li>
                        <div className="collapsible-header padding_little create_form">
                            <div className="row margin_little">Create New {formtype}</div>
                        </div>
                        <div className="collapsible-body coll_body_colour">
                            <form onSubmit={this.handleSubmit} id="form_create_employee" className="border-top2 row main_color_three"
                                action="model/ws.php" method="POST">
                                <h5 className="main_text">Add New Employee</h5>
                                <input type="hidden" name="error" />
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="create_username" id="create_username"
                                            required />
                                        <label htmlFor="create_username">Username</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="first" id="create_first"
                                            required />
                                        <label htmlFor="create_first">First Name</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="last" id="create_last"
                                            required />
                                        <label htmlFor="create_last">Last Name</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="email" id="create_email"
                                            required />
                                        <label htmlFor="create_email">Email</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="phone" id="create_phone" required />
                                        <label htmlFor="create_phone">Phone</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <select name="job_type_user" className="browser-default" id="job_type_user"
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
                    </li>
                </ul>
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
        UsersActionsAdd: (status) => { dispatch(UsersActionsAdd(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewForm);