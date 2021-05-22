import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TeamSignUp from "./TeamSignup";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import Sidebar from "./Sidebar";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import CreateForm from "./CreateForm";
import AdminViewInstances from "./AdminViewInstances";

function Application() {
  const user = useContext(UserContext);
  //if user then user dashboard
  return (
    user ?
      <div>
        {user.userType === "User" ?
          <div>
            <Sidebar />
            <Router>
              <Dashboard path="dashboard" />
              <ProfilePage path="profilepage" />
              <CreateForm path="createinstance" />
            </Router></div> 
            :
          <div>
            <Sidebar />
            <Router>
              <AdminDashboard path="dashboard" />
              <ProfilePage path="profilepage" />
              <AdminViewInstances path="/viewinstance/:id" />
            </Router></div>
        }
      </div>
      :
      <Router>
        <TeamSignUp path="TeamsignUp" />
        <SignUp path="signUp" />
        <SignIn path="/" />
        <PasswordReset path="passwordReset" />
      </Router>
  );
}

export default Application;