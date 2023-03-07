import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "imaginepix-48d04.firebaseapp.com",
    projectId: "imaginepix-48d04",
    storageBucket: "imaginepix-48d04.appspot.com",
    messagingSenderId: "129286995768",
    appId: "1:129286995768:web:d008d6da14ba4e9019cbcd",
    measurementId: "G-R2K5DNPXTF"
  };

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

export { firestore, auth };
