import React, { Component } from "react";
import { connect } from 'react-redux'
import { JobTypeActionsUpdate } from "../../actions/JobTypeActions";
import M from 'materialize-css'

class UpdateFormJobType extends Component {
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
        const updateJobType = {
            job_type_id: e.target.update_job_type_id.value, 
            job_name: e.target.update_job_type_name.value, 
            job_description:e.target.update_job_type_description.value
        }
        var that = this;
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'update_job_type');
        formData.append('admin_update_job_type', JSON.stringify(updateJobType));
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
                        that.props.JobTypeActionsUpdate(updateJobType);
                        M.toast({ html: "Job Type Updated ", displayLength: 10000 });
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
        const { job_type } = this.props
        const { updatetype } = this.props;
        // console.log()

        return (
            <div>
                <form onSubmit={this.handleSubmit} id="form_update_new_job_type" className="border-top2 row main_color_three"
                    action="model/ws.php" method="POST">
                    <h5 className="main_text">Update {updatetype}</h5>
                    <input type="hidden" name="error" />
                    <input name="update_job_type_id" id="update_job_type_id" hidden readOnly defaultValue={job_type.job_type_id} />
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="update_job_type_name" id="update_job_type_name"
                                onChange={this.validation('ctype_alpha')} defaultValue={job_type.job_name} required />
                            <label className="active" htmlFor="update_job_type_name">Job Type Name:</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <textarea name="update_job_type_description" id="update_job_type_description"
                                className="materialize-textarea " onChange={this.validation('description')}
                                defaultValue={job_type.description} required></textarea>
                            <label className="active" htmlFor="update_job_type_description">Description:</label>
                            <div className="error_message"></div>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light main_color_five" type="submit" name="action"
                        >Submit
                            <i className="material-icons right">send</i>
                    </button>
                </form>
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
        JobTypeActionsUpdate: (status) => { dispatch(JobTypeActionsUpdate(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFormJobType);