import React, { Component } from "react";
import {connect} from 'react-redux'

class Login_form extends Component {
    
    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // const submitAction = {type: 'CHECK_SUBMIT', this.state }
        console.log(this.state);
    }
    render() {
        console.log(this.props)
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
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(Login_form);