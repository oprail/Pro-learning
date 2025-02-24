const leftBtn = document.querySelector("#left-btn").addEventListener("click", () => {
   shipMoveDirection = "left";
   moveShip();
})
const rightBtn = document.querySelector("#right-btn").addEventListener("click", () => {
   shipMoveDirection = "right";
   moveShip();
})

const shootBtn = document.querySelector("#shoot-btn").addEventListener("click" , () => {
   shoot();
})

// tile and board 
let tileSize = 20;
let tileRows = 16;
let tileColumns = 16;
let boardWidth = tileSize * tileRows;
let boardHeight =  tileSize * tileColumns;
let context;

// ship
let shipImg;
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = boardWidth / 2 - tileSize ;
let shipY = boardHeight - tileRows*2;

let shipVelocity = tileSize;
let shipMoveDirection = null;

let ship = {
   img : shipImg,
   width : shipWidth,
   height : shipHeight,
   x : shipX,
   y : shipY,
}

// aliens
let aliensArray = [];
let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;
let alienVelocityX = 1;

let alienImg;
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;

// shoot 
let bulletArray = [];
let bullet;
let bulletVelocityY = -10;
let autoFire = '_';

let score = 0;
let gameOver = false;



function gridLine() {
    
    let sX = 0;
    let sY = 0;
    let eX = 0;
    let eY = 0;
    
    eY = tileSize * tileColumns;
   for (var i = 0; i < tileColumns; i++) {
      
     context.beginPath();
     context.moveTo(sX, sY);
     context.lineTo(eX, eY);
     context.strokeStyle ="green";
     context.stroke();
     
     sX += tileSize;
     eX += tileSize;
   }
   
   
    sX = 0;
    sY = 0;
    eX = 0;
    eY = 0;
   eX = tileSize * tileRows;
   for (var i = 0; i < tileRows; i++) {
     context.beginPath();
     context.moveTo(sX, sY);
     context.lineTo(eX, eY);
     context.strokeStyle ="green";
     context.stroke();
     
     sY += tileSize;
     eY += tileSize;
   }
}

window.onload = function () {
   
   const board = document.querySelector("#board");
   board.width = boardWidth;
   board.height = boardHeight;
   context = board.getContext("2d");
   
   shipImg = new Image();
   shipImg.src = '/games/space-invaders/ship.png';
   shipImg.onload = function () {
     context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
   }
   
   alienImg = new Image();
   alienImg.src = '/games/space-invaders/alien.png';
  
   
   createAliens();
   
   requestAnimationFrame(update);
}


function update() {
   if (gameOver) return;
   
   autoFire++;
   if (autoFire > 25) {
     shoot();
     autoFire = 0;
   };
   
   requestAnimationFrame(update);
   context.clearRect(0, 0, board.width, board.height);
   context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
   
    // gridLine();

  
   
   for (var i = 0; i < aliensArray.length; i++) {
     if (aliensArray[i].alive) {
       let alien = aliensArray[i];
       
       alien.x += alienVelocityX;
       
       if (alien.x + alien.width >= board.width || alien.x <= 0) {
         alienVelocityX *= -1;
         alien.x += alienVelocityX * 2;
         
         for (let j = 0; j < aliensArray.length; j++) {
           aliensArray[j].y += alienHeight;
         }
       }
       
       context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
       
         if (alien.y >= ship.y) {
         gameOver = true;
        }
       
     }
   }


   bulletWork();
   
   if (alienCount == 0) {
     alienColumns = Math.min(alienColumns + 1, tileColumns / 2 - 2);
     alienRows = Math.min(alienRows + 1, tileRows - 4);
     aliensArray = [];
     bulletArray = [];
     createAliens();
   }
   
   
   context.fillStyle = "white";
   context.font = "16px";
   context.fillText(score, tileSize/2, tileSize);
   
}

function moveShip() {
   if (gameOver) return;
   
   if (shipMoveDirection === "left") {
     if (ship.x > 0 ) {
       ship.x -= shipVelocity;
     }
     
   }
   
   if (shipMoveDirection === "right") {
     
     if (ship.x + ship.width < board.width) {
       ship.x += shipVelocity;
     }
     
   }
}

function createAliens() {
   
   for (var c = 0; c < alienColumns; c++) {
     for (var r = 0; r < alienRows; r++) {
       let alien = {
        img : alienImg,
        width : alienWidth,
        height : alienHeight,
        x : alienX + c*alienWidth,
        y : alienY + r*alienHeight,
        alive : true,
       }
       aliensArray.push(alien);
     }
     
   }
   alienCount = aliensArray.length;
  
}

function shoot() {
   if (gameOver) return
   
   bullet = {
     x : ship.x + ship.width*15/32,
     y : ship.y,
     width : ship.width / 8,
     height : ship.width / 2,
     used: false,
   }
   bulletArray.push(bullet);
   
}

function detectCollision(a, b) {
   return a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y
}




function bulletWork() {
   for (var i = 0; i < bulletArray.length; i++) {
     let bullet = bulletArray[i];
     context.fillStyle = "yellow";
     context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
     
     bullet.y += bulletVelocityY;
     
     for (var j = 0; j < aliensArray.length; j++) {
       let alien = aliensArray[j];
       if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
         bullet.used = true;
         alien.alive = false;
         alienCount--;
         score += 1;
       }
     }
   }

   while (bulletArray[0] &&  (bulletArray[0].y < 0 || bulletArray[0].used)) {
     bulletArray.shift();
   }

}



