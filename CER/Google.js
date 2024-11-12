import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHNL4MYCv2Vhl3vR1f50iQjm2OwpUDC-c",
  authDomain: "cyberescape-room.firebaseapp.com",
  databaseURL: "https://cyberescape-room-default-rtdb.firebaseio.com",
  projectId: "cyberescape-room",
  storageBucket: "cyberescape-room.firebasestorage.app",
  messagingSenderId: "783834845462",
  appId: "1:783834845462:web:02a48557a80f30ee860037",
  measurementId: "G-800BLH3KQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();

const googleLoginButton = document.getElementById("google-login-btn");
googleLoginButton.addEventListener("click", googleLogin);


function googleLogin() {
  // Firebase Google Sign-In logic here
  console.log("Google Login button clicked");
  // Example logic
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
      .then((result) => {
          console.log("User signed in:", result.user);
      })
      .catch((error) => {
          console.error("Error during Google sign-in:", error);
      });
}


