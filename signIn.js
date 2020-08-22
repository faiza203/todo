// SignIn Elements
const signInEmail = document.getElementById("login-email");
const signInPassword = document.getElementById("login-password");
const signInForm = document.getElementById("login-form");

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
    measurementId: "G-EFZMSY4E62",
  };
  firebase.initializeApp(config);
  firebase.analytics();
  const auth = firebase.auth();

  // signUp Function
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const promise = auth.signInWithEmailAndPassword(
      signInEmail.value,
      signInPassword.value
    );
    promise.catch((e) => alert(e.message) );
    promise.then(function ({ user }) {
      alert("Successfully Login")
    window.location.href = "./main.html";
      localStorage.setItem("userId", user.uid);
    });
  });
})();

