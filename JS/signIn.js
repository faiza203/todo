// SignIn Elements
const form = document.getElementById("signIn-form");
const email = document.getElementById("signIn-email");
const password = document.getElementById("signIn-password");

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

  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();
  const auth = firebase.auth();

  // SignIn
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoading();
    const promise = auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then(({ user }) => {
        alert("Login successfully !!!");
        window.location.href = "main.html";
        localStorage.setItem("userId", user.uid);
      })
      .catch((err) => {
        stopLoading();
        alert(err.message)
      });
  });

  function startLoading() {
    document.getElementById("loadingDiv").style.display = "block";
    document.getElementById("content").style.display = "none";
  }

  function stopLoading() {
    document.getElementById("loadingDiv").style.display = "none";
    document.getElementById("content").style.display = "block";
  }
})();
