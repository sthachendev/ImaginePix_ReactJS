import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { initializeAuth} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

import { getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA7V4VWZL3gJReY2d3BLnhHmwm3Nb0uCcI",
  authDomain: "imaginepix-48d04.firebaseapp.com",
  projectId: "imaginepix-48d04",
  storageBucket: "imaginepix-48d04.appspot.com",
  messagingSenderId: "129286995768",
  appId: "1:129286995768:web:d008d6da14ba4e9019cbcd",
  measurementId: "G-R2K5DNPXTF"
}

let app;
if (!getApps().length) {
    app = firebase.initializeApp(firebaseConfig);
}

app = getApp(); 

const auth = initializeAuth(app);

const db = getFirestore();
    
export { db, auth, firebase };