const form = document.getElementById("addTodo-form");
const input = document.getElementById("addTodo-input");

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
  const firestore = firebase.firestore();
  const todoId = uuid();

  // Add Todo
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoading();
    addTodo();
  });
  const userId = localStorage.getItem("userId");
  firestore
    .collection("users")
    .doc(`${userId}`)
    .collection("todos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        const { todo } = doc.data();
        generateTodo(todo);
        stopLoading();
      });
    })
    .catch((err) => {
      alert("Error in fetching todos");
      console.log(err);
      stopLoading();
    });

  function addTodo() {
    if (!userId) {
      alert("Please Login First");
    }

    const todoValue = input.value;
    const todo = {
      todoId,
      todoValue,
    };
    const doc = firestore.doc(`users/${userId}/todos/${todoId}`);
    doc
      .set({
        todo,
      })
      .then(() => {
        generateTodo(todo);
        stopLoading();
      })
      .catch((err) => {
        alert("Got an error !!!");
        console.log(err);
        stopLoading();
      });
  }
  function generateTodo({ todoId, todoValue }) {
    const todoDiv = document.createElement("div");
    todoDiv.id = `${todoId}-todoDiv`;
    todoDiv.classList.add = "form-groups";
    todoDiv.style.display = "flex";
    todoDiv.style.display = "row";
    todoDiv.innerHTML = ` 
    <p id="${todoId}-p">${todoValue}</p>
    <button id="${todoId}-edit-button" class="btn btn-outline-warning" type="button">Edit</button>
    <button id="${todoId}-del-button"  class="btn btn-outline-danger" type="button">Del</button>
    <div id="editDiv"></div>
`;
    document.getElementById("content").appendChild(todoDiv);
    removeOnTodo(`${todoId}-del-button`, todoId);
    editOnTodo(`${todoId}-edit-button`, todoId);
  }
  function removeOnTodo(removeBtnId, todoId) {
    startLoading();
    const userId = localStorage.getItem("userId");
    const todoElem = document.getElementById(removeBtnId);
    todoElem.addEventListener("click", function (event) {
      event.preventDefault();
      const docRef = firestore.doc(`users/${userId}/todos/${todoId}`);
      docRef
        .delete()
        .then(() => {
          todoElem.parentElement.remove();
          stopLoading();
        })
        .catch((err) => {
          alert(err.message);
          stopLoading();
        });
    });
  }
  function editOnTodo(editBtnId, todoId) {
    const todoEditBtnElem = document.getElementById(editBtnId);
    todoEditBtnElem.addEventListener("click", function (event) {
      editTodo(todoId);
    });
  }
  function editTodo(todoId) {

    const todoElem = document.getElementById(`${todoId}-p`).innerText;
    console.log(todoElem.innerText);
    const editDiv = `
        <input value=${todoElem} id="editTodoInput" type="text"/>
        <button id="editTodoCancelBtn" class="btn btn-outline-primary">Cancel</button>
        <button id="todoBtnUpdate"class="btn btn-outline-primary">Update</button>
  `;
    document.getElementById("editDiv").innerHTML = editDiv;
    document.getElementById("editTodoCancelBtn").onclick = removeEditDiv;
    document.getElementById("todoBtnUpdate").onclick = function (event) {
      updateTodo(todoId);
      removeEditDiv();
    };
  }
  function removeEditDiv() {
    document.getElementById("editDiv").remove();
  }

  function updateTodo(todoId) {
    startLoading();
    const updatedValue = document.getElementById("editTodoInput").value;
    document.getElementById(`${todoId}-p`).innerHTML = updatedValue;
    stopLoading();
    updateInFirestore(todoId, updatedValue);
  }

  function updateInFirestore(todoId, updatedValue) {
    const userId = localStorage.getItem("userId");
    const docRef = firestore.doc(`users/${userId}/todos/${todoId}`);
    docRef
      .update({
        todo: {
          todoValue: updatedValue,
        },
      })
      .then(() => {
        alert("Document Updated in firebase");
      })
      .catch((err) => {
        alert("Error in updating todo in firebase");
        console.log(err);
      });
  }
  function startLoading() {
    document.getElementById("loadingDiv").style.display = "block";
    document.getElementById("content").style.display = "none";
  }

  function stopLoading() {
    document.getElementById("loadingDiv").style.display = "none";
    document.getElementById("content").style.display = "block";
  }
})();
