import React, { Component, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Link, navigate } from "@reach/router";
import { auth, generateUserDocument, firestore } from "../firebase";
import { objectToArray } from './helper'

class AdminDashboard extends Component {
    static contextType = UserContext
    state = {
        users: {}
    };

    // retrieve all user data and put them into an array
    componentWillMount = async () => {
        const eventRefs = firestore.collection("users");
        const querySnap = await eventRefs.get();
        let users = [];
        for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            users.push(evt);
        }
        this.setState({
            users
        })
    };

    render() {
        //const { users } = this.state;
        const users = this.state.users && objectToArray(this.state.users)

        return (
            <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">

                <h1 className="text-3xl mb-2 text-center font-bold"> Available Users</h1>

                <table className="table" style={{ marginTop: "40px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { // iterate through all users to check if user or admin
                        users &&
                            users.map((user, i) => (
                                user.userType === "Admin" ? "" : <tr key={user.id} >

                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>

                                    <td>
                                        <Link
                                            to={`/viewinstance/${user.uid}`}
                                            type="button"
                                            className="w-full py-1  mt-1 "
                                            style={{ padding: "10px" }}
                                        >View instances</Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AdminDashboard;