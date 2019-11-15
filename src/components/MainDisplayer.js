import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { UsersActionsSelect } from "../actions/UsersActions"
import { JobTypeActionsSelect } from "../actions/JobTypeActions"
import NavBar from './nav/NavBar';
import UsersDispalyer from './Data/UsersDispalyer'
import JobTypeDisplayer from './Data/JobTypeDisplayer'


import M from 'materialize-css'


class MainDisplayer extends Component {

    componentDidMount() {
        var that = this;
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'selecting_users');
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
                    console.log(data)
                    if (!data.error) {
                        that.props.UsersActionsSelect(data);
                    } else {
                        M.toast({ html: "Error", displayLength: 10000 });
                        // document.getElementById("toast-container").addEventListener("click", toasthide)
                    }
                });
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
        var formData2 = new FormData();
        formData2.append('admin', 'selecting_job_types');
        formData2.append('admin_user', this.props.status[0].login_state);
        console.log(that)
        fetch(url, {
            method: "POST",
            body: formData2,
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
                        console.log(that.props)
                        that.props.JobTypeActionsSelect(data);
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
        return (
            <BrowserRouter>
                <div>
                    <NavBar />
                    <Route exact path='/' component={UsersDispalyer} />
                    <Route path='/job_type' component={JobTypeDisplayer} />
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.auth.login_state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UsersActionsSelect: (status) => { dispatch(UsersActionsSelect(status)) },
        JobTypeActionsSelect: (status) => { dispatch(JobTypeActionsSelect(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDisplayer);
