import React, { Component } from "react";
import { connect } from 'react-redux'
import { UsersActionsAdd } from "../../actions/UsersActions";
import M from 'materialize-css'

class CreateNewForm extends Component {
    validation = passed_case => e => {
        let error_message_input = e.target.parentNode.lastChild;
        var string = e.target.value;
        
        var error_message = "";
        if (passed_case === 'username') {
            if (string === "") {
                error_message = "Fill out field";
            } else if (/^[a-zA-Z0-9]{5,}$/.test(string) === false) {
                error_message = "Must be 5 characters long and can contain both letters and numbers";
            }
        }
        if (passed_case === 'select') {
            if (string === "") {
                error_message = "Fill out field";
            } else if (string <= 0 | string === null) {
                error_message = "Must select a valid option";
            }
        }
        if (passed_case === 'phone') {
            if (string === "") {
                error_message = "Fill out field";
            } else if (/^[+ ]?[( ]?[0-9 ]{3}[) ]?[-\s. ]?[0-9 ]{3}[-\s. ]?[0-9 ]{4,6}$/.test(string) === false) {
                error_message = "Must be a valid phone number";
            }
            string = string.replace("/", "");
            string = string.replace("+", "");
            string = string.replace("_", "");
            string = string.replace("-", "");
            string = string.replace("(", "");
            string = string.replace(")", "");
            string = string.replace(".", "");
            e.target.value = string;
        }
        if (passed_case === 'email') {
            if (string === "") {
                error_message = "Fill out field";
            } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(string) === false) {
                error_message = "Must be a valid email address";
            }
        }
        if (passed_case === 'name') {
            if (string === "") {
                error_message = "Fill out field";
            } else if (/^([a-zA-Z' ]+)$/.test(string) === false) {
                error_message = "Must contain only letters";
            }
        }
        // //all the checks for correct fields
      
        error_message_input.innerHTML = error_message;
        var form_loop_id = e.target.parentNode.parentNode.parentNode;
        var form_submit_button = e.target.parentNode.parentNode.parentNode.lastChild;
        
        var error_messages = form_loop_id.querySelectorAll('.error_message');
        let status_of_form = true;
        for (var i = 0; i < error_messages.length; ++i) {
            if (error_messages[i].textContent.length > 0) {
                status_of_form = false;
            }
        }
        if (status_of_form === true) {
            form_submit_button.disabled = false;
        } else if (status_of_form === false) {
            form_submit_button.disabled = true;
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var that = this;
        const newUser = {users_id: "Undefined", username:e.target.create_username.value, password:"No Password", first_name: e.target.create_first.value, 
        last_name: e.target.create_last.value, email: e.target.create_email.value, 
        phone: e.target.create_phone.value, job_type_id: e.target.job_type_user.value, access_rights: e.target.access_rights_user.value}        
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'create_new_user');
        formData.append('admin_create_new_details', JSON.stringify(newUser));
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
                        newUser.users_id = data
                        that.props.UsersActionsAdd(newUser);
                        
                        M.toast({ html: "User Created", displayLength: 10000 });
                    } else {
                        M.toast({ html: "Error", displayLength: 10000 });
                        // document.getElementById("toast-container").addEventListener("click", toasthide)
                    }
                    document.getElementById('form_create_employee').reset();
                });
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
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
                                            onChange={this.validation("username")} required />
                                        <label htmlFor="create_username">Username</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="first" id="create_first"
                                            onChange={this.validation("name")} required />
                                        <label htmlFor="create_first">First Name</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="last" id="create_last"
                                            onChange={this.validation("name")} required />
                                        <label htmlFor="create_last">Last Name</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="email" id="create_email"
                                            onChange={this.validation("email")} required />
                                        <label htmlFor="create_email">Email</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="phone" id="create_phone" onChange={this.validation("phone")} required />
                                        <label htmlFor="create_phone">Phone</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <select name="job_type_user" className="browser-default" id="job_type_user"
                                            onChange={this.validation("select")} required>
                                            {JobTypeList}
                                        </select>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <select name="access_rights_user" className="browser-default" id="access_rights_user"
                                            onChange={this.validation("select")} required>
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
        job_type: state.job_type.job_types,
        status: state.auth.login_state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UsersActionsAdd: (status) => { dispatch(UsersActionsAdd(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewForm);