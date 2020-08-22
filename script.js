let firestore;
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
  firestore = firebase.firestore();
})();

function addTodo() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login first");
    return;
  }
  const todoId = uuid();
  const todoValue = document.getElementById("todo-input").value;
  const todo = {
    todoId,
    todoValue,
  };
  // Todo
  const docRef = firestore.doc(`users/${userId}/todos/${todoId}`);
  docRef
    .set({
      todo,
    })
    .then(function () {
      const todoDiv = document.createElement("div");
      todoDiv.innerHTML = `<div id="todoDiv"><p id="todo-p">${todoValue}</p><button id="todo-button" class="hidden" >DEL</button></div>`;
      document.querySelector("body").appendChild(todoDiv);
      const div = document.querySelectorAll("#todoDiv");
      const btn = document.querySelectorAll("#todo-button");
      const p = document.querySelectorAll("#todo-p");
      for (let i = 0; i < div.length; i++) {
        div[i].addEventListener("mouseover", (e) => {
          btn[i].classList.remove("hidden");
          btn[i].classList.add("visible");
        });
        div[i].addEventListener("mouseout", (e) => {
          btn[i].classList.add("hidden");
          btn[i].classList.remove("visible");
        });
      }
      for (let i = 0; i < div.length; i++) {
        btn[i].addEventListener("click", () => {
          const promise =  docRef.delete() ;
            promise.then(function () {
              div[i].remove();
            })
            .catch(function (err) {
              "got an err", err;
            });
        });
      }
    })

    .catch(function (err) {
      return "got an error", err;
    });
}
