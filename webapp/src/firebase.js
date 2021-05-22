import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";


// Your web app's Firebase configuration
var firebaseConfig = {
  // apiKey: "AIzaSyAV77WKUK2jR9Rp7qdI4QEEq6k0U9N7jfw",
  // authDomain: "softdrive-dev.firebaseapp.com",
  // databaseURL: "https://softdrive-dev.firebaseio.com",
  // projectId: "softdrive-dev",
  // storageBucket: "softdrive-dev.appspot.com",
  // messagingSenderId: "660245083882",
  // appId: "1:660245083882:web:09e8fa616e9a8e31fe8993"

  apiKey: "AIzaSyDJya-XYQenbYfQoQP9f5OSkwweLEWC6bA",
  authDomain: "testuseradmin-4ac32.firebaseapp.com",
  projectId: "testuseradmin-4ac32",
  storageBucket: "testuseradmin-4ac32.appspot.com",
  messagingSenderId: "1068919792069",
  appId: "1:1068919792069:web:77e85a5a5cbc78153eebac"

  // apiKey: "AIzaSyCbKdMFNdJ1wZ5OHtW_Iyh2B2dCezVqFng",
  // authDomain: "adminplususers.firebaseapp.com",
  // projectId: "adminplususers",
  // storageBucket: "adminplususers.appspot.com",
  // messagingSenderId: "142645691419",
  // appId: "1:142645691419:web:88da2ab9a7853a12dae4be",
  // measurementId: "G-F3L0K31NNG"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};



export const deleteUserByUid = async uid => {
  if (!uid) return null;
  try {
    
  } catch (error) {
    console.error("Error fetching Team", error);
  }
};

export const getTeamDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching Team", error);
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};