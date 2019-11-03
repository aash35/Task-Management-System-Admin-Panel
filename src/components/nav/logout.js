import React from 'react'
import {NavLink} from 'react-router-dom'

const Logout_link = () => {
    return (
        <ul className="right">
            <li>
                <NavLink to='/'>Logout</NavLink>
            </li>
        </ul>
    );
}

export default Logout_link;