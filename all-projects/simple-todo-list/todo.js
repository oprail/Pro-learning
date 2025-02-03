const addNewFolderBtn = document.querySelector(".add-new-folder");
const newFolderWindow = document.querySelector(".create-new-folder");



function openNewFolderWindow(param) {
  
  newFolderWindow.style.display = "visible";
  console.log(newFolderWindow)
  console.log("clicked")
    
}






addNewFolderBtn.addEventListener("click",openNewFolderWindow)