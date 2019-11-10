import React from 'react'
import {NavLink} from 'react-router-dom'
import LogoutLink from "./Logout";

const NavBar = () => {
    return (
        <nav className="nav-wrapper grey darken-3" >
            <div className="container">
                <div className="row">
                    <img className="left responsive-img" src={require("./nav_img.png")}></img>
                    <ul className="right">
                        <li><NavLink to="/">Users</NavLink></li>
                        <li><NavLink to='/job_type'>Job Type</NavLink></li>
                        <LogoutLink />
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;