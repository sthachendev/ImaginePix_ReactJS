import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { initializeAuth} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

import { getApps, getApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjwGHAW3bOSBnUu8bMpp2ZZPfzzg5Poyo",
  authDomain: "imaginepix-657fb.firebaseapp.com",
  projectId: "imaginepix-657fb",
  storageBucket: "imaginepix-657fb.appspot.com",
  messagingSenderId: "876256993800",
  appId: "1:876256993800:web:fdb7d8c1162d5cbe5ba7bd",
  measurementId: "G-JRZN7LSVWE"
};

let app;
if (!getApps().length) {
    app = firebase.initializeApp(firebaseConfig);
}

app = getApp(); 

const auth = initializeAuth(app);

const db = getFirestore();

const storage = getStorage(app);
    
export { db, auth, firebase, storage };