import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import "./NavBar.css"

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    }

    return (
        <nav>
            <table className="NavBar">
                <tr>
                    <th><NavLink to="/create">Create theme</NavLink></th>
                    <th><NavLink to="/user">User page</NavLink></th>
                    <th><NavLink to="/all">All themes</NavLink></th>
                    <th><NavLink to="/" onClick={logoutHandler}>Log out</NavLink></th>
                </tr>
            </table>
        </nav>
    );
}