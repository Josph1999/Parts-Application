// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHa6XbkrRNwDSPplKDtsJPNB_rPbPYqDU",
  authDomain: "lisahelping-e22b7.firebaseapp.com",
  databaseURL: "gs://lisahelping-e22b7.appspot.com",
  projectId: "lisahelping-e22b7",
  storageBucket: "lisahelping-e22b7.appspot.com",
  messagingSenderId: "693712035327",
  appId: "1:693712035327:web:ea0197858919583cc05bca",
  measurementId: "G-DHNHEH8GEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
const analytics = getAnalytics(app);