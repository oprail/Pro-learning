const outputFeild = document.querySelector("#output-feild");
const allBtns = document.querySelectorAll(".btn");


//   functions 
function allClear() {
   outputFeild.innerText = " ";
}

function remove() {
   let input = "";
   input = outputFeild.innerText;
   lastIdx = input.length - 1;
   input = input.slice(0,lastIdx)
   outputFeild.innerText = input
}

function calculate() {
   outputFeild.innerText = eval(outputFeild.innerText);
}


// perform clicking event
allBtns.forEach((btn) => {
  
   btn.addEventListener("click", () => {
    
     if (btn.getAttribute("ID") === "allClear") {
       allClear();
     }else if (btn.getAttribute("ID") === "remove") {
       remove();
     }else if (btn.getAttribute("ID") === "equal-btn") {
       calculate();
     }
     outputFeild.innerText += btn.value;
    })
 })

