import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Login_form from './components/auth/login_form';
import displayer from './components/admin-panel/displayer';
import NavBar from './components/nav/nav_bar';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar/>
          <Route exact path='/' component={Login_form} />
          <Route path='/admin_panel' component={displayer} />
          <Route path='/:post_id' component={displayer} />       
        </div>
      </BrowserRouter>
    );
  }
}


export default App;