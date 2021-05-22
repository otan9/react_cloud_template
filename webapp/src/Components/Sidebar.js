import { Link, navigate } from "@reach/router";
import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "../firebase";

const Sidebar = () => {
    // user context
    const user = useContext(UserContext);
    console.log(user);
    
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo">
            <Link to='/' className="simple-text">
              {user.userType} Portal
            </Link>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to='dashboard'>
                <i className="nc-icon nc-chart-pie-35"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='profilepage'>
                <i className="nc-icon nc-circle-09"></i>
                <p>User Profile</p>
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to='/'>
            <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
            </Link>
            </li>
          </ul>
        </div>
      </div>
    )
};

export default Sidebar