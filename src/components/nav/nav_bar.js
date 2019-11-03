import React from 'react'
import {Link} from 'react-router-dom'
import Logout_link from "./logout";

const NavBar = () => {
    return (
        <nav className="nav-wrapper grey darken-3" >
            <div className="container">
            <Logout_link/>
            </div>
        </nav>
    );
}
export default NavBar;