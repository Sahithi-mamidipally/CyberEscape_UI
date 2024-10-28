
import { PhoneAuthProvider, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {

  // Get all our input fields
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const full_name = document.getElementById('full_name').value
  const confirm_password = document.getElementById('confirm_password').value
  // milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  if (password !== confirm_password) {
    alert('Password and Confirm Password are not same')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
      document.getElementById('sign-up-form').reset();

      // DOne
      alert('User Created!!')
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

// Set up our login function
function login() {
  // Get all our input fields
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }


  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser
      localStorage.setItem('user', user.email);

      // Update the user data in the database
      const databaseRef = database.ref();
      const userData = {
        last_login: Date.now()
      };

      databaseRef.child('users/' + user.uid).update(userData);
      window.location.replace('./main.html');

      // const phoneAuthProvider = new PhoneAuthProvider(auth);
      // const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      //   'size': 'normal', // Use 'invisible' if you want the reCAPTCHA to work automatically.
      //   'callback': (response) => {
      //     console.log('reCAPTCHA solved, you can proceed with the sign-in.');
      //   },
      //   'expired-callback': () => {
      //     console.log('reCAPTCHA expired, please solve it again.');
      //   }
      // }, auth);

      // recaptchaVerifier.render().then((widgetId) => {
      //   phoneAuthProvider.verifyPhoneNumber('+15599946422', widgetId)
      //     .then((verificationId) => {
      //       const verificationCode = prompt('Please enter the verification code sent to your phone');
      //       const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
      //       const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);   

      //       return userCredential.resolver.resolveSignIn(multiFactorAssertion);
      //     })
      //     .then((userCredential) => {
      //       // Sign-in successful with MFA
      //       console.log('User successfully signed in:', userCredential.user);
      //     })
      //     .catch((error) => {
      //       console.error('Error during verification:', error);
      //     });
      // }).catch((error) => {
      //   console.error('Error rendering reCAPTCHA:', error);
      // });


      // const phoneAuthProvider = new PhoneAuthProvider(auth);
      // phoneAuthProvider.verifyPhoneNumber('+15599946422')
      //   .then((verificationId) => {
      //     const verificationCode = prompt('Please enter the verification code sent to your phone');
      //     const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
      //     const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);   

      //     return userCredential.resolver.resolveSignIn(multiFactorAssertion);
      //   })
      //   .then((userCredential) => {
      //     // Sign-in successful with MFA
      //     console.log('User successfully signed in:', userCredential.user);
      //   })
      //   .catch((error) => {
      //     console.error('Error during verification:', error);
      //   });
      //   const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      //     'size': 'invisible', // Use 'invisible' if you want the reCAPTCHA to work automatically.
      //     'callback': (response) => {
      //         console.log('reCAPTCHA solved, you can proceed with the sign-in.');
      //     },
      //     'expired-callback': () => {
      //         console.log('reCAPTCHA expired, please solve it again.');
      //     }
      // }, auth);

      // // Render the reCAPTCHA before using it
      // recaptchaVerifier.render().then((widgetId) => {
      //     console.log('reCAPTCHA rendered with widget ID:', widgetId);

      //     // Now you can proceed with the phone number verification
      //     const phoneAuthProvider = new PhoneAuthProvider(auth);

      //     return phoneAuthProvider.verifyPhoneNumber('+15599946422', recaptchaVerifier)
      //         .then((verificationId) => {
      //             const verificationCode = prompt('Please enter the verification code sent to your phone');
      //             const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
      //             const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      //             // Resolve the sign-in with the multi-factor assertion
      //             return resolver.resolveSignIn(multiFactorAssertion);
      //         })
      //         .then((userCredential) => {
      //             console.log('User successfully signed in:', userCredential.user);

      //             // Update the user data in the database
      //             const databaseRef = database.ref();
      //             const userData = {
      //                 last_login: Date.now()
      //             };

      //             databaseRef.child('users/' + userCredential.user.uid).update(userData);
      //             window.location.replace('./main.html');
      //         })
      //         .catch((error) => {
      //             console.error('Error during verification:', error);
      //             alert(error.message);
      //         });
      // }).catch((error) => {
      //     console.error('Error rendering reCAPTCHA:', error);
      //     alert('Failed to render reCAPTCHA. Please try again.');
      // });


    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}




// Validate Functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  const expression = /^(?=.*\d).{8,}$/

  // Firebase only accepts lengths greater than 8
  if (expression.test(password) == true) {
    return true
  } else {
    //not reached password condition
    return false
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

// At the bottom of your index.js file
window.login = login;
window.register = register;
