// let URL = 'https://the-trivia-api.com/v2/questions';
/*

let qusAmounvgt = 1;
let qusCategory = 31;
let qusDifficulty = "easy";


let BASE_RL = `https://opentdb.com/api.php?amount=${qusCategory}&category=${qusCategory}&difficulty=${qusDifficulty}&type=multiple`;



let animeURL = 'https://opentdb.com/api.php?amount=1&category=31&difficulty=easy&type=multiple';
let gkURL = "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple";

let coUrl = 'https://opentdb.com/api.php?amount=1&category=19&difficulty=easy&type=multiple';

let vehicles = "https://opentdb.com/api.php?amount=1&category=28&difficulty=medium&type=multiple";



async function getQuizes() {
   
   let response = await fetch(BASE_URL);
   let data = await response.json();
  console.log(data)
   
   // printData(data);
   displaytQuiz(data);
   
}
   
   
      
   let options = [optionA, optionB, optionC, optionD];



function displaytQuiz(data) {
      

    question.innerText = data.results[0].question;
   
   let ansIndex = Math.floor((Math.random() * 4));
   options[ansIndex].innerText = data.results[0].correct_answer;
   options.splice(ansIndex, 1);
   console.log(data.results[0].correct_answer)
   
   let i = 0;
   options.forEach((option) => {
     option.innerText = data.results[0].incorrect_answers[i];
     i++;
   })
   
   
}










function printData(data) {
   
   let category = data[0].category;
   let difficulty = data[0].difficulty;
   let correctAns = data[0].correctAnswer;
   let question = data[0].question.text;
  // let category = data.
   
   
   console.log(`Category = ${category}`);
   console.log(`Difficulty = ${difficulty}`);
   console.log(`correctAns = ${correctAns}`);
   console.log(`question = ${question}`);
  // console.log(`Category = ${category}`);
  // console.log(`Category = ${category}`);
   
   
}



// 3 second timer



let s = 0;
let barColor = "palegreen";
let fillBar = 100;

setInterval(() => {
  s++;
  fillBar -= 1;
   
  
  if (fillBar === 30) {
    barColor = "red";
  }
  
}, 500);



function test() {
  
   
   
  console.log(categorySelector.value.toLowerCase())
      
}

*/




// starting
const startingPage = document.querySelector(".starting-page");
const quizContainer = document.querySelector(".quiz-container");
const startQuizBtn = document.querySelector("#startQuizBtn");




// display quiz
const question = document.querySelector("#question-text");
const optionContainer = document.querySelector(".option-container");
const optionA = document.querySelector("#optionA");
const optionB = document.querySelector("#optionB");
const optionC = document.querySelector("#optionC");
const optionD = document.querySelector("#optionD");
const options = document.querySelectorAll(".option");
const rightAnsP = document.querySelector("#right-ans");
const wrongAnsP = document.querySelector("#wrong-ans");
const questionNum = document.querySelector("#qus-number");
const nextQuizBtn = document.querySelector("#nextBtn");


// results
const totalAttemptedQuestions = document.querySelector("#attempted-US");
const totalCorrectAnswers = document.querySelector("#correctAns-US");
const totalIncorrectAnswers = document.querySelector("#incorrectAns-US");


// timer 
const timeBar = document.querySelector("#time-bar");
const remainingTime = document.querySelector("#remaining-time");



let fillBar;
let barColor;
let isTimer;
let timerCallback;
let timerSpeed = document.querySelector("#timerSpeed-selector").value;



// selectors values
let category;
let difficulty;
let qusAmount = 10;


// url and data
let BASE_URL;
let questionsArray = [];


let quizOptions = [];
let correctAnswer;
let isUserCorrect = false;
let correctAnsCount = 0;
let incorrectAnsCount = 0;
let quizIndex = 0;


let userStatsData = {
   userName : "placeholder",
   questionAttempted : 0,
   correctAnswers : 0,
   incorrectAnswers : 0,
}



// event listners
startQuizBtn.addEventListener("click", startQuiz);

options.forEach((option) => {
   option.addEventListener("click", () => {
     checkOption(option);
   });
});

nextQuizBtn.addEventListener("click",nextQuiz);



displayStats();




function startQuiz() {
   
   category = document.querySelector("#category-selector").value;
   difficulty = document.querySelector("#difficulty-selector").value.toLowerCase();
   
   // hide and display quiz
   optionContainer.style.display = "none";
   startingPage.style.display = "none";
   quizContainer.style.display = "block";
   question.innerText = "";
   questionNum.innerText = "";
   
   
   BASE_URL = `https://opentdb.com/api.php?amount=${qusAmount}&category=${category}&difficulty=${difficulty}&type=multiple`;
   
     getQuizData();
}

async function getQuizData() {
   
   let response = await fetch(BASE_URL);
   let data = await response.json();
   
   data.results.forEach((obj) => {
     questionsArray.push(obj);
   })
   
  
   displayQuiz();
}

function displayQuiz() {
    
    
    // remove options background
    options.forEach((option) => {
      option.setAttribute("class", "option");
      option.querySelector("i").setAttribute("class", "fas");
    })
    
    // display question num 
    questionNum.innerText = `Question ${quizIndex + 1}/${questionsArray.length}`;
    
    
   question.innerText = questionsArray[quizIndex].question
   
   
   quizOptions = [optionA, optionB, optionC, optionD];
   
   let randomIdx = Math.floor(Math.random() * 4);
   
   // correct answer
   quizOptions[randomIdx].innerText = questionsArray[quizIndex].correct_answer;
   correctAnswer = randomIdx;
   quizOptions.splice(randomIdx, 1);
   
   // wrong answers
   let i = 0;
   quizOptions.forEach((option) => {
     option.innerText = questionsArray[quizIndex].incorrect_answers[i];
     i++;
   });
   
   optionContainer.style.display = "flex";
   nextQuizBtn.disabled = true; 
   
   
   timerSpeed = document.querySelector("#timerSpeed-selector").value;
  
   clearInterval(timerCallback);
   fillBar = 100;
   barColor = "#7752db";
   isTimer = true;
   timerCallback = setInterval(timer, timerSpeed);
   
   
   
   
   
   if (quizIndex + 1 == questionsArray.length) {
     nextQuizBtn.innerText = "check results";
   }

}



function checkOption(option) {
   
   isTimer = false;
   
   optionNum = option.querySelector("p").innerText;
   
   
   options.forEach((option) => {
   option.style.pointerEvents = "none";
   });
   
   if (correctAnswer === 0 && optionNum === "A" ||
   correctAnswer === 1 && optionNum === "B" ||
   correctAnswer === 2 && optionNum === "C" ||
   correctAnswer === 3 && optionNum === "D")
   {
     isUserCorrect = true;
   }
   
   
   if (isUserCorrect) {
     option.classList.add("correct");
     option.querySelector("i").classList.add("fa-check-circle");
     
     correctAnsCount++;
     isUserCorrect = false;
   } else {
     
     options[correctAnswer].classList.add("correct");
     options[correctAnswer].querySelector("i").classList.add("fa-check-circle"); 
     
     
     option.classList.add("wrong");
     option.querySelector("i").classList.add("fa-times-circle");
     
     incorrectAnsCount++;
   }
   
   
   nextQuizBtn.disabled = false;
   updateScore();
   
}

function updateScore() {
   rightAnsP.innerText = correctAnsCount;
   wrongAnsP.innerText = incorrectAnsCount;
}

function nextQuiz() {
    
  
    
   quizIndex++;
   if (quizIndex < questionsArray.length) {
     
     options.forEach((option) => {
       option.style.pointerEvents = "unset";
     });
     displayQuiz();
     
   } else {
     displayResults();
     options.forEach((option) => {
       option.style.pointerEvents = "unset";
     });
   }
   
}

function displayResults() {
   
   startingPage.style.display = "flex";
   quizContainer.style.display = "none";
   
   // save stats
   userStatsData.questionAttempted += questionsArray.length;
   userStatsData.correctAnswers += correctAnsCount;
   userStatsData.incorrectAnswers += incorrectAnsCount;
   
   
  // displayStats
   saveUserStats();
   displayStats();
   
   
   // set values to default
   category;
   difficulty;
   questionsArray = [];
   quizOptions = [];
   
   correctAnswer;
   isUserCorrect = false;
   correctAnsCount = 0;
   incorrectAnsCount = 0;
   quizIndex = 0;
   
   nextQuizBtn.innerText = "next";
}


function displayStats() {
  
   let userData = localStorage.getItem("userData");
   if (userData !== null) {
     userStatsData = JSON.parse(userData);
   }
      
     
   totalAttemptedQuestions.innerText = userStatsData.questionAttempted;
   
   totalCorrectAnswers.innerText = userStatsData.correctAnswers;
   
   totalIncorrectAnswers.innerText = userStatsData.incorrectAnswers;
}



function timer() {
     
     console.log(timerSpeed)
   if (isTimer) {
      timeBar.style.background = `linear-gradient(90deg, ${barColor} ${fillBar}%, white 0)`;
       fillBar -= 1;
       
     if (fillBar >= 0) {
       remainingTime.innerText = `${fillBar}%`;
     } else {
       displayCorrectOption();
     }
     
   }
}


function displayCorrectOption() {
    
    isTimer = false;
    
   options.forEach((option) => {
     option.style.pointerEvents = "none";
   });
    
   options[correctAnswer].classList.add("correct");
   options[correctAnswer].querySelector("i").classList.add("fa-check-circle");
   
   nextQuizBtn.disabled = false;
}




let test = "Which part from the JoJo&#039;s Bizarre Adventure manga is about a horse race across America?";
function betterText(text) {
   
   let q = text.replace("&", "");
   q = q.replace("quot", "");
   q = q.replace(";", "");
   q = q.replace("0", "");
   q = q.replace("#", "");
   console.log(q);
   return q ;
}



function saveUserStats() {
   
   let jsonData = JSON.stringify(userStatsData);
   
   localStorage.setItem("userData", jsonData);
}
