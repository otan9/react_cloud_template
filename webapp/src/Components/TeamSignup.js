import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, firestore, getTeamDocument, generateUserDocument, generateAdminDocument } from "../firebase";

const TeamSignUp = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [users, setUsers] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const createAdminWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        let newUser = {
          company: company,
          email: email,
          userType: "Admin"
        };
        firestore.collection("users").doc(user.uid).set(newUser);
        getTeamDocument(user.uid);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
      });

    setEmail("");
    setCompany("");
    setUsers("");
    setPassword("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "adminEmail") {
      setEmail(value);
    } else if (name === "company") {
      setCompany(value);
    } else if (name === "users") {
      setUsers(value);
    } else if (name === "adminPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Admin Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="adminEmail" className="block">
            Admin:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full "
            name="adminEmail"
            value={email}
            placeholder="E.g: softdrive@email.com"
            id="adminEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="company" className="block">
            Company Name:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full"
            name="company"
            value={company}
            placeholder="E.g: Softdrive co."
            id="company"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="adminPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="adminPassword"
            value={password}
            placeholder="Your Password"
            id="adminPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {
              createAdminWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default TeamSignUp;