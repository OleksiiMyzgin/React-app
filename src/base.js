import Rebase from "re-base";
import * as firebase from "firebase";
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

const config = {
  apiKey: "AIzaSyASa5gk2tIZL0LxamSYbQj_mJacp26NunU",
  authDomain: "catch-of-the-day-6d539.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-6d539.firebaseio.com",
  projectId: "catch-of-the-day-6d539",
  storageBucket: "catch-of-the-day-6d539.appspot.com",
  messagingSenderId: "176689480219"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { app, base, facebookProvider, googleProvider, githubProvider };
