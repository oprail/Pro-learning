let selectedShape = null;
let selectedTool = "brush";
let selectedColor = "black";
let brushSize = 2;
let fillColor = false;

let isDrawing = false;
let canvasArray = [];


const shapes = document.querySelectorAll(".shape");
const tools = document.querySelectorAll(".tool");
const colors = document.querySelectorAll(".color");
const slider = document.querySelector("#slider");
const fillColorCheckbox = document.querySelector("#fill-color-input");
const clearBtn = document.querySelector("#clearBtn");
const saveImgBtn = document.querySelector("#saveImgBtn");

  
  
  
shapes.forEach((shape) => {
  shape.addEventListener("click", (e) => {
    
    selectedTool = null;
    tools.forEach((tool) => {
     tool.classList.remove("tool-selected");
    });


    let clickedShape = e.target;
    let clickedShapeId = clickedShape.getAttribute("id");
    
    if (selectedShape === clickedShapeId) {
      clickedShape.classList.remove("shape-selected");
      selectedShape = null;
    } else {
      
      document.querySelectorAll(".shape-selected").forEach(el => el.classList.remove("shape-selected"));
      
      clickedShape.classList.add("shape-selected");
      selectedShape = clickedShapeId; 
    }
  });
});


tools.forEach((tool) => {
  tool.addEventListener("click", (e) => {
    
    selectedShape = null;
    shapes.forEach((shape) => {
     shape.classList.remove("shape-selected");
    });
    
    let clickedTool = e.target;
    let selectedToolId = clickedTool.getAttribute("id");
    
    if (selectedTool === selectedToolId) {
      clickedTool.classList.remove("tool-selected");
      selectedTool = null;
    } else {
      document.querySelectorAll(".tool-selected").forEach(el => {
        el.classList.remove("tool-selected");
      })
      
      clickedTool.classList.add("tool-selected");
      selectedTool = selectedToolId;
    }
  });
});


colors.forEach((color) => {
   color.addEventListener("click", e => {
     if (color.checked) {
     selectedColor = color.getAttribute("id");
    }
  })
});

slider.addEventListener("input", () => {
   let sliderOutput = document.querySelector("#sliderOutput");
   sliderOutput.innerText = slider.value;
   brushSize = slider.value;
   
   let percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
   slider.style.background = `linear-gradient(90deg, dodgerblue ${percent}%, gray 0%)`;
})


fillColorCheckbox.addEventListener("click", () => {
   fillColor = false;
   if(fillColorCheckbox.checked ) fillColor = true ;
});

clearBtn.addEventListener("click", () => {
    canvasArray = [];
    c.clearRect(0, 0, innerWidth, innerHeight);
})

saveImgBtn.addEventListener("click", () => {
   let imageUrl = canvas.toDataURL('image/png');
   let link = document.createElement("a");
   link.href = imageUrl;
   link.download = "your_drawing";
   link.click();
})



const canvas = document.querySelector(".canvas");
let c = canvas.getContext("2d");
canvas.width = 344;
canvas.height = 420;



let startX = 0;
let startY = 0;
function getTouchPos(canvas, touchEvent) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}


function saveCanvas() {
   let canvasImage = c.getImageData(0, 0, innerWidth, innerHeight);
   canvasArray.unshift(canvasImage);
}

function displayCanvas() {
   if (canvasArray[0]){
     c.putImageData(canvasArray[0],0 ,0);
   }
}



canvas.addEventListener("touchstart", (e)=> {
   isDrawing = true;
   let pos = getTouchPos(canvas, e);
   startX = pos.x;
   startY = pos.y;
});


canvas.addEventListener("touchend", (e) => {
   isDrawing = false;
   saveCanvas();
});


canvas.addEventListener("touchmove", (e) => {
   e.preventDefault();
   if (!isDrawing) return;
   
   let pos = getTouchPos(canvas, e);
   let x = pos.x;
   let y = pos.y;
   
   if (selectedTool) {
     if (selectedTool === "brush") {
       draw(x, y);
     } else if (selectedTool === "eraser") {
       erase(x, y);
     }
     return
   }
   
   refreshCanvas();
   displayCanvas();
   
   if (selectedShape) {
     if (selectedShape === "rectangle") {
       drawRectangle(x, y);
     }else if (selectedShape === "circle") {
       drawCircle();
     }else if (selectedShape === "triangle") {
       drawTriangle(x, y);
     }else if (selectedShape === "line") {
       drawLine(x, y);
     }
     return
   }
});




function refreshCanvas() {
   c.clearRect(0, 0, innerWidth, innerHeight);
}

function draw(x, y) {
   
   c.beginPath();
   c.strokeStyle = selectedColor;
   c.lineWidth = brushSize;
   c.moveTo(startX, startY);
   c.lineTo(x, y);
   c.stroke();
   
   startX = x; 
   startY = y;
}

function erase(x, y) {
   
   c.beginPath();
   c.strokeStyle = "white";
   c.lineWidth = brushSize;
   c.moveTo(startX, startY);
   c.lineTo(x, y);
   c.stroke();
   
   startX = x;
   startY = y;
}


function drawRectangle(x, y) {
   
   let rectW = Math.abs((startX - x));
   let rectH = Math.abs((startY - y));
   
   if (fillColor) {
     c.fillStyle = selectedColor;
     c.fillRect(startX, startY, rectW, rectH);
     return
   }else {
   c.strokeStyle = selectedColor;
   c.lineWidth = brushSize;
   c.strokeRect(startX, startY, rectW, rectH);
   }
}

function drawCircle() {
   
   if (fillColor) {
     c.beginPath()
     c.fillStyle = selectedColor;
     c.arc(startX, startY, brushSize * 5,0 , Math.PI * 2, false)
     c.fill();
     return
   } else {
   c.beginPath()
   c.lineWidth = brushSize - (brushSize * 80 / 100)
   c.strokeStyle = selectedColor;
   c.arc(startX, startY, brushSize * 5, 0, Math.PI * 2, false)
   c.stroke();
   }
}



function drawTriangle(x2, y2) {
   
   let x1 = startX;
   let y1 = startY;
   let x3 = Math.abs((x2 - x1) -x1);
   let y3 = y2;
   
   if (fillColor) {
     
     c.fillStyle = selectedColor;
     c.beginPath();
     c.moveTo(x1, y1);
     c.lineTo(x2, y2);
     c.lineTo(x3, y3);
     c.lineTo(x1, y1)
     c.fill();
     
   }else {
     c.strokeStyle = selectedColor;
     c.lineWidth = brushSize;
     c.beginPath();
     c.moveTo(x1, y1);
     c.lineTo(x2, y2);
     c.lineTo(x3, y3);
     c.lineTo(x1, y1)
     c.stroke();
   }
}


function drawLine(x, y) {
   
   c.lineWidth = brushSize;
   c.strokeStyle = selectedColor;
   c.beginPath();
   c.moveTo(startX, startY);
   c.lineTo(x, y);
   c.stroke();
}

