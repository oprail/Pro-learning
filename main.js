console.log('Hello World!');

let selectedShape = null; // Store the currently selected shape

let shapes = document.querySelectorAll(".shape");

shapes.forEach((shape) => {
  shape.addEventListener("click", (e) => {
    let clickedShape = e.target;

    // If the clicked shape is already selected, deselect it
    if (selectedShape === clickedShape) {
      clickedShape.classList.remove("shape-selected");
      selectedShape = null; // Reset the selection
    } else {
      // If another shape is already selected, remove the class
      if (selectedShape) {
        selectedShape.classList.remove("shape-selected");
      }

      // Apply the class to the newly clicked shape
      clickedShape.classList.add("shape-selected");
      selectedShape = clickedShape; // Store the new selected shape
    }
  });
});