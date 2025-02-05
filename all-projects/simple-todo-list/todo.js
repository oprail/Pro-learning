const addNewFolderBtn = document.querySelector("#add-new-item-btn");
const newTodoWindow = document.querySelector(".create-new-todo");
const popupBackground = document.querySelector("#background-hide");

// to-do popup acess
const userInputColor = document.querySelector("#user-color");
const userInputTodo = document.querySelector("#user-todo");

// popup btns and to-do
const todoCloseBtn = document.querySelector("#todo-cancel-btn")
const todoAddBtn = document.querySelector("#todo-add-btn");
const todoPage = document.querySelector(".todo-page");
const allTodos = document.querySelector(".all-todo-container");

// variable
let todoData;
let elements;

// on page load 
displaySavedData();



//  all functions =>
// open new to-do popup/window
function openTodoPopup() {
    newTodoWindow.style.display = "inline-block";
    popupBackground.style.display = "block";
}

// close new to-to popup/window
function closeTodoPopup() {
    popupBackground.style.display = "none";
    newTodoWindow.style.display = "none";
    
    userInputColor.value = "";
    userInputTodo.value = "";
    userInputTodo.value = "";
}


// add new to-do =>
function addNewTodo() {
   
   if (!userInputTodo.value) {
     alert("todo is empty");
   } else {
    let newTodo = document.createElement("div");
    let newTodoItemColor = document.createElement("div");
    let newTodoI = document.createElement("i");
    let newTodoP = document.createElement("p");
    
    newTodo.setAttribute("class","todo");
    newTodoItemColor.setAttribute("class","item-color");
    newTodoI.setAttribute("class","fas fa-square");
    
    // asign values  
    newTodoP.innerText = userInputTodo.value;
    newTodoItemColor.style.background = userInputColor.value; 
    newTodoI.style.color = userInputColor.value;
    
    // append in page
    newTodo.append(newTodoItemColor);
    newTodo.append(newTodoI);
    newTodo.append(newTodoP);
    
    allTodos.prepend(newTodo);
  
   closeTodoPopup();
   saveTodoData();
   displaySavedData();
   updateContainerHeight();
   }
}


// Check the to-do if complete
function changeTodoState(event) {
  
   let todoIconS = event.target.querySelector("i");
   let todoP = event.target.querySelector("p");
   let itemColorbox = event.target.querySelector(".item-color");
   
   let itemColor = window.getComputedStyle(itemColorbox).backgroundColor;
  

   if (todoIconS.classList.contains("fa-square")) {
   todoIconS.setAttribute("class","fas fa-check-square");
   todoIconS.style.color = "green";
   todoP.style.textDecoration = "line-through";
   todoP.style.color = "green";
   
   } else if (todoIconS.classList.contains("fa-check-square")) {
  
   todoIconS.setAttribute("class","fas fa-square");
   todoIconS.style.color = itemColor;
   todoP.style.textDecoration = "none";
   todoP.style.color = "#000";
   }
   saveTodoData();
}

function updateContainerHeight() {
  
   if (elements.length === 1) {
   todoPage.style.height = "100px";
   console.log("set height 100")
   } else if (elements.length === 2) {
   todoPage.style.height = "180px";
   console.log("set height 200")
   } else if (elements.length > 2) {
   todoPage.style.height = "250px";
   }
}

function saveTodoData() {

    elements = allTodos.querySelectorAll(".todo");
    
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].innerHTML === "") {
        elements[i].remove();
      } 
    }
   localStorage.setItem("todoData",`${allTodos.innerHTML}`);
}


function displaySavedData() {
  
    todoData = localStorage.getItem("todoData");
  
  
    if (todoData.trim() === "") {
     todoPage.style.height = "5px";
    } else if(todoData)  {
    allTodos.innerHTML = todoData;
    saveTodoData();
    updateContainerHeight();
    }
}


function deleteTodo(event) {
  
   if (confirm("delete this todo")) {
       event.target.innerHTML = "";
      saveTodoData();
      updateContainerHeight();
      displaySavedData();
   }
}


//  Event listener  
// open close window popup
addNewFolderBtn.addEventListener("click",openTodoPopup);
todoCloseBtn.addEventListener("click",closeTodoPopup);
todoAddBtn.addEventListener("click",addNewTodo); 

//  detect click on todos  
document.querySelector(".todo-page").addEventListener("click",(event) =>{
  
   if (event.target.classList.contains("todo")) {
    changeTodoState(event);
   }
})

document.querySelector(".todo-page").addEventListener("dblclick",(event) =>{
  
   if (event.target.classList.contains("todo")) {
    deleteTodo(event);
   } 
})
