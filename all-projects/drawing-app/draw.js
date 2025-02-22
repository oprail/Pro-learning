let selectedShape = null;
let selectedTool = null;
let selectedColor = "black";
let brushSize = 2;
let fillColor = false;

const shapes = document.querySelectorAll(".shape");
const tools = document.querySelectorAll(".tool");
const colors = document.querySelectorAll(".color");
const slider = document.querySelector("#slider");
const fillColorCheckbox = document.querySelector("#fill-color-input")


  
// selection shape, fillColor, tool, color, range, 
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

    console.log("Selected Shape ID:", selectedShape); 
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
      clickedTool.classList.remove("tool-selected")
      selectedTool = null;
    } else {
      document.querySelectorAll(".tool-selected").forEach(el => {
        el.classList.remove("tool-selected");
      })
      
      clickedTool.classList.add("tool-selected");
      selectedTool = selectedToolId;
    }
    
    console.log("Selected Tool ID:", selectedTool); 
    
  });
});


colors.forEach((color) => {
   color.addEventListener("click", e => {
     if (color.checked) {
     selectedColor = color.getAttribute("id");
    }
    console.log("selected Color =",selectedColor)
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
   console.log("fillColor = ",fillColor)
});

// selection up <==



