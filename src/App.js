import React, { Component } from "react";
import './index.css';
import LoginForm from './components/auth/LoginForm';
import MainDisplayer from './components/MainDisplayer';
import { connect } from 'react-redux'



class App extends Component {
  render() {
    console.log(this.props)
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
    users: state.users.users
  }
}
export default connect(mapStateToProps)(App);