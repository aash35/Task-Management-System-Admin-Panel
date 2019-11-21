import React, { Component } from "react";
import { connect } from 'react-redux'
import M from 'materialize-css'
import CreateNewFormJobType from './CreateNewFormJobType'
import UpdateFormJobType from './UpdateFormJobType'
import { JobTypeActionsDelete } from "../../actions/JobTypeActions"

class JobTypeDisplayer extends Component {
    componentDidLoad() {
        M.AutoInit();
    };
    componentDidMount() {
        M.AutoInit();
    };
    componentDidUpdate() {
        M.AutoInit();
    };
    handleClick = (e) => {
        var that = this;
        const { value } = e.target;
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'delete_job_type');
        formData.append('admin_delete_id', value);
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
                        that.props.JobTypeActionsDelete(value);
                        M.toast({ html: "Job Type Deleted", displayLength: 10000 });
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
        const job_typeList = job_type.length ? (
            job_type.map(job_type => {
                return (
                    <ul className="collapsible margin_medium" key={job_type.job_type_id}>
                        <li>
                            <div className="collapsible-header padding_little coll_header_colour">
                                <div className="row margin_little">
                                    <div className="content_width">Job Type ID: {job_type.job_type_id}</div>
                                    <div className="divide_vert"></div>
                                    <div className="content_width">Job Type Name: {job_type.job_name}</div>
                                </div>
                                <div className="row description_top">
                                    <div className="content_width">Description: {job_type.description}</div>
                                </div>
                            </div>
                            <div className="collapsible-body coll_body_colour padding_top">
                                <div className="row margin_medium">
                                    <button className="right delete_button waves-effect btn modal-trigger" data-target={"model" + job_type.job_type_id}>Delete Job Type</button>
                                    <div id={"model" + job_type.job_type_id} className="modal">
                                        <div className="modal-content padding_medium">
                                            <h5>Delete User: {job_type.job_type_id}</h5>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="modal-close waves-effect waves-green btn-flat" key={job_type.job_type_id} value={job_type.job_type_id} onClick={this.handleClick}>Yes</button>
                                            <div className="divide_vert"></div>
                                            <button className="modal-close waves-effect waves-green btn-flat">No</button>
                                        </div>
                                    </div>
                                </div>
                                <UpdateFormJobType updatetype="Job Type" job_type={job_type} />
                            </div>
                        </li>
                    </ul>
                )
            })
        ) : (
                <div className='center'>No Job Types Yet</div>
            )
        return (
            <div className="displayers">
                <div className="text_left">
                    <h6>Job Type:</h6>
                </div>
                <CreateNewFormJobType formtype="Job Type" />
                {job_typeList}
            </div>
        );
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
        JobTypeActionsDelete: (status) => { dispatch(JobTypeActionsDelete(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobTypeDisplayer);