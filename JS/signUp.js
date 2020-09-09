// SignUp Elements
const form = document.getElementById("signUp-form");
const email = document.getElementById("signUp-email");
const password = document.getElementById("signUp-password");
const confirmpassword = document.getElementById("signUp-confirm-password");

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

  // SignUp
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (password.value === confirmpassword.value) {
      startLoading();
      const promise = auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => {
          alert("Acount is created successfully !!!");
          window.location.href = "login.html";
        })
        .catch((err) => {
          stopLoading();
          alert(err.message);
        });
    } else {
      alert("Password doen not macthed !!!");
    }
  });

  function startLoading() {
    document.getElementById("loadingDiv").style.display = "block";
    document.getElementById("content").style.display = "none";
  }

  function stopLoading() {
    document.getElementById("loadingDiv").style.display = "none";
    document.getElementById("content").style.opacity = "none";
  }
})();
