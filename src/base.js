import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyASa5gk2tIZL0LxamSYbQj_mJacp26NunU",
  authDomain: "catch-of-the-day-6d539.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-6d539.firebaseio.com",
  projectId: "catch-of-the-day-6d539",
  storageBucket: "catch-of-the-day-6d539.appspot.com",
  messagingSenderId: "176689480219"
});

const base = Rebase.createClass(app.database());

export default base;