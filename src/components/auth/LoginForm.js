import React, { Component } from "react";
import { UpdateStatus } from "../../actions/StatusActions"
import { connect } from 'react-redux'
import M from 'materialize-css'


class LoginForm extends Component {

    state = {
        username: '',
        password: '',
        persons: []
    }

    toasthide() {
        var toastElement = document.querySelector('.toast');
        var toastInstance = M.Toast.getInstance(toastElement);
        toastInstance.dismiss();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var that = this;
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'login');
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        fetch(url, {            
            // credentials: 'include',
            method: "POST",
            body: formData
        }) 
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }
                response.json().then(function (data) {
                    // console.log(data)
                    document.getElementById("form_login").reset();
                    if (!data.error) {
                        that.props.UpdateStatus(data);
                    } else {
                        M.toast({ html: "Login Failed", displayLength: 10000 });
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

            <div onSubmit={this.handleSubmit} className="formcon" id="logincon">
                <form id="form_login" className="border-top2 row main_color_three" action="model/ws.php"
                    method="POST">
                    <h5 className="main_text">Login</h5>
                    <input type="hidden" name="error" />
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="text" className="input-boxes2" name="login_name" id="username" onChange={this.handleChange} required />
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="row input-centre">
                        <div className="input-field main_color_four col s12">
                            <input type="password" className="input-boxes2" name="pass" id="password" onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light main_color_five" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
        status: state.auth.login_state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UpdateStatus: (status) => { dispatch(UpdateStatus(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);