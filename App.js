import React, { useEffect, useState } from "react";
import firebase from "firebase";

import UserNotloggedInNavigation from "../Pingme/app/Navigation/UserNotloggedIn.js";
import UserloggedInNavigation from "../Pingme/app/Navigation/UserloggedIn.js";

var firebaseConfig = {
  apiKey: "AIzaSyBlOajhHTxdgG9CdUfY0TyqH9sFRfZ6tFU",
  authDomain: "pingme-reactnativeproject.firebaseapp.com",
  projectId: "pingme-reactnativeproject",
  storageBucket: "pingme-reactnativeproject.appspot.com",
  messagingSenderId: "917363407104",
  appId: "1:917363407104:web:a3a085f67546ef2c8fdbe5",
  measurementId: "G-QRW01XPM4D",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export default function App() {
  const [loggedin, set_loggedin] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        set_loggedin(true);
      } else {
        set_loggedin(false);
      }
    });
  }, []);
  if (loggedin) {
    return (
      <UserloggedInNavigation/>
    );
  } else {
    return (
      <UserNotloggedInNavigation/>
    );
  }
}
