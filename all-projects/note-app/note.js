const addBtn = document.querySelector("#addBtn");
const titileInput = document.querySelector("#titile-input");
const noteInput = document.querySelector("#note-input");


let notesContainer = document.querySelector(".notes-container");
let viewWindow = document.querySelector(".view-note-window");
let noteTitle = document.querySelector("#view-note-title");
let viewDate = document.querySelector("#view-note-date");
let viewPara = document.querySelector("#view-note-para");
let viewCloseBtn = document.querySelector("#close-view-window");

// variable
let deleteButtons;
deleteButtons = document.querySelectorAll(".delete-note-btn");
 let notes
notes = document.querySelectorAll(".note");

 
addBtn.addEventListener("click", addNewNote)
viewCloseBtn.addEventListener("click",() => {
  viewWindow.style.display = "none";
})
  
// functions
function addNewNote() {
  
   if (titileInput.value === "" ||
      noteInput.value === "") {
        alert("fill the input feild");
   } else {
    createNote();
   }
  
}

function createNote() {
  const newNote = document.createElement("DIV");
  const noteTitle = document.createElement("h4");
  const noteDate = document.createElement("P");
  const notePara = document.createElement("P");
  const noteDeleteBtn = document.createElement("BUTTON");
  const noteEditBtn = document.createElement("BUTTON");

  newNote.setAttribute("class", "note");
  noteTitle.setAttribute("class","note-title"); 
  noteDate.setAttribute("class","note-date");  
  notePara.setAttribute("class","note-para"); 
  noteDeleteBtn.setAttribute("class","delete-note-btn");  
  noteEditBtn.setAttribute("class","edit-note-btn"); 
  
  noteTitle.innerText = titileInput.value;
  
  month = new Date().getMonth();
  day = new Date().getDate();
  
  noteDate.innerText = `${day} / ${month} / 2025`;
  notePara.innerText = noteInput.value;
  noteDeleteBtn.innerText = "Delete";
  noteEditBtn.innerText = "view";
  
  newNote.append(noteTitle);
  newNote.append(noteDate);
  newNote.append(notePara);
  newNote.append(noteDeleteBtn);
  newNote.append(noteEditBtn);
  
  
  notesContainer.prepend(newNote);
  notes = document.querySelectorAll(".note");
  
  updateNote();
}  

updateNote();
function updateNote() {
    notes.forEach((note) => {
    deleteNote(note);
    viewNote(note);
    })
}

function deleteNote(note) {
   note.querySelector(".delete-note-btn").addEventListener("click", (event) => {
      if (confirm("note will be deleted pernently")) {
      event.target.parentElement.remove();
      }
   });
}


function viewNote(note) {
   note.querySelector(".edit-note-btn").addEventListener("click", (event) => {
    
    viewWindow.style.display = "block";
    noteTile = note.querySelector("H4").innerText;
    noteDate = note.querySelector(".note-date").innerText;
    notePara = note.querySelector(".note-para").innerText
  
   noteTitle.innerText = noteTile;
   viewDate.innerText = noteDate;
   viewPara.innerText = notePara;
   });
}

