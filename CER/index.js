// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHNL4MYCv2Vhl3vR1f50iQjm2OwpUDC-c",
  authDomain: "cyberescape-room.firebaseapp.com",
  databaseURL: "https://cyberescape-room-default-rtdb.firebaseio.com",
  projectId: "cyberescape-room",
  storageBucket: "cyberescape-room.appspot.com",
  messagingSenderId: "783834845462",
  appId: "1:783834845462:web:02a48557a80f30ee860037",
  measurementId: "G-800BLH3KQC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up register function
function register() {
  // Get all input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;
  const confirm_password = document.getElementById('confirm_password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid! Password must contain at least 8 characters, including uppercase, lowercase, number and special character.');
    return;
  }

  if (password !== confirm_password) {
    alert('Password and Confirm Password do not match');
    return;
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      const database_ref = database.ref();

      // Create User data
      const user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data);
      document.getElementById('sign-up-form').reset();
      alert('User Created Successfully!');
      
      // Redirect to dashboard
      window.location.href = './Dashboard.html';
    })
    .catch(function (error) {
      alert(error.message);
    });
}

// Set up login function
function login() {
  // Get input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Please enter a valid email and password!');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      localStorage.setItem('user', user.email);

      // Update user data in database
      const databaseRef = database.ref();
      const userData = {
        last_login: Date.now()
      };

      databaseRef.child('users/' + user.uid).update(userData);
      window.location.href = './Dashboard.html';
    })
    .catch(function (error) {
      alert(error.message);
    });
}

// Google Sign In
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const databaseRef = database.ref();
      
      // Create/update user data
      const userData = {
        email: user.email,
        full_name: user.displayName,
        last_login: Date.now()
      };
      
      databaseRef.child('users/' + user.uid).update(userData);
      localStorage.setItem('user', user.email);
      window.location.href = './Dashboard.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}

// GitHub Sign In
function signInWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const databaseRef = database.ref();
      
      // Create/update user data
      const userData = {
        email: user.email,
        full_name: user.displayName,
        last_login: Date.now()
      };
      
      databaseRef.child('users/' + user.uid).update(userData);
      localStorage.setItem('user', user.email);
      window.location.href = './Dashboard.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Validate Functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;
  return expression.test(password);
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

// Logout function
function logout() {
  auth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      window.location.href = './index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Authentication state observer
auth.onAuthStateChanged((user) => {
  const currentPath = window.location.pathname;
  
  if (user) {
    // User is signed in
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
      window.location.href = './Dashboard.html';
    }
  } else {
    // User is signed out
    if (currentPath.includes('Dashboard.html')) {
      window.location.href = './index.html';
    }
  }
});

// Make functions available globally
window.login = login;
window.register = register;
window.signInWithGoogle = signInWithGoogle;
window.signInWithGithub = signInWithGithub;
window.logout = logout;
