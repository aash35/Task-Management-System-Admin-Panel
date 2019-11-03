import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import { Admin, Resource, EditGuesser } from "react-admin";
import { UserList } from './components/admin-panel/users';
import Login_form from './components/auth/login_form';
import NavBar from './components/nav/nav_bar';
import jsonServerProvider from "ra-data-json-server";

const dataProvider =
  jsonServerProvider("https://jsonplaceholder.typicode.com");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar/>
          <Route path='/login' component={Login_form} />
          {/* <Admin dataProvider={dataProvider}>
          <Resource
            name="users"
            list={UserList}
            edit={EditGuesser}
          />
        </Admin> */}
        </div>
      </BrowserRouter>
    );
  }
}


export default App;