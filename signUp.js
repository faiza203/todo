// SignUp Elements
const signUpEmail = document.getElementById("register-email");
const signUpPassword = document.getElementById("register-password");
const signUpConfirmPassword = document.getElementById("register-confirm-password")
const signUpForm = document.getElementById("registerForm");


// Initialize Firebase
(function () {
  const config = {
    apiKey: "AIzaSyAZX5VgMVNTyz-J_UUoCFuXIFK48pk7mzU",
    authDomain: "common-50c43.firebaseapp.com",
    databaseURL: "https://common-50c43.firebaseio.com",
    projectId: "common-50c43",
    storageBucket: "common-50c43.appspot.com",
    messagingSenderId: "670911494230",
    appId: "1:670911494230:web:6c5fc6131fb576ac75a3f7",
    measurementId: "G-EFZMSY4E62"
  };
  firebase.initializeApp(config);
  firebase.analytics();
  const auth = firebase.auth();

  // signUp Function
  signUpForm.addEventListener("submit", e => {
    if (signUpPassword.value === signUpConfirmPassword.value) {
      e.preventDefault();
      const promise = auth.createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value);
      promise.catch(e => {
        alert(e.message);
        console.log(e.message)
      });
      promise.then(function (user) {
        console.log(user);
        alert("Account Is Created Successfully");
        window.location.href = "./login.html";
      })
    }  else{
      alert("Password does not mathced")
    }  
  })


}());
