const addNewFolderBtn = document.querySelector("#add-new-item-btn");

const newFolderWindow = document.querySelector(".create-new-folder");
const newTodoWindow = document.querySelector(".create-new-todo");
const popupBackground = document.querySelector("#background-hide");

// New Folder & to-do popup acess
const userInputColor = document.querySelector("#user-color");
const userInputFolderName = document.querySelector("#user-fol-name");
const userInputTodo = document.querySelector("#user-todo");

// popup btns 
const popupCloseBtn = document.querySelector("#cancel-btn");
const popupAddBtn = document.querySelector("#add-btn");
const todoCloseBtn = document.querySelector("#todo-cancel-btn")
const todoAddBtn = document.querySelector("#todo-add-btn");
const goBackBtn = document.querySelector("#goBackBtn");

// variables for page
const folderPage = document.querySelector(".folder-page");
const todoPage = document.querySelector(".todo-page");

const headerBack = document.querySelector("#header-back");
const headerFolder = document.querySelector("#header-folder");



//  all functions =>
// open new folder popup/window
function openNewFolderWindow() {
  
   let btnClass = addNewFolderBtn.getAttribute("class");
   
   if (btnClass === "add-new-folder") {
    newFolderWindow.style.display = "inline-block";
    popupBackground.style.display = "block";
   } else {
    newTodoWindow.style.display = "inline-block";
    popupBackground.style.display = "block";
    }
}

// close new folder popup/window
function closeNewFolderWindow() {
   newFolderWindow.style.display = "none";
   popupBackground.style.display = "none";
   newTodoWindow.style.display = "none";
    
    userInputColor.value = "";
    userInputFolderName.value = "";
    userInputTodo.value = "";
}

// add new folder/list =>
function addNewFolder() {
   // create elements
    let newFolder = document.createElement("div");
    let newFolderItemColor = document.createElement("div");
    let newFolderI = document.createElement("i");
    let newFolderP = document.createElement("p");
    
    // add class attributes
    newFolder.setAttribute("class","folder");
    newFolderItemColor.setAttribute("class","item-color");
    newFolderI.setAttribute("class","fas fa-folder");
    newFolderP.setAttribute("id","folderName");
    
    // asign values  
    newFolderP.innerText = userInputFolderName.value;
    newFolderItemColor.style.background = userInputColor.value; 
    
    // append in dom
    newFolder.append(newFolderItemColor);
    newFolder.append(newFolderI);
    newFolder.append(newFolderP);
    folderPage.append(newFolder);
   
   closeNewFolderWindow();
}

// open to-do of folder/list
function openTodoPage(event) {
   
   const folderName = document.querySelector("#folder-name");
   folderName.innerText = event.target.innerText;
   
   headerBack.style.display = "flex";
   headerFolder.style.display = "none";
   folderPage.style.display = "none";
   todoPage.style.display = "inline";
   
   addNewFolderBtn.setAttribute("class","add-new-todo");
}

// close to-do page go back in lists
function closeTodoPage() {
   headerBack.style.display = "none";
   headerFolder.style.display = "block";
   folderPage.style.display = "inline";
   todoPage.style.display = "none";
   addNewFolderBtn.setAttribute("class",
   "add-new-folder");
}

// add new to-do 
function addNewTodo() {
   
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
    
    // append in 
    newTodo.append(newTodoItemColor);
    newTodo.append(newTodoI);
    newTodo.append(newTodoP);
    todoPage.append(newTodo);
   
   closeNewFolderWindow(); 
}


// +++++>   Event listener   <+++++

// open close window popup
addNewFolderBtn.addEventListener("click",openNewFolderWindow);
popupCloseBtn.addEventListener("click",closeNewFolderWindow);
todoCloseBtn.addEventListener("click",closeNewFolderWindow);

// go back into folders page e->h
goBackBtn.addEventListener("click",closeTodoPage);

// add new folder event->handle
popupAddBtn.addEventListener("click",addNewFolder);

todoAddBtn.addEventListener("click",addNewTodo); 

// **> detect click on folder  <**
document.querySelector(".folder-page").addEventListener("click",(event) =>{
  
  if (event.target.classList.contains("folder")) {
    openTodoPage(event);
  } 
})

