import React, { Component } from "react";
import { connect } from 'react-redux'
import { JobTypeActionsAdd } from "../../actions/JobTypeActions";
import M from 'materialize-css'

class CreateNewFormJobType extends Component {
    validation = passed_case => e => {
        let error_message_input = e.target.parentNode.lastChild;
        var string = e.target.value;

        var error_message = "";
        if (passed_case === 'ctype_alpha') {
            if (string === "") {
                error_message = "Fill out field";
            } else if (/^[a-zA-Z ]+$/.test(string) === false) {
                error_message = "Must contain only letters";
            }
        }
    
        if (passed_case === 'description') {
            if (string === "") {
                error_message = "Fill out field";
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
        const newJobType = {
            job_type_id: "Undefined", job_name: e.target.job_type_name.value, description:e.target.job_type_description.value
        }
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'create_new_job_type');
        formData.append('admin_create_new_job_type_details', JSON.stringify(newJobType));
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
                        newJobType.job_type_id = data
                        that.props.JobTypeActionsAdd(newJobType);
                        M.toast({ html: "Job Type Created", displayLength: 10000 });
                    } else {
                        M.toast({ html: "Error", displayLength: 10000 });
                        // document.getElementById("toast-container").addEventListener("click", toasthide)
                    }
                    document.getElementById('form_create_new_job_type').reset();
                });
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }
    render() {
        const { formtype } = this.props;
        return (
            <div>
                <ul className="collapsible margin_medium">
                    <li>
                        <div className="collapsible-header padding_little create_form">
                            <div className="row margin_little">Create New {formtype}</div>
                        </div>
                        <div className="collapsible-body coll_body_colour">
                            <form onSubmit={this.handleSubmit} id="form_create_new_job_type" className="border-top2 row main_color_three"
                                action="model/ws.php" method="POST">
                                <h5 className="main_text">Add New Job Type</h5>
                                <input type="hidden" name="error" />
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <input type="text" className="input-boxes2" name="job_type_name" id="job_type_name"
                                            onChange={this.validation('ctype_alpha')} required />
                                        <label htmlFor="job_type_name">Job Type Name:</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <div className="row input-centre">
                                    <div className="input-field main_color_four col s12">
                                        <textarea name="job_type_description" id="job_type_description"
                                            className="materialize-textarea " onChange={this.validation('description')}
                                            required></textarea>
                                        <label htmlFor="job_type_description">Description:</label>
                                        <div className="error_message"></div>
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light main_color_five" type="submit" name="action"
                                    disabled>Submit
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
        status: state.auth.login_state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        JobTypeActionsAdd: (status) => { dispatch(JobTypeActionsAdd(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewFormJobType);