
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBvaHxpIkf_HYFg1VyKPcjJdmmX5UTWxSs",
  authDomain: "twitter-clone-1521c.firebaseapp.com",
  projectId: "twitter-clone-1521c",
  storageBucket: "twitter-clone-1521c.appspot.com",
  messagingSenderId: "868354344424",
  appId: "1:868354344424:web:f9cb0a014b5ddf9653905d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

