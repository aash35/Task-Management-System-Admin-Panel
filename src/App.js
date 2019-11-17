import React, { Component } from "react";
import './index.css';
import LoginForm from './components/auth/LoginForm';
import MainDisplayer from './components/MainDisplayer';
import { connect } from 'react-redux'



class App extends Component {
  render() {
    if (this.props.status[0].login_state.length > 0) {
      return (
        <MainDisplayer/>
      );
    } else {
      return (
        <LoginForm />
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    status: state.auth.login_state,
    users: state.users.users,
    job_types: state.job_type.job_types
  }
}
export default connect(mapStateToProps)(App);