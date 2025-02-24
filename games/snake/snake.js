const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const topBtn = document.querySelector("#up-btn");
const downBtn = document.querySelector("#down-btn");

leftBtn.addEventListener("click", () => {
  if (snakeDirection !== "right") {
    snakeDirection = "left";
    disableButtons();
  }
});
rightBtn.addEventListener("click", () => {
  if (snakeDirection !== "left") {
    snakeDirection = "right";
    disableButtons();
  }
});
topBtn.addEventListener("click", () => {
  if (snakeDirection !== "down") {
    snakeDirection = "up";
    disableButtons();
  }
});
downBtn.addEventListener("click", () => {
  if (snakeDirection !== "up") {
    snakeDirection = "down";
    disableButtons();
  }
});


function disableButtons() {
  leftBtn.disabled = snakeDirection === "right";
  rightBtn.disabled = snakeDirection === "left";
  topBtn.disabled = snakeDirection === "down";
  downBtn.disabled = snakeDirection === "up";
}

// Board setup
let tileSize = 20;
let tileRows = 16;
let tileColumns = 16;
let board, context;
let boardWidth = tileSize * tileColumns;
let boardHeight = tileSize * tileRows;

// Snake setup
let snakeArray = [{ x: boardWidth / 2, y: boardHeight / 2 }];
let snakeVelocityX = -tileSize;
let snakeVelocityY = 0;
let snakeDirection = "left";
let snakeSpeed = 300;

// snake Food
let randomFoodX;
let randomFoodY;

let foodEaten = true;
let food;

// score 
let score = 0;
let gameOver = false;
let headColor = "white";
let bodyColor = "lightblue";
let foodColor = "red";



window.onload = function() {
   board = document.querySelector("#board");
   board.width = boardWidth;
   board.height = boardHeight;
   context = board.getContext("2d");
   
   setTimeout(update, snakeSpeed);
   generateFood();
};

function update() {
   
   detectCollision();
   if (gameOver){
    if (snakeArray.length > 1) {
      snakeArray.shift();
      context.fillStyle = headColor;
      context.fillRect(snakeArray[0].x, snakeArray[0].y, tileSize, tileSize);
    }
    document.querySelector("#msg").innerText = 'Game Over! refresh to play again';
     return
   }
   
   context.clearRect(0, 0, board.width, board.height);
  // gridLine();
   
   
   for (let i = snakeArray.length - 1; i > 0; i--) {
    snakeArray[i].x = snakeArray[i - 1].x;
    snakeArray[i].y = snakeArray[i - 1].y;
    }
    
   moveSnake();
   snakeArray[0].x += snakeVelocityX;
   snakeArray[0].y += snakeVelocityY;
   
   for (let i = 0; i < snakeArray.length; i++) {
   context.fillStyle = i === 0 ? headColor : bodyColor;
   context.fillRect(snakeArray[i].x, snakeArray[i].y, tileSize, tileSize);
   } 
   
   if (food.x == snakeArray[0].x && food.y == snakeArray[0].y) {
        foodEaten = true;
   }
   
   if (foodEaten) {
    generateFood();
    growSnake();
    score += 1;
   }
   
   context.fillStyle = "white";
   context.font = "24px";
   context.fillText(score, tileSize/2, tileSize);
   
   context.fillStyle = foodColor;
   context.fillRect(food.x, food.y, food.width, food.height);
   
   setTimeout(update, snakeSpeed);
}

function moveSnake() {
  if (snakeDirection === "left") {
    snakeVelocityX = -tileSize;
    snakeVelocityY = 0;
  } else if (snakeDirection === "right") {
    snakeVelocityX = tileSize;
    snakeVelocityY = 0;
  } else if (snakeDirection === "up") {
    snakeVelocityX = 0;
    snakeVelocityY = -tileSize;
  } else if (snakeDirection === "down") {
    snakeVelocityX = 0;
    snakeVelocityY = tileSize;
  }
}

function growSnake() {
  
    let lastPart = snakeArray[snakeArray.length - 1];
    snakeArray.push({ x: lastPart.x, y: lastPart.y });
    foodEaten = false;
}

function gridLine() {
  context.strokeStyle = "green";

  for (let i = 0; i < tileColumns; i++) {
    context.beginPath();
    context.moveTo(i * tileSize, 0);
    context.lineTo(i * tileSize, boardHeight);
    context.stroke();
  }

  for (let i = 0; i < tileRows; i++) {
    context.beginPath();
    context.moveTo(0, i * tileSize);
    context.lineTo(boardWidth, i * tileSize);
    context.stroke();
  }
}

function generateFood() {
   
   randomFoodX = Math.floor(Math.random() * tileColumns)*tileSize;
   randomFoodY = Math.floor(Math.random() * tileRows)*tileSize;

   food = {
     x : randomFoodX,
     y : randomFoodY,
     width : tileSize,
     height : tileSize,
   }
   foodEaten = false;
}

function detectCollision() {
   let snake = snakeArray[0];
   if (snake.x < 0 ||
       snake.x > board.width - tileSize ||
       snake.y < 0 ||
       snake.y > board.height - tileSize){
     gameOver = true;
   }
   
   if (snakeArray.length > 4) {
     for (var i = 1; i < snakeArray.length; i++) {
       
        let body = snakeArray[i];
           if (snake.x == body.x && snake.y == body.y) {
           gameOver = true;
         }
      }
    }
 }
 
 
 
 