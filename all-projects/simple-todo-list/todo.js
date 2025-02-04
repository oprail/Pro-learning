





const addNewFolderBtn = document.querySelector("#add-new-item-btn");

const newTodoWindow = document.querySelector(".create-new-todo");

const popupBackground = document.querySelector("#background-hide");

// New Folder & to-do popup acess
const userInputColor = document.querySelector("#user-color");
const userInputTodo = document.querySelector("#user-todo");

// popup btns 
const todoCloseBtn = document.querySelector("#todo-cancel-btn")
const todoAddBtn = document.querySelector("#todo-add-btn");

// variables for page
const todoPage = document.querySelector(".todo-page");

const allTodos = document.querySelector(".all-todo-container");



const headerFolder = document.querySelector("#header-folder");
// variable
let todoData;



// on page load 
displaySavedData();








//  all functions =>
// open new to-do popup/window
function openTodoPopup() {
    newTodoWindow.style.display = "inline-block";
    popupBackground.style.display = "block";
}

// close new folder popup/window
function closeTodoPopup() {
   popupBackground.style.display = "none";
   newTodoWindow.style.display = "none";
    
    userInputColor.value = "";
    userInputTodo.value = "";
    userInputTodo.value = "";
}


// add new to-do 
function addNewTodo() {
   
   if (!userInputTodo.value) {
     alert("todo is empty");
   } else {
      // create elements
    let newTodo = document.createElement("div");
    let newTodoItemColor = document.createElement("div");
    let newTodoI = document.createElement("i");
    let newTodoP = document.createElement("p");
    
    // add class attribute
    newTodo.setAttribute("class","todo");
    newTodoItemColor.setAttribute("class","item-color");
    newTodoI.setAttribute("class","fas fa-square");
    
    // asign values  
    newTodoP.innerText = userInputTodo.value;
    newTodoItemColor.style.background = userInputColor.value; 
    newTodoI.style.color = userInputColor.value;
    
    // append in 
    newTodo.append(newTodoItemColor);
    newTodo.append(newTodoI);
    newTodo.append(newTodoP);
    
    let blurDiv = document.querySelector("#shadow-onbottom-Todo");
    allTodos.append(newTodo);
    
    
   closeTodoPopup();
   saveTodoData();
   }
}

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


function saveTodoData() {
localStorage.setItem("todoData",`${allTodos.innerHTML}`)
}

function displaySavedData() {
  todoData = localStorage.getItem("todoData");
  if (todoData === undefined) {
    console.log("undefined")
  } else {
    allTodos.innerHTML = todoData;
  }
}


// +++++>   Event listener   <+++++
// open close window popup
addNewFolderBtn.addEventListener("click",openTodoPopup);

todoCloseBtn.addEventListener("click",closeTodoPopup);

todoAddBtn.addEventListener("click",addNewTodo); 

// **> detect click on folder  <**
document.querySelector(".todo-page").addEventListener("click",(event) =>{
  
  if (event.target.classList.contains("todo")) {
    changeTodoState(event);
  } 
})

