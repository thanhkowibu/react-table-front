import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEBknbg0uBXog_wPdKOXlmWW_qKIiWsGI",
  authDomain: "test-e8af0.firebaseapp.com",
  databaseURL: "https://test-e8af0-default-rtdb.firebaseio.com",
  projectId: "test-e8af0",
  storageBucket: "test-e8af0.appspot.com",
  messagingSenderId: "872237335401",
  appId: "1:872237335401:web:78b6c22ef357b91bcdb3f8",
  measurementId: "G-BEEX57F366"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();