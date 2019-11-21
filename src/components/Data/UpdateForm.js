import React, { Component } from "react";
import { connect } from 'react-redux'
import { UsersActionsUpdate } from "../../actions/UsersActions";
import M from 'materialize-css'

class UpdateForm extends Component {
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
        var that = this;
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'update_user');
        formData.append('admin_update_user', JSON.stringify(updateUser));
        formData.append('admin_user', this.props.status[0].login_state);
        fetch(url, {
            method: "POST",
            body: formData,
            credentials: 'include'
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
                        that.props.UsersActionsUpdate(updateUser);
                        M.toast({ html: "User Updated ", displayLength: 10000 });
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
                    <input name="update_id" id="update_id" hidden readOnly defaultValue={user.users_id} />
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="update_username" id="update_username"
                                defaultValue={user.username} onChange={this.validation("username")} required />
                            <label className="active" htmlFor="update_username">Username</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field main_color_four col s10">
                            <input type="text" className="input-boxes2" name="password" id="update_password" onChange={this.validation("update_pass")} readOnly value={user.password} required />
                            <label className="active" htmlFor="update_password">Password</label>
                            <div className="error_message"></div>
                        </div>
                        <button onClick={this.handlePassClick} className="btn col s2  yellow darken-2"><i className="material-icons">autorenew</i></button>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="first" id="update_first"
                                defaultValue={user.first_name} onChange={this.validation("name")} required />
                            <label className="active" htmlFor="update_first">First Name</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="last" id="update_last"
                                defaultValue={user.last_name} onChange={this.validation("name")} required />
                            <label className="active" htmlFor="update_last">Last Name</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="email" id="update_email"
                                defaultValue={user.email} onChange={this.validation("email")} required />
                            <label className="active" htmlFor="update_email">Email</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="phone" id="update_phone" defaultValue={user.phone} onChange={this.validation("phone")} required />
                            <label className="active" htmlFor="update_phone">Phone</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <select name="update_job_type_user" className="browser-default" id="update_job_type_user"
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
                                <option value="1">Manager: 1</option>
                                <option value="2">Employee: 2</option>
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
        job_type: state.job_type.job_types,
        status: state.auth.login_state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UsersActionsUpdate: (status) => { dispatch(UsersActionsUpdate(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);