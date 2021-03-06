import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });
  const handleSignIn = () => {
    // console.log("Clicked");

    firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      // console.log(displayName, email, photoURL);
    })
    .catch((err) => {
      console.log(err)
      console.log(err.message)
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signOutUser);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={() => handleSignOut()}>Sign Out</button> :
        <button onClick={() => handleSignIn()}>Sign In</button>
      }
      
      {
        user.isSignedIn && 
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
