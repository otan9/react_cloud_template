import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, firestore, getTeamDocument, generateUserDocument, generateAdminDocument } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import cuid from "cuid"

const CreateForm = () => {
    const user = useContext(UserContext);
    const [name, setName] = useState("");
    const [instanceID, setInstanceID] = useState(cuid());
    const [instanceType, setInstanceType] = useState("");
    const [instanceState, setInstanceState] = useState("");
    const [publicDNS, setPublicDNS] = useState("");
    const [publicIP, setPublicIP] = useState("");
    const [error, setError] = useState(null);
    const createInstance = async (event, name) => {
        event.preventDefault();
        const newInstance = {
            name,
            instanceID,
            instanceState,
            instanceType,
            publicDNS,
            publicIP
        }
        let eventDocRef = firestore.collection('users').doc(`${user.uid}`);

        await firestore.runTransaction(async (transaction) => {
            await transaction.get(eventDocRef);
            await transaction.update(eventDocRef, {
                [`instances.${cuid()}`]: newInstance
            })
        })
        setName("");
        setInstanceID(cuid());
        setInstanceType("");
        setInstanceState("");
        setPublicDNS("");
        setPublicIP("");
        setError("Instance added succesfully!");
        
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "name") {
            setName(value);
        } else if (name === "instanceID") {
            setInstanceID(value);
        } else if (name === "instanceType") {
            setInstanceType(value);
        } else if (name === "instanceState") {
            setInstanceState(value);
        } else if (name === "publicDNS") {
            setPublicDNS(value);
        } else if (name === "publicIP") {
            setPublicIP(value);
        }
    };
    const options = [
        { label: '* Select State', value: 0 },
        { label: 'Running', value: 'Running' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Terminated', value: 'Terminated' }
    ];
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className="mt-0">
            <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                <h1 className="text-3xl mb-2 text-center font-bold">Create Instance</h1>

                {error !== null && (
                    <div className="py-4 bg-green-600 w-full text-white text-center mb-3">
                        {error}
                    </div>
                )}
                <form className="">
                    <label htmlFor="adminEmail" className="block">
                        Name:
                   </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full "
                        name="name"
                        value={name}
                        placeholder="Instance name"
                        id="name"
                        onChange={event => onChangeHandler(event)}
                    />

                    <label htmlFor="instanceState" className="block">
                        instanceState:
                   </label>
                    <select
                        className=""
                        name="instanceState"
                        value={instanceState}
                        onChange={event => onChangeHandler(event)}
                        style={{ margin: "20px 20px 20px 0" }}
                    >
                        {selectOptions}
                    </select>
                    <label htmlFor="publicDNS" className="block">
                        publicDNS:
                   </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full "
                        name="publicDNS"
                        value={publicDNS}
                        placeholder="publicDNS"
                        id="publicDNS"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="publicIP" className="block">
                        publicIP:
                   </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full "
                        name="publicIP"
                        value={publicIP}
                        placeholder="publicIP"
                        id="publicIP"
                        onChange={event => onChangeHandler(event)}
                    />
                    <button
                        className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                        onClick={event => {
                            createInstance(event, name);
                        }}
                    >Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateForm;