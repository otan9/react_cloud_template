import React, { Component, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Link, navigate } from "@reach/router";
import { auth, generateUserDocument, firestore } from "../firebase";
import { objectToArray } from './helper'

class Dashboard extends Component {
  static contextType = UserContext
  state = {
    user: this.context,
    _instances: {}
  };

  componentWillMount = async () => {
    const { user, _instances } = this.state;
    const userDocument = await firestore.doc(`users/${user.uid}`).get();
    this.setState({
      _instances: userDocument.data()
    })
  };

  instanceStart = async (id, name, instanceID, instanceState, instanceType, publicDNS, publicIP, user) => {
    const newInstance = {
      name,
      instanceID,
      instanceState: "Running",
      instanceType,
      publicDNS,
      publicIP
    }
    let eventDocRef = firestore.collection('users').doc(`${user.uid}`);
    await firestore.runTransaction(async (transaction) => {
      await transaction.get(eventDocRef);
      await transaction.update(eventDocRef, {
        [`instances.${id}`]: newInstance
      })
    })
    const userDocument = await firestore.doc(`users/${user.uid}`).get();
    this.setState({
      _instances: userDocument.data()
    })
  };
  instanceSuspend = async (id, name, instanceID, instanceState, instanceType, publicDNS, publicIP, user) => {
    const newInstance = {
      name,
      instanceID,
      instanceState: "Pending",
      instanceType,
      publicDNS,
      publicIP
    }
    let eventDocRef = firestore.collection('users').doc(`${user.uid}`);
    await firestore.runTransaction(async (transaction) => {
      await transaction.get(eventDocRef);
      await transaction.update(eventDocRef, {
        [`instances.${id}`]: newInstance
      })
    })
    const userDocument = await firestore.doc(`users/${user.uid}`).get();
    this.setState({
      _instances: userDocument.data()
    })
  };
  instanceTerminated = async (id, name, instanceID, instanceState, instanceType, publicDNS, publicIP, user) => {
    const newInstance = {
      name,
      instanceID,
      instanceState: "Terminated",
      instanceType,
      publicDNS,
      publicIP
    }
    let eventDocRef = firestore.collection('users').doc(`${user.uid}`);
    await firestore.runTransaction(async (transaction) => {
      await transaction.get(eventDocRef);
      await transaction.update(eventDocRef, {
        [`instances.${id}`]: newInstance
      })
    })
    const userDocument = await firestore.doc(`users/${user.uid}`).get();
    this.setState({
      _instances: userDocument.data()
    })
  };

  render() {

    const { user, _instances } = this.state;

    const instances = _instances && _instances.instances && objectToArray(_instances.instances);

    return (
      <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
        <Link className="w-full py-3 bg-green-600 mt-4 text-white" to="/createinstance" style={{ padding: "10px" }}  >Create Instance</Link>
        <h1 className="text-3xl mb-2 text-center font-bold"> Available Instances</h1>

        <table className="table" style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">instance ID</th>
              <th scope="col">instance State</th>
              <th scope="col">public DNS</th>
              <th scope="col">public IP</th>
            </tr>
          </thead>
          <tbody>
            {instances &&
              instances.map((instance, i) => (
                <tr key={instance.id} >
                  <th scope="row">{i + 1}</th>
                  <td>{instance.name}</td>
                  <td>{instance.instanceID}</td>
                  <td style={{ color: "red" }}>{instance.instanceState}</td>
                  <td>{instance.publicDNS}</td>
                  <td>{instance.publicIP}</td>
                  <td>
                    <button
                      type="button"
                      className="w-full py-1  mt-1 "
                      style={{ padding: "10px" }}
                      disabled={instance.instanceState === "Running" ? true : false}
                      onClick={() => this.instanceStart(instance.id, instance.name, instance.instanceID, instance.instanceState, instance.instanceType, instance.publicDNS, instance.publicIP, user)}
                    >Start</button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="w-full py-1  mt-1 "
                      style={{ padding: "10px" }}
                      disabled={instance.instanceState === "Pending" ? true : false}
                      onClick={() => this.instanceSuspend(instance.id, instance.name, instance.instanceID, instance.instanceState, instance.instanceType, instance.publicDNS, instance.publicIP, user)}
                    >Suspend</button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="w-full py-1  mt-1 "
                      style={{ padding: "10px" }}
                      disabled={instance.instanceState === "Terminated" ? true : false}
                      onClick={() => this.instanceTerminated(instance.id, instance.name, instance.instanceID, instance.instanceState, instance.instanceType, instance.publicDNS, instance.publicIP, user)}

                    >Terminate</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;