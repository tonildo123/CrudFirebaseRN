/* eslint-disable prettier/prettier */
import * as firebase from "firebase";
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLzei6rM1wfx1ySiVKtlOaobE6zQ5Bfag",
  authDomain: "react-crud-2ebd7.firebaseapp.com",
  projectId: "react-crud-2ebd7",
  storageBucket: "react-crud-2ebd7.appspot.com",
  messagingSenderId: "803902781234",
  appId: "1:803902781234:web:17531a9d97ac883409092b"
};


firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
 